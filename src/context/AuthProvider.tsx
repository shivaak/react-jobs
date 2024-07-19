// src/context/AuthProvider.tsx
import React, { createContext, useState, ReactNode } from "react";
import { logout as logoutApi } from "../services/userService";

export interface AuthContextType {
  auth: {
    roles: number[];
    accessToken: string;
  } | null;
  //setAuth: (auth: { roles: number[]; accessToken: string }) => void;
  setAuth: React.Dispatch<
    React.SetStateAction<{ roles: number[]; accessToken: string } | null>
  >;
  logout: () => void;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{
    roles: number[];
    accessToken: string;
  } | null>(null);

  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "false")
  );

  const logout = async () => {
    try {
      setAuth(null);
      await logoutApi();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
