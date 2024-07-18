import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel"

export type VacationReportModel = Pick<VacationModel, "destination" | "likesCount">;

// This function handles the action to set vacations in the state.
function setVacations(currentState: VacationReportModel[],action: PayloadAction<VacationReportModel[]>): VacationReportModel[] {
   // Create a new array containing the vacation report data from the action payload
    return [...action.payload]
  }

  const vacationReportSlice = createSlice({
    name: "vacation-report",
    initialState: [],
    reducers: { setVacations },
  });
  
  export const vacationReportActionCreators = vacationReportSlice.actions;
  
  export const vacationReportReducersContainer = vacationReportSlice.reducer;
  