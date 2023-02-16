import React, { createContext, useContext, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useUserInfo } from "../hooks/useUserInfo";

interface AuthContextInterface {
  hasRole: (roles?: number[]) => {};
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  isLoggingIn: boolean;
  userInfo?: any;
  listClass: any;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoggingIn, login } = useLogin();
  const { logout } = useLogout();
  const { data: userInfo } = useUserInfo();
  const [listClass] = useState([
    { name: "class 1", count: 5 },
    { name: "class 2", count: 5 },
    { name: "class 3", count: 5 },
    { name: "class 4", count: 5 },
    { name: "class 5", count: 5 },
  ]);

  const hasRole = (roles?: number[]) => {
    if (!roles || roles.length === 0 || !userInfo) {
      return true;
    }
    return roles.includes(userInfo?.role?.id);
  };

  const handleLogin = async (email: string, password: string) =>
    login({ email, password });

  const handleLogout = async () => logout();

  return (
    <AuthContext.Provider
      value={{
        hasRole,
        isLoggingIn,
        login: handleLogin,
        logout: handleLogout,
        userInfo,
        listClass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
