import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 使用 createAsyncThunk 定義一個異步請求，從 API 獲取資料
export const fetchWeekData = createAsyncThunk("weekApiData/fetchWeekData", async () => {
  try {
    const response = await axios.get("https://backend-pms.vercel.app/api/admin/week-data");
    return response.data.weekData; // 返回 API 資料
  } catch (error) {
    throw Error(error.response ? error.response.data.message : "無法連接到伺服器");
  }
});

// 創建 Redux slice
const weekDataSlice = createSlice({
  name: "onlineData",
  initialState: {
    onlineData: [], // 儲存資料
    loading: false, // 請求狀態
    error: null, // 錯誤狀態
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 當 fetchWeekData 執行時
      .addCase(fetchWeekData.pending, (state) => {
        state.loading = true;
        state.error = null; // 清空錯誤
      })
      // 當 fetchWeekData 完成並返回資料時
      .addCase(fetchWeekData.fulfilled, (state, action) => {
        state.onlineData = action.payload; // 更新資料
        state.loading = false; // 更新載入狀態
      })
      // 當 fetchWeekData 發生錯誤時
      .addCase(fetchWeekData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // 記錄錯誤
      });
  },
});

export default weekDataSlice.reducer;