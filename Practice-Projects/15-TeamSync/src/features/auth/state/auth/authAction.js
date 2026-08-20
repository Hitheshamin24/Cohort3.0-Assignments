/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../app/config/axiosInstance";

export let loginEmployee = createAsyncThunk(
  "/auth/login",
  async (credentials, thunkApi) => {
    try {
      let response = await axiosInstance.post("/auth/login", credentials);
      const { password, ...restData } = await response.data;
      return {...restData,role:'admin'};
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export let currentLoggedEmployee = createAsyncThunk(
  "auth/me",

  async (_, thunkApi) => {
    try {
      let res = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
        },
      });
      const employee=res.data
      employee.role='admin'
      return employee;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
