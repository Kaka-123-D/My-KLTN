import { RoleType, UserStatus } from "./enums";

export interface IStorageData {
  data: any;
}

export interface IFilter {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
  positionId?: number;
  skillId?: number;
  levelId?: number;
  fullName?: string;
  hrName?: string;
  status?: number;
}

export interface ILevel {
  updated_at: string;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
}

export interface IPosition {
  updated_at: string;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
}
export interface ISkill {
  updated_at: string;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
}

export interface IUser {
  id: string;
  email: string;
  status: string;
  name: string;
  updatedAt: string;
  avatar: string;
}

export interface IHRAssigned {
  avatar: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  status: string;
  updatedAt: string;
}

export interface ICandidateInfo {
  applyInfo: any;
  birthday: string;
  created_at: string;
  deleted_at: string;
  email: string;
  fullName: string;
  hrAssigned: IHRAssigned;
  id: number;
  level: ILevel;
  mobile: string;
  position: IPosition;
  school: number;
  sex: number;
  skill: ISkill;
  updated_at: string;
  user: IUser;
  candidate: any;
  status: any;
}

export interface IOrderInfo {
  id: number;
  description?: string;
  name?: string;
  target?: number;
  totalRecruited?: number;
  level: ILevel;
  position: IPosition;
  skill: ISkill;
  status?: number;
  deadline?: string;
  owner?: IUser;
}

export interface ICandidateForm {
  fullName: string;
  sex: number;
  mobile: string;
  email: string;
  birthday: string;
  school?: number;
  skillId?: number;
  positionId?: number;
  levelId?: number;
  experience?: number;
  applyDate?: string;
  linkCvOnline?: string;
}

export interface IJobForm {
  name: string;
  positionId: number;
  skillId: number;
  levelId: number;
  experience: number;
  max_salary: number;
  description?: string;
}

export interface IOrderForm {
  name: string;
  positionId: number;
  skillId: number;
  levelId: number;
  description?: string;
  maxSalary: string;
  target: number;
  deadline?: string;
}

export interface IAccount {
  id: number;
  email: string;
  status: UserStatus;
  name: string;
  updatedAt: string;
  createdAt: string;
  role: {
    id: number;
    name: RoleType;
    createdAt: string;
    updatedAt: string;
  };
  phone: string;
  avatar: string;
}

export interface IRole {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAccountForm {
  email: string;
  password?: string;
  role: number;
  name: string;
  phone: string;
  avatar: string;
}

export interface IChangePasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

export interface IRadio {
  label: string;
  value: number;
  disabled?: boolean;
}
