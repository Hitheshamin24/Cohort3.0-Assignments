import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../features/auth/state/authSlice";

export const useApi = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const api = axios.create({
    baseURL: "http://localhost:5173/api/",
    withCredentials: true,
  });
  
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const res = await axios.post("/api/auth/refresh");
        console.log(res)
        dispatch(setAccessToken(res.data.accessToken));
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return await axios(error.config);
      }
      return Promise.reject(error);
    },
  );
  return api;
};
