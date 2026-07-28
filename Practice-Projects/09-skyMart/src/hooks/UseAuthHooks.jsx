import { useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Auth } from "../context/AuthContext";
import { Check, X } from "lucide-react";

const successToast = {
  icon: (
    <div className="w-6 h-6 rounded-full bg-[#e2ff66] flex items-center justify-center shrink-0">
      <Check className="w-4 h-4 text-black" strokeWidth={3} />
    </div>
  ),
};

const errorToast = {
  icon: (
    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
      <X className="w-4 h-4 text-white" strokeWidth={3} />
    </div>
  ),
};

export const useAuth = () => {
  let navigate = useNavigate();
  const { registeredUsers, setRegisteredUsers, loggedInUser, setLoggedInUser } =
    useContext(Auth);

  const registerFormSubmit = (data) => {
    const nameExists = registeredUsers.find(
      (user) =>
        user.fullName.toLowerCase() === data.fullName.trim().toLowerCase(),
    );
    const emailExists = registeredUsers.find(
      (user) => user.email === data.email.trim().toLowerCase(),
    );
    if (nameExists) {
      toast.error("UserName name already exists", errorToast);
      return;
    }
    if (emailExists) {
      toast.error("Email name already exists", errorToast);
      return;
    }
    const { fullName: originalName, ...restOfData } = data;
    const newUser = {
      id: Date.now(),
      avatar: originalName.trim()[0].toUpperCase(),
      ...restOfData,
      fullName: originalName
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      email: data.email.trim().toLowerCase(),
    };

    let arr = [...registeredUsers, newUser];
    setRegisteredUsers(arr);
    setLoggedInUser(newUser);
    localStorage.setItem("sm_users", JSON.stringify(arr));
    localStorage.setItem("session_user", JSON.stringify(newUser));
    toast.success("Account created successfully", successToast);
  };

  const registerFormError = (errors) => {
    const errorArray = Object.values(errors);
    if (errorArray.length > 1) {
      toast.error("Please fill in all required fields", errorToast);
      return;
    }
    toast.error(errorArray[errorArray.length - 1].message, errorToast);
  };

  const loginFormSubmit = (data) => {
    const isCorrect = registeredUsers.find(
      (user) =>
        user.email === data.email.trim().toLowerCase() &&
        user.password === data.password,
    );
    if (!isCorrect) {
      toast.error("Invalid Username or Password ", errorToast);
      return;
    }

    setLoggedInUser(isCorrect);
    toast.success("Login Successful", successToast);
    localStorage.setItem("session_user", JSON.stringify(isCorrect));
  };

  const loginFormError = (errors) => {
    const errorArray = Object.values(errors);
    if (errorArray.length > 1) {
      toast.error("Please fill in all required fields", errorToast);
      return;
    }
    toast.error(errorArray[errorArray.length - 1].message, errorToast);
  };

  const userLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("session_user");
    toast.success("Logged Out. See You Soon", successToast);
  };

  return {
    navigate,
    registeredUsers,
    setRegisteredUsers,
    registerFormSubmit,
    registerFormError,
    loggedInUser,
    setLoggedInUser,
    loginFormSubmit,
    loginFormError,
    userLogout,
  };
};
