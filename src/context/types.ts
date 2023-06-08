import React from "react";

export type ContextProviderProps = {
  children: React.ReactNode;
};

export interface CurrentUserType {
  id: string;
  email: string;
  name: string;
  avatar: string;
  languages: string[];
  status: string;
  createdAt: string;
}

export const CurrentUserTypeInit = {
  id: "",
  email: "",
  name: "",
  avatar: "",
  languages: [],
  status: "",
  createdAt: "",
};

export type AuthContextType = {
  user: CurrentUserType | null;
  dispatch: React.Dispatch<AuthActionType>;
};

export type AuthActionType = {
  type: string;
  payload: CurrentUserType | null;
};

export type AuthStateType = {
  user: CurrentUserType | null;
};
