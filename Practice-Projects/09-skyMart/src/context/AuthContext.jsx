import { createContext, useState } from "react";

export const Auth = createContext();
export const AuthProvider = ({ children }) => {
    
  const [registeredUsers, setRegisteredUsers] = useState(JSON.parse(localStorage.getItem("sm_users"))||[]);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("session_user")));
  console.log("Reegistered User-> ",registeredUsers)
  console.log("LoggedIn User-> ",loggedInUser)
  return (
    <Auth.Provider
      value={{
        registeredUsers,
        setRegisteredUsers,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
