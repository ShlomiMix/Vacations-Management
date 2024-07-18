import { dal } from "../2-utils/dal";
import { LikeModel } from "../3-models/like-model";

class LikesService {
  public async getAllLikes(): Promise<LikeModel[]> {
    // SQL query to select all likes from the database
    const sql = "select * from likes";

    // Execute the SQL query and await the result
    const allLikes = await dal.execute(sql);

    return allLikes;
  }

  public async addLike(userId: number, vacationId: number): Promise<void> {
    // SQL query to insert a new like record into the database
    const sql = "insert into likes(userId,vacationId) values(?,?)";

    // Execute the SQL query with the provided userId and vacationId parameters
    await dal.execute(sql, [userId, vacationId]);
  }

  public async deleteLike(userId: number, vacationId: number): Promise<void> {
    // SQL query to delete a like record from the database based on userId and vacationId
    const sql = "delete from likes where userId = ? and vacationId = ?";

    // // Execute the SQL query with the provided userId and vacationId parameters
    await dal.execute(sql, [userId, vacationId]);
  }
}

export const likeService = new LikesService();
