export type userType = "Admin" | "Employee" | "Customer";

export interface IUser {
  username: string;
  password: string;
  userType?: userType;
  token?: string;
}
