import { sendGet, sendPost, sendPut } from "./axios";

export const apiGetListOrder = (params: any) => sendGet(`/order/list`, params);
export const apiCreateOrder = (params: any) =>
  sendPost(`/order/create`, params);
export const apiGetDetailOrder = (id: number) => sendGet(`/order/${id}`);
export const apiChangeStatusOrder = (params: any) =>
  sendPut(`/order/update-status/${params.orderId}`, params);
