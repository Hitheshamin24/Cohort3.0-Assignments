import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
  });
  return api;
};
