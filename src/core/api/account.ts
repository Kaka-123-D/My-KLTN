import { sendGet, sendPost, sendPut } from "./axios";

export const getListUser = (params: any) => sendGet("/users", params);
export const updateUserStatus = (id: number, payload: any) =>
  sendPut(`/users/${id}/update-status`, payload);
export const createAccount = (payload: any) =>
  sendPost("/auth/register", payload);
export const updateAccount = (id: number, payload: any) =>
  sendPut(`users/${id}/update-profile`, payload);
export const changePassword = (id: number, payload: any) =>
  sendPut(`users/${id}/change-password`, payload);
