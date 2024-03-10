export type userType = "Admin" | "Employee" | "Internal";

export interface IUser {
  username: string;
  password: string;
  userType?: userType;
  token?: string;
}
