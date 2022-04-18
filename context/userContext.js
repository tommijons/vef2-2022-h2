import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function AppWrapper({ children }) {
  const [login, setLogin] = useState({});

  const logOut = () => {
    setLogin({ login: false, name: {}});
    localStorage.setItem("user", JSON.stringify({ login: false, name: {}}));
  }

  useEffect(() => {   
    if (JSON.parse(localStorage.getItem("user"))) { 
      setLogin(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      login,
      setLogin,
      logOut,
    }}>
      { children }
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}