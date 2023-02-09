export enum TokenType {
  TOKEN = "token",
  REFRESH_TOKEN = "refreshToken",
}

export enum ErrorCode {
  UNAUTHORIZED = "Unauthorized",
}

export enum DebounceTime {
  DEFAULT = 500,
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  NOT_VERIFY = "NOT_VERIFY",
}

export enum RoleType {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
  ADMIN = "ADMIN",
  HR = "HR",
  HRM = "HRM",
  LEADER = "LEADER",
}

export enum ActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export enum GenderType {
  MALE = 1,
  FEMALE = 0,
  OTHER = 2,
}

export enum StatusJob {
  PROCESSING = 1,
  LATE_DEADLINE = 2,
  COMPLETED = 3
}
