import { authorization, logout, refresh, registration } from './actionCreators';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { message } from 'antd';

interface UserState {
  user: IUser | null,
  isLoading: boolean,
  isSuccess: boolean,
  isRefreshLoading: boolean,
  isRefreshSuccess: boolean,
  error: string,
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isRefreshLoading: false,
  isRefreshSuccess: false,
  error: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: {
    [authorization.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      state.isSuccess = true;
      message.success("Вы успешно авторизовались");
    },
    [authorization.pending.type]: (state) => {
      state.isLoading = true;
    },
    [authorization.rejected.type]: (state, action: PayloadAction<string>) => {
      message.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    [registration.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      state.isSuccess = true;
      message.success("Вы успешно зарегистрировались");
    },
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      message.error(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    [refresh.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.error = "";
      state.user = action.payload;
      state.isRefreshLoading = false;
      state.isRefreshSuccess = true;
    },
    [refresh.pending.type]: (state) => {
      state.isRefreshLoading = true;
    },
    [refresh.rejected.type]: (state, action: PayloadAction<string>) => {
      message.error(action.payload);
      state.error = action.payload;
      state.isRefreshLoading = false;
    },
    [logout.fulfilled.type]: (state, action) => {
      state.error = "";
      state.user = null;
      state.isLoading = false;
      state.isRefreshSuccess = false;
      message.success("Вы успешно вышли");
    },
    [logout.pending.type]: (state) => {
      state.isLoading = false;
    },
    [logout.rejected.type]: (state, action) => {
      message.error(action.payload);
      state.error = action.payload;
      state.isLoading = false;
    }
  }
})

export default authSlice.reducer;