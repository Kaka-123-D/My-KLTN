import { sendGet, sendPost, sendPut } from "./axios";

export const apiGetListCandidate = (params: any) =>
  sendGet(`/candidate/list`, params);
export const apiCreateCandidate = (params: any) =>
  sendPost(`/candidate/create`, params);
export const getDetailCandidate = (id: any) =>
  sendGet(`/candidate/get-detail/${id}`);
export const putCandidate = (payload: any) =>
  sendPut("/candidate/update", payload);
export const updateStatusCandidate = (payload: any) =>
  sendPut(`/candidate/${payload.candidateId}/status`, payload);
export const createInterviewSchedule = (payload: any) =>
  sendPut(`/candidate/${payload.candidateId}/book-interview`, payload);
export const offerCandidate = (payload: any) =>
  sendPut(`/candidate/${payload.candidateId}/offer`, payload);
