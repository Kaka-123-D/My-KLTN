import { sendGet, sendPost } from "./axios";

export const apiCreateClass = (payload: any) => sendPost("/class/create", payload);
