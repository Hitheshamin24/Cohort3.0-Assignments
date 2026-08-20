import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee } from "../state/auth/authAction";

export const useAuth = () => {
  let dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onRegisterSubmit = (data) => {
    console.log("on Registered Data:", data);
  };
  const onLoginSubmit = async (data) => {
    const employee = await dispatch(loginEmployee(data));
    localStorage.setItem(
      "accessToken",
      JSON.stringify(employee.payload.accessToken),
    );
  };
  return {
    register,
    handleSubmit,
    errors,
    onRegisterSubmit,
    onLoginSubmit,
    watch,
    navigate,
  };
};
