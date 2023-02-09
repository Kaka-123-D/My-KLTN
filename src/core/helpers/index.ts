import { message } from "antd";
import moment from "moment";

import configs from "../config";

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || "Something went wrong!";
};

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== "prod") {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getIndexTable = (
  pageIndex: number,
  pageSize: number,
  current: number
) => {
  return (pageIndex - 1) * pageSize + current + 1;
};

export const convertUTCToLocalString = (time?: string, format?: string) => {
  if (!time) return "";
  return moment(time)
    .format(format || "DD/MM/YYYY HH:mm")
    .toString();
};

export const formatText = (str?: string) => {
  if (!str) return "";
  return str.trim().replace(/\s+/gm, " ");
};

export const formatSalary = (value?: string) => {
  if (!value) return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};

export const isValidHttpUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export const getValidHttpsUrl = (string: string) => {
  if (!string) return;
  if (isValidHttpUrl(string)) return string;
  return "https://" + string;
};
