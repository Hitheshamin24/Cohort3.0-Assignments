import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useApi } from "../../../shared/apiClient";
export const useAuthHook = () => {
  const { register, handleSubmit, reset } = useForm();
  const api = useApi();
  const navigate = useNavigate();
  const handleAuthRegistration = async (data) => {
    try {
      const user = await api.post("/auth/register", {
        ...data,
        userName: data.userName.toLowerCase(),
      });
      console.log(user);
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
      console.log(user);
    } catch (error) {
      console.log("Error while login ", error.message);
    }
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
  };
};
