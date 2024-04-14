import {
  IAddUserRequest,
  IBaseUserRequest,
  ISingleUserResponse,
} from "./userInterface";

export interface ISingleEmployeeResponse extends ISingleUserResponse {
  isAdmin: boolean;
  totalCustomers: number;
  totalPaymentCollections: number;
  totalPaymentGeneration: number;
  totalAreasUnderControl: number;
}

export interface IEmployeesResponse {
  employees: ISingleEmployeeResponse[];
  noOfEmployees: number;
}

export interface IEmployeeBaseRequest extends IBaseUserRequest {}

export interface IAddFirstEmployeeRequest
  extends IEmployeeBaseRequest,
    IAddUserRequest {}

export interface IAddEmployeeRequest extends IAddFirstEmployeeRequest {
  isAdmin: boolean;
}

export interface IEmployeeResponse extends ISingleUserResponse {
  isAdmin: boolean;
  companyIsActive: boolean;
  companyName: string;
}

export interface IUpdateEmployeeRequest extends IEmployeeBaseRequest {
  id: string;
}
