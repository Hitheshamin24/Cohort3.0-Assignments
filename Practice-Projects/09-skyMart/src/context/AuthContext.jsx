import { createContext, useState } from "react";

export const Auth = createContext();
export const AuthProvider = ({ children }) => {
    
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
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
