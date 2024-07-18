import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

// This function handles the action to set the vacations array in the state.
function setVacations(currentState: VacationModel[],action: PayloadAction<VacationModel[]>): VacationModel[] {
  // Create a new array containing the vacation data from the action payload using the spread operator.  
  return [...action.payload];
}

// This function handles the action to add a single vacation to the vacations array in the state.
function addOne( currentState: VacationModel[],action: PayloadAction<VacationModel>): VacationModel[] {
  // Create a new array by spreading the current state and appending the new vacation from the action payload.  
  const newState = [...currentState, action.payload];
  return newState;
}

// This function handles the action to update a single vacation in the vacations array in the state.
function updateOne(currentState: VacationModel[],action: PayloadAction<VacationModel>): VacationModel[] {
  // Create a copy of the current state array.  
  const newState = [...currentState];

  // Find the index of the vacation to be updated in the state array.
  const index = newState.findIndex((v) => v.id === action.payload.id);

  // If the vacation to be updated is found in the state array, replace it with the updated vacation from the action payload.
  if (index >= 0) {
    newState[index] = action.payload;
  }
  return newState;
}

// This function handles the action to delete a single vacation from the vacations array in the state.
function deleteOne(currentState: VacationModel[],action: PayloadAction<number>): VacationModel[] {
  // Extract the ID of the vacation to be deleted from the action payload.
  const idToDelete = action.payload;

  // Create a copy of the current state array.
  const newState = [...currentState];

  // Find the index of the vacation to be deleted in the state array.
  const index = newState.findIndex((v) => v.id === idToDelete);

  // If the vacation to be deleted is found in the state array, remove it from the array.
  if (index >= 0) {
    newState.splice(index, 1);
  }
  return newState;
}

const vacationsSlice = createSlice({
  name: "vacations",
  initialState: [],
  reducers: { setVacations, addOne, updateOne, deleteOne },
});


export const vacationActionCreators = vacationsSlice.actions;


export const vacationReducersContainer = vacationsSlice.reducer;
