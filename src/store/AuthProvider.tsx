import { useState } from "react";
import { LoginResponse } from "../interfaces/Auth";
import { login } from "../api/auth";
import AuthContext, { AuthState, initialAuthState } from "./auth-context";
import React from "react";
import { getAuthToken } from "../utils/auth";
import { getUserDetails } from "../api/users";
import { tokenValidity } from "../utils/constants";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const loginHandler = async (email: string, password: string) => {
    setAuthState((prevState: AuthState) => {
      return { ...prevState, isLoginPending: true };
    });
    try {
      const user = await login(email, password);
      const now = new Date();
      const expireTime = now.getTime() + tokenValidity * 60 * 60 * 1000;
      localStorage.setItem("token", user.token);
      localStorage.setItem("expires", expireTime.toString());
      console.log("login cu succes");
      setAuthState((prevState: AuthState) => {
        return {
          ...prevState,
          token: user.token,
          isLoginPending: false,
          loginError: null,
        };
      });
      return true;
    } catch (error: any) {
      console.log(error);
      console.log("eroare la login");
      setAuthState((prevState: AuthState) => {
        return {
          ...prevState,
          isLoginPending: false,
          loginError: error.response.data.message,
        };
      });
      return false;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
    setAuthState((prevState: AuthState) => {
      return {
        ...prevState,
        token: "",
        isLoginPending: false,
        loginError: null,
        loggedUser: null,
      };
    });
  };

  const getUserDetailsHandler = async () => {
    const tokenLS = getAuthToken();
    if (tokenLS) {
      try {
        const user = await getUserDetails(tokenLS);
        console.log("get user details");
        setAuthState((prevState: AuthState) => {
          return {
            ...prevState,
            loggedUser: user,
          };
        });
      } catch (error) {
        console.log(error);
        setAuthState((prevState: AuthState) => {
          return {
            ...prevState,
            loggedUser: null,
          };
        });
      }
    } else {
      setAuthState((prevState: AuthState) => {
        return {
          ...prevState,
          loggedUser: null,
        };
      });
    }
  };

  const authContext = {
    ...authState,
    login: loginHandler,
    logout: logoutHandler,
    getDetailsForUser: getUserDetailsHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
