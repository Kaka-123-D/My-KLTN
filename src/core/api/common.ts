import { sendGet, sendPost } from "./axios";

export const apiCreateClass = (payload: any) =>
  sendPost("/class/create", payload);

export const apiGetListClass = (payload: any) => sendGet("/class/list");
