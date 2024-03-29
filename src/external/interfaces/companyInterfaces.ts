import { IAddFirstEmployeeRequest } from "./employeeInterfaces";

export interface ISingleCompanyResponse {
  id: number;
  name: string;
  joinedDate: string;
  contactNumber: number;
  contactPerson: string;
  totalCustomers: number;
  totalEmployees: number;
  totalPayments: number;
  totalAreas: number;
}

export interface ICompaniesResponse {
  companies: ISingleCompanyResponse[];
  noOfCompanies: number;
}

export interface IAddCompanyRequest {
  name: string;
  employeeCreateRequest: IAddFirstEmployeeRequest;
}

export interface IAddCompanyResponse {
  companyName: string;
  companyIsActive: boolean;
  joinedDate: string;
  employees: [
    {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: number;
    }
  ];
  customers: [
    {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: number;
    }
  ];
  contactPerson: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
  };
}

export interface IUpdateCompanyActiveState {
  companyID: number;
  isActive: boolean;
}
