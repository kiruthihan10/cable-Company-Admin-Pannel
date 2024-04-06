import { IAddUserRequest, ISingleUserResponse } from "./userInterface";

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

export interface IAddFirstEmployeeRequest extends IAddUserRequest {}

export interface IAddEmployeeRequest extends IAddFirstEmployeeRequest {
  isAdmin: boolean;
}

export interface IEmployeeResponse extends ISingleUserResponse {
  isAdmin: boolean;
  companyIsActive: boolean;
  companyName: string;
}
