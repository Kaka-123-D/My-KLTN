import { sendPost, sendGet, sendDelete } from "./axios";

export const apiLogin = (params: { email: string; password: string }) =>
  sendPost(`/auth/login`, params);
export const apiGetUserInfo = () => sendGet(`/auth/user-info`);
export const logout = () => sendDelete("/auth/logout");
export const forgotPassword = (payload: any) =>
  sendPost("/auth/forgot-password", payload);
