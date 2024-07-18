import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "./AppState";
import { authReducersContainer } from "./AuthSlice";
import { vacationReportReducersContainer } from "./ReportsSlice";
import { userReducersContainer } from "./UserSlice";
import { vacationReducersContainer } from "./VacationsSlice";


// This line initializes the Redux store using the configureStore function, which is provided by the Redux Toolkit.
export const appStore = configureStore<AppState>({
    // The `reducer` key specifies the root reducer for the Redux store. It combines multiple reducers into a single reducer function.
    reducer: {
      // vacations is a slice of the state managed by the `vacationReducersContainer` reducer.
      vacations: vacationReducersContainer,

      // auth is a slice of the state managed by the `authReducersContainer` reducer.
      auth: authReducersContainer,
      
      // user is a slice of the state managed by the `userReducersContainer` reducer.
      user: userReducersContainer,
      
      // vacationsReport is a slice of the state managed by the `vacationReportReducersContainer` reducer.
      vacationsReport: vacationReportReducersContainer
    },
  });

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
