import { configureStore } from '@reduxjs/toolkit'
import apiReducer from "../redux/slices/apiSlice";
import weekDataReducer from "../redux/slices/weekDataSlice";

export const store = configureStore({
    reducer: {
        data: apiReducer,
        onlineData: weekDataReducer,
    },
  })