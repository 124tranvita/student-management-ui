import React, { createContext, useEffect, useReducer } from "react";
import {
  AuthActionType,
  AuthStateType,
  ContextProviderProps,
  AuthContextType,
} from "./types";
import * as Constants from "./constants";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const authReducer = (state: AuthStateType, action: AuthActionType) => {
  switch (action.type) {
    case Constants.LOGIN:
      return { user: action.payload };
    case Constants.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");

    if (user) {
      dispatch({ type: Constants.LOGIN, payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
