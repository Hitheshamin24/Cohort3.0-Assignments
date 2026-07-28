import { createContext, useState } from "react";

export const Auth = createContext();
export const AuthProvider = ({ children }) => {
    
const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("sm_users")) || [];
});
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("session_user")));
 
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
