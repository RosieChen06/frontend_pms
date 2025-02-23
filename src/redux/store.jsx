import { configureStore } from '@reduxjs/toolkit'
import apiReducer from "../redux/slices/apiSlice";

export const store = configureStore({
    reducer: {
        data: apiReducer,
    }
  })