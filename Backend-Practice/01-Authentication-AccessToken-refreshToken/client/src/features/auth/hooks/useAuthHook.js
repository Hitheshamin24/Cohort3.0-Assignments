import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useApi } from "../../../shared/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setAccessToken } from "../state/authSlice";
export const useAuthHook = () => {
  const { register, handleSubmit, reset } = useForm();

  const api = useApi();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  console.log(accessToken);
  const navigate = useNavigate();
  const handleAuthRegistration = async (data) => {
    try {
      const user = await api.post("/auth/register", {
        ...data,
        userName: data.userName.toLowerCase(),
      });
      dispatch(loginUser(user.data.data));

      dispatch(setAccessToken(user.data.accessToken));
    } catch (error) {
      console.log("Error while registering ", error.message);
    }
  };
  const handleAuthLogin = async (data) => {
    try {
      const user = await api.post("/auth/login", {
        ...data,
        userName: data.userName.toLowerCase(),
      });
      dispatch(loginUser(user.data.data));
      dispatch(setAccessToken(user.data.accessToken));
    } catch (error) {
      console.log("Error while login ", error.message);
    }
  };
  const fetchProfile = async () => {
    const response = await api.get("/auth/me");
    dispatch(loginUser(response.data.data));
  };
  const handleError = (error) => {
    console.log(error);
  };

  return {
    register,
    handleSubmit,
    handleAuthLogin,
    handleAuthRegistration,
    handleError,
    navigate,
    fetchProfile,
  };
};
