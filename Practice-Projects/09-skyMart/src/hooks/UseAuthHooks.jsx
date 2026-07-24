import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import { User } from "lucide-react";

export const useAuth = () => {
  let navigate = useNavigate();
  const { registeredUsers, setRegisteredUsers, loggedInUser, setLoggedInUser } =
    useContext(Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const registerFormSubmit = (data) => {
    const nameExists = registeredUsers.find(
      (user) =>
        user.fullName.toLowerCase() === data.fullName.trim().toLowerCase(),
    );
    const emailExists = registeredUsers.find(
      (user) => user.email === data.email.trim().toLowerCase(),
    );
    if (nameExists) {
      toast.error("UserName name already exists");
      return;
    }
    if (emailExists) {
      toast.error("Email name already exists");
      return;
    }
    const newUser = {
      id: Date.now(),
      avatar: data.fullName.trim()[0],
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      ...data,
    };
    let arr = [...registeredUsers, newUser];
    setRegisteredUsers(arr);
    setLoggedInUser(newUser);
    localStorage.setItem("sm_users", JSON.stringify(arr));
    localStorage.setItem("session_user", JSON.stringify(newUser));
    toast.success("Account created successfully");
    

    reset();
  };
  const registerFormError = (errors) => {
    const errorArray = Object.values(errors);
    if (errorArray.length >1) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.error(errorArray[errorArray.length - 1].message);
  };
   const loginFormSubmit = (data) => {
    const isCorrect = registeredUsers.find(
      (user) =>
        user.email === data.email.trim().toLowerCase() &&
        user.password === data.password,
    );
    if (!isCorrect) {
      toast.error("Invalid Username or Password ");
      return;
    }

    setLoggedInUser(isCorrect);
    toast.success("Login Successful")
    localStorage.setItem("session_user", JSON.stringify(isCorrect));
  };
  const loginFormError = (errors) => {
    const errorArray = Object.values(errors);
    if (errorArray.length >1) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.error(errorArray[errorArray.length - 1].message);
  };
  return {
    navigate,
    registeredUsers,
    setRegisteredUsers,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    errors,
    watch,
    registerFormSubmit,
    registerFormError,
    loggedInUser,
    setLoggedInUser,
    loginFormSubmit,
    loginFormError
  };
};
