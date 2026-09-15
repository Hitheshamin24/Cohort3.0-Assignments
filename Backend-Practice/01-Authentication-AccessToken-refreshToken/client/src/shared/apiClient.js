import axios from "axios";
import { useSelector } from "react-redux";

export const useApi = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });
  
  return api
};
