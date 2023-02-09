import { sendGet, sendPost, sendPut, sendDelete } from "./axios";

export const apiGetListJob = (params: any) => sendGet(`/job/list`, params);
export const apiCreateJob = (params: any) => sendPost(`/job/create`, params);
export const apiEditJob = (id: number, params: any) =>
  sendPut(`/job/update/${id}`, params);
export const apiDeleteJob = (id: number) => sendDelete(`/job/${id}`);
export const apiGetDetailJob = (id: number) => sendGet(`/job/detail/${id}`);
export const apiAddCandidateToJob = (params: any) =>
  sendPost(`/job/add-candidate/${params.jobId}`, params);
export const apiGetListCandidateAvailable = (params: any) =>
  sendGet(`/candidate/list-available`, params);
export const apiRemoveCandidate = (params: any) =>
  sendPut(`/job/remove-candidate/${params.jobId}`, params);
export const apiGetListOrderAvailable = (params: any) =>
  sendGet(`/order/list-available`, params);
export const apiAddOrderToJob = (params: any) =>
  sendPost(`/job/add-order/${params.jobId}`, params);
