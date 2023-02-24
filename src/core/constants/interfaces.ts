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
