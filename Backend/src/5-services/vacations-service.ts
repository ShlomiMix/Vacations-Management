import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import {
  ResourceNotFoundError,
  RouteNotFoundError,
} from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { format } from "date-fns";
import { count } from "console";
import { use } from "chai";

interface getVacationsProps {
  userId: number;
  page: number;
  isMyVacation: boolean;
  isSoon: boolean;
  isActive: boolean;
  minPrice?: number;
  maxPrice?: number;
}

class VacationsService {
  public async getAllVacations({userId, page = 1, isMyVacation, isSoon, isActive, minPrice, maxPrice}: getVacationsProps): Promise<{vacations: VacationModel[];totalRows: number;}> {
   
    // Define the number of items per page and calculate the offset
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    // Start building the SQL query with initial select statement and joins
    let sql = `
      SELECT DISTINCT
      vacations.*,
      EXISTS(SELECT * FROM likes WHERE vacations.id = likes.vacationId AND userId = ?) AS isLiked,
      COUNT(L.userId) AS likesCount,
      CONCAT(?, imageName) AS imageUrl,
      DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate,
      DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
      FROM vacations AS vacations 
      LEFT JOIN likes AS L ON vacations.id = L.vacationId
    `;

    //  // Initialize an array to store filter clauses and values for execution
    const filterClauses = [];
    const executeArr = [];

    // Add userId to the executeArr if isMyVacation is true
    if (isMyVacation) {
      executeArr.push(userId);
    }

    // Add filter clause for isSoon if checked
    if (isSoon) {
      filterClauses.push(`startDate > NOW()`);
    }

    // Add filter clause for isActive if checked
    if (isActive) {
      filterClauses.push(`startDate < NOW() AND endDate >= NOW()`);
    }

    // Add filter clause for minPrice value
    if (minPrice) {
      filterClauses.push(`price >= ?`);
      executeArr.push(minPrice);
    }

    // Add filter clause for maxPrice value
    if (maxPrice) {
      filterClauses.push(`price <= ?`);
      executeArr.push(maxPrice);
    }

    // Append filter clauses to the SQL query if there are any
    if (filterClauses.length > 0) {
      sql += ` WHERE ${filterClauses.join(" AND ")}`;
    }

    // Add grouping, ordering, pagination, etc. to the SQL query
    sql += `
          GROUP BY id
          ${isMyVacation ? "HAVING isLiked = 1" : ""}
          ORDER BY startDate
          LIMIT ?, ?
        `;

    // SQL query to count total number of rows based on filters
    const countSql = `
    SELECT COUNT(DISTINCT vacations.id) AS totalRows
    FROM vacations
    LEFT JOIN likes ON vacations.id = likes.vacationId
    ${isMyVacation ? "WHERE likes.userId = ?" : ""}
     ${
       filterClauses.length > 0
         ? `${isMyVacation ? "AND" : "WHERE"} ${filterClauses.join(" AND ")}`
         : ""
     }
  `;

    // Execute both main SQL query and count SQL query concurrently
    const [vacations, totalRowsResult] = await Promise.all([
      dal.execute(sql, [
        userId,
        appConfig.baseImageUrl,
        minPrice,
        maxPrice,
        offset,
        pageSize,
      ]),
      dal.execute(countSql, executeArr),
    ]);

    // Extract totalRows from the count SQL result
    const totalRows: number = totalRowsResult[0].totalRows;

    return { vacations, totalRows };
  }

  public async getVacationNameAndLikesCount(): Promise<{ destination: string; likesCount: number }[]> {
     // SQL query to select vacation destination and count of likes for each vacation
    let sql = `
    SELECT
    vacations.destination,
    COUNT(likes.userId) AS likesCount
    FROM vacations
    LEFT JOIN likes ON vacations.id = likes.vacationId
    GROUP BY vacations.id, vacations.destination
  `;
    
    // Execute the SQL query
    const vacations = await dal.execute(sql);
   
    return vacations;
  }

  public async getOneVacation(id: number): Promise<VacationModel> {
    // SQL query to select a single vacation by id
    const sql =
      "select *, concat(?, imageName) as imageUrl from vacations where id = ?";

    // Execute the SQL query with the provided id parameter
    const vacations = await dal.execute(sql, [appConfig.baseImageUrl, id]);

    // Extract the vacation from the result
    const vacation = vacations[0];
    
    // Throw an error if the vacation is not found
    if (!vacation) {
      throw new ResourceNotFoundError(id);
    }
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate the vacation object for insertion
    vacation.validateInsert();
    
    // Save the vacation image and get the image name
    const imageName = await fileSaver.add(vacation.image);
    
    // SQL query to insert a new vacation into the database
    const sql =
      "insert into vacations(destination, description, startDate, endDate, price, imageName) values(?,?,?,?,?,?)";

    // Execute the SQL query with the provided vacation data  
    const info: OkPacketParams = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
    ]);
    
    // Retrieve the inserted vacation from the database
    vacation = await this.getOneVacation(info.insertId);
    
    return vacation;
  }

  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate the vacation object for updating
    vacation.validateUpdate();
    
    // Get the old image name of the vacation
    const oldImageName = await this.getImageName(vacation.id);
    
    // Update the vacation image and get the new image name if the image don't changed get the old image name
    const newImageName = vacation.image
      ? await fileSaver.update(oldImageName, vacation.image)
      : oldImageName;
    
    // SQL query to update the vacation in the database  
    const sql = `update vacations set
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageName = ?
    where id = ?`;
    
    // Execute the SQL query with the updated vacation data
    const info: OkPacketParams = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      newImageName,
      vacation.id,
    ]);

    // Throw an error if no rows were affected by the update operation
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
    
    // Retrieve the updated vacation from the database
    vacation = await this.getOneVacation(vacation.id);

    return vacation;
  }

  public async deleteVacation(id: number): Promise<void> {
    // Get the image name of the vacation to be deleted
    const imageName = await this.getImageName(id);

    // SQL query to delete the vacation from the database
    const sql = "delete from vacations where id = ?";

    // Execute the SQL query with the provided id parameter
    const info: OkPacketParams = await dal.execute(sql, [id]);

    // Throw an error if no rows were affected by the delete operation
    if (info.affectedRows === 0) {
      throw new ResourceNotFoundError(id);
    }

    // Delete the vacation image
    await fileSaver.delete(imageName);
  }

  private async getImageName(id: number): Promise<string> {
    // SQL query to select the image name of a vacation by id
    const sql = `select imageName from vacations where id = ?`;
    
    // Execute the SQL query with the provided id parameter
    const vacations = await dal.execute(sql, [id]);

    // Extract the vacation from the result
    const vacation = vacations[0];
    
    // If the vacation is not found, return null
    if (!vacation) {
      return null;
    }
    
    // Extract and return the image name of the vacation
    const imageName = vacation.imageName;
    return imageName;
  }
}

export const vacationsService = new VacationsService();
