import { ISingleUserResponse } from "./userInterface";

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

export interface IAddFirstEmployeeRequest {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export interface IAddEmployeeRequest extends IAddFirstEmployeeRequest {
  isAdmin: boolean;
}

export interface IEmployeeResponse extends ISingleUserResponse {
  isAdmin: boolean;
  companyIsActive: boolean;
  companyName: string;
}
