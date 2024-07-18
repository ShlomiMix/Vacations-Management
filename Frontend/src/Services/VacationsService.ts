import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { appStore } from "../Redux/Store";
import { vacationActionCreators } from "../Redux/VacationsSlice";
import { VacationReportModel } from "../Redux/ReportsSlice";

interface GetVacationsResponse {
  vacations: VacationModel[];
  totalRows: number;
}

interface getVacationsProps {
  userId: number;
  page: number;
  isMyVacation: boolean;
  isSoon: boolean;
  isActive: boolean;
  minPrice: number;
  maxPrice: number;
}

class VacationsService {

  // This method retrieves vacations based on provided parameters.  
  public async getVacations({userId,page = 1,isMyVacation,isSoon,isActive,minPrice,maxPrice,}: getVacationsProps): Promise<GetVacationsResponse> {
    // Send a GET request to the vacations URL with query parameters.
    const response = await axios.get<GetVacationsResponse>(
      `${appConfig.vacationsUrl}?userId=${userId}&page=${page}&isMyVacation=${isMyVacation}&isSoon=${isSoon}&isActive=${isActive}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    // Extract vacations data from the response.
    const vacationsResponse = response.data;

    return vacationsResponse;
  }

  // This method retrieves vacation reports
  public async getVacationsReport(): Promise<VacationReportModel[]> {
    // Send a GET request to the vacations report URL.
    const response = await axios.get<VacationReportModel[]>(`${appConfig.vacationsUrl}report`);
    
    // Extract vacation reports data from the response.
    const vacationsReport = response.data;

    return vacationsReport;
  }

  // This method retrieves a single vacation by its ID.
  public async getOneVacation(id: number): Promise<VacationModel> {
    // Retrieve vacations from the store.
    let vacations = appStore.getState().vacations;

    // Find the vacation by its ID.
    let vacation = vacations.find((v) => v.id === id);
    
    // If vacation is found in the store, return it.
    if (vacation) {
      return vacation;
    }
    
    // Otherwise, send a GET request to retrieve the vacation by its ID.
    const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
    
    // Extract the vacation data from the response.
    vacation = response.data;

    return vacation;
  }

  // This method adds a new vacation.
  public async addVacation(vacation: VacationModel): Promise<void> {
    // Send a POST request to add the vacation to the server.
    const response = await axios.post<VacationModel>(appConfig.vacationsUrl,vacation,appConfig.axiosOptions);

    // Extract the added vacation data from the response.
    const addedVacation = response.data;

    // Dispatch an action to add the vacation to the store.
    appStore.dispatch(vacationActionCreators.addOne(addedVacation));
  }
  
  // This method updates an existing vacation.
  public async updateVacation(vacation: VacationModel): Promise<void> {
     // Send a PUT request to update the vacation on the server.
    const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id,vacation,appConfig.axiosOptions);
  
    // Extract the updated vacation data from the response.
    const updatedVacation = response.data;
   
    // Dispatch an action to update the vacation in the store.
    const action = vacationActionCreators.updateOne(updatedVacation);
    appStore.dispatch(action);
  }
  
  // This method deletes a vacation by its ID.
  public async deleteVacation(id: number): Promise<void> {
    // Send a DELETE request to delete the vacation from the server.
    await axios.delete<VacationModel>(appConfig.vacationsUrl + id);
    
    // Dispatch an action to delete the vacation from the store.
    const action = vacationActionCreators.deleteOne(id);
    appStore.dispatch(action);
  }
}

export const vacationsService = new VacationsService();
