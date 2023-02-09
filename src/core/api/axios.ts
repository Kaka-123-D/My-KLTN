import Axios from "axios";

import configs from "../config";
import { ErrorCode, TokenType } from "../constants/enums";
import { handleErrorMessage } from "../helpers";
import storage from "../helpers/storage";

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = storage.getItem(TokenType.TOKEN)?.data;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const originalConfig = error.config;
    if (error.response?.data?.errorCode !== ErrorCode.UNAUTHORIZED) {
      handleErrorMessage(error);
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}/auth/refresh-token`, {
      refreshToken: storage.getItem(TokenType.REFRESH_TOKEN)?.data,
    })
      .then((res: any) => {
        if (res?.data?.data?.token) {
          const data = res.data.data;
          storage.setItem(TokenType.TOKEN, {
            data: data?.token,
          });
          originalConfig.headers.Authorization = `Bearer ${data.token}`;
          return Axios(originalConfig);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res) => res.data);
