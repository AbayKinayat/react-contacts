import { message } from 'antd';
import { IUser } from '../../../models/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http';
import ShifrService from '../../../service/shifr-service';
import { UserPayload } from '../../../models/UserPayload';

function generateToken(user: IUser) {
  return ShifrService.generateToken<UserPayload>({
    payload: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    exp: ShifrService.createTokenExp(2),
    secretKey: process.env.REACT_APP_SECRET_KEY as string
  });
}

export const authorization = createAsyncThunk(
  "auth/authorization",
  async ({ email, password }: Omit<IUser, "id" | "name">, thunkApi) => {
    try {
      const { data: user } = await $api.get<IUser[]>(`/users/email/${email}`);
      if (!user.length) {
        throw new Error(`Не верный email или пароль`);
      }
      const isPasswordsEquals = password === user[0].password;
      if (!isPasswordsEquals) {
        throw new Error(`Не верный email или пароль`);
      }

      localStorage.setItem("token", generateToken(user[0]));
      return user[0];
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
)

export const registration = createAsyncThunk(
  "auth/registration",
  async ({
    name, email, password,
  }: Omit<IUser, "id">, thunkApi) => {
    try {
      const { data: user } = await $api.get<IUser[]>(`/users/email/${email}`);
      if (user.length) {
        throw new Error(`Пользователя с таким email ${email} уже существует`);
      }

      const userModel = {
        id: Date.now(),
        name,
        email,
        password
      }

      const { data: currentUser } = await $api.post("/users", userModel);
      localStorage.setItem("token", generateToken(currentUser));

      return currentUser;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
)
export const refresh = createAsyncThunk(
  "auth/refresh",
  async (token: string, thunkApi) => {
    try {
      const payload = ShifrService.verifyToken<UserPayload>(token, process.env.REACT_APP_SECRET_KEY as string);
      if (!payload) {
        throw new Error("Вы не авторизованы");
      }
      const { data: user } = await $api.get<IUser[]>(`/users/email/${payload.email}`);
      if (!user.length) {
        throw new Error("Не предвиденная ошибка");
      }
      
      const newToken = generateToken(user[0])
      localStorage.setItem("token", newToken);

      return user[0];
    } catch (e: any) {
      return thunkApi.rejectWithValue("Пользователь не авторизован");
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      localStorage.removeItem("token");
      return null;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
)