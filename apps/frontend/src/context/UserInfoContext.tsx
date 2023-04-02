import { createContext, useContext } from "react";

interface IUserInfoContext {
  username: string
}

export const defaultContextValue: IUserInfoContext = {
  username: '',
  setUsername: () => {},
  token: '',
  setToken: () => {},
}

export const UserInfoContext = createContext(defaultContextValue)

export const useUserInfo = () => useContext(UserInfoContext)
