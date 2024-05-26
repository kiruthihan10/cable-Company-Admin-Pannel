export interface ISingleUserResponse {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export interface IBaseUserRequest {
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export interface IAddUserRequest extends IBaseUserRequest {
  password: string;
}
