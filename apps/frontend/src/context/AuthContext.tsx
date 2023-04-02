import { createContext, useContext } from "react";

export const defaultContextValue = {
  username: '',
  setUsername: () => {},
  token: '',
  setToken: () => {},
}

export const AuthContext = createContext(defaultContextValue)

export const useAuthContext = () => useContext(AuthContext)
