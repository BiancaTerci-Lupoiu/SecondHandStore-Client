import React from "react";
import { UserWithoutSensitiveInfo } from "../interfaces/User";
export type AuthState = {
  token: string;
  isLoginPending: boolean;
  loginError: string | null;
  login?: (email: string, password: string) => Promise<boolean>;
  logout?: () => void;
  loggedUser: UserWithoutSensitiveInfo | null;
  getDetailsForUser?: () => void;
};

export const initialAuthState: AuthState = {
  token: "",
  isLoginPending: false,
  loginError: null,
  loggedUser: null,
};
const AuthContext = React.createContext<AuthState>(initialAuthState);

export default AuthContext;
