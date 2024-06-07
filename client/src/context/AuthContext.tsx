import React, { createContext, useContext, useEffect, useState } from "react";

interface IContext {
  isAuth: boolean;
  userLogin: string | null;
  setUserLogin: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}
export const AuthContext = createContext<IContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { login } = JSON.parse(storedUser);
      setUserLogin(login);
      setIsAuth(true);
    }
  }, []);

  const logout = () => {
    setIsAuth(false);
    setUserLogin(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ isAuth, setIsAuth, userLogin, setUserLogin, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен быть использован с провайдером");
  }
  return context;
};
