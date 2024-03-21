export interface ISingleEmployeeResponse {
  username: string;
  isAdmin: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
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

export interface IEmployeeResponse {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  isAdmin: boolean;
  companyIsActive: boolean;
  companyName: string;
}
