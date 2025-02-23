import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
    const response = await axios.get("https://backend-pms.vercel.app/api/admin/all-rider");
    return response.data.riders; // 返回 API 資料
  });
  
  // 創建 apiSlice
  const apiSlice = createSlice({
    name: "data",
    initialState: {
      data: [], // 儲存 API 資料
      loading: false, // 請求狀態
      error: null, // 錯誤狀態
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // 當 fetchData 執行時
        .addCase(fetchData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        // 當 fetchData 完成並返回資料時
        .addCase(fetchData.fulfilled, (state, action) => {
          state.data = action.payload; // 更新資料
          state.loading = false;
        })
        // 當 fetchData 發生錯誤時
        .addCase(fetchData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default apiSlice.reducer;