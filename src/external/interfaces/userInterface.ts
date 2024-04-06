export interface ISingleUserResponse {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export interface IAddUserRequest {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}