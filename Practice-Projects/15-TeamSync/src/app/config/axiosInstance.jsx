import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     let originalReq = error.config;
//     if (error.response.status === 401 && !originalReq._retry) {
//       originalReq._retry = true;
//     }
//     try {
//       await axiosInstance.get("/auth/get-accessToken")
//       return axiosInstance(originalReq)
//     } catch (error) {
//       window.location.href("/")
//       return Promise.reject(error)
//     }
//   },
// );
