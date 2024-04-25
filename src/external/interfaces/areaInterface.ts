import { ICustomerResponse } from "./customerInterface";

export interface IAreaAgent {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  isAdmin: boolean;
  companyIsActive: boolean;
  companyName: string;
}

interface IBaseAreaResponse {
  id: number;
  name: string;
  agent: IAreaAgent;
}

export interface ISingleAreaResponse extends IBaseAreaResponse {
  noOfCustomers: number;
}

export interface IAreasResponse {
  areas: ISingleAreaResponse[];
  noOfAreas: number;
}

export interface IAddAreaRequest {
  name: string;
  agentId: string;
}

export interface IAreaResponse extends IBaseAreaResponse {
  customers: ICustomerResponse[];
}
