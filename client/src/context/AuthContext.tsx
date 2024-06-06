import React, { createContext, useContext, useState } from "react";

interface IContext {
  isAuth: boolean;
  userLogin: string | null;
  setUserLogin: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContext = createContext<IContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string | null>(null);

  return <AuthContext.Provider value={{ isAuth, setIsAuth, userLogin, setUserLogin }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен быть использован с провайдером");
  }
  return context;
};
