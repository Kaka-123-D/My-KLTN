import Cookies from "js-cookie";
import { TokenType } from "../constants/enums";

import { IStorageData } from "../constants/interfaces";

const EXPIRES = 1;

const setItem = (key: string, value: IStorageData, expiresHours?: number) => {
  Cookies.set(key, JSON.stringify(value), {
    expires: expiresHours
      ? new Date(Date.now() + expiresHours * 60 * 60 * 1000)
      : EXPIRES,
    path: "/",
  });
};
const getItem = (key: string): IStorageData | null => {
  return JSON.parse(Cookies.get(key) || "null");
};
const removeItem = (key: string) => {
  Cookies.remove(key, { path: "/" });
};

const setToken = (token: string) => {
  setItem(TokenType.TOKEN, { data: token });
};
const getToken = () => {
  return getItem(TokenType.TOKEN)?.data;
};
const removeToken = () => {
  removeItem(TokenType.TOKEN);
};

const setRefreshToken = (refreshToken: string) => {
  setItem(TokenType.REFRESH_TOKEN, { data: refreshToken });
};
const getRefreshToken = () => {
  return getItem(TokenType.REFRESH_TOKEN)?.data;
};
const removeRefreshToken = () => {
  removeItem(TokenType.REFRESH_TOKEN);
};

const storage = {
  setItem,
  getItem,
  removeItem,
  setToken,
  getToken,
  removeToken,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
};
export default storage;
