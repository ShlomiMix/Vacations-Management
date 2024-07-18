import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { VacationReportModel } from "./ReportsSlice";
import { UserSlice } from "./UserSlice";

//application global state
export type AppState = {
    
 // Define the state slice for vacations, which is an array of VacationModel
 vacations: VacationModel[];
  
 // Define the state slice for user, which is an instance of UserSlice
 user: UserSlice;
 
 // Define the state slice for auth, which is an instance of UserModel
 auth: UserModel;

 // Define the state slice for vacationsReport, which is an array of VacationReportModel
 vacationsReport: VacationReportModel[];
};
