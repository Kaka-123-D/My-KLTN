import { sendGet } from "./axios";

export const getListRole = () => sendGet("/common/roles");
export const getListPosition = () => sendGet("/common/positions");
export const getListSkill = () => sendGet("/common/skills");
export const getListLevel = () => sendGet("/common/levels");
export const getListExperience = () => sendGet("/common/experiences");
export const getListSchool = () => sendGet("/common/schools");
export const getListPersonnelType = () => sendGet("/common/personnel-types");
export const getListContractType = () => sendGet("/common/contract-types");
