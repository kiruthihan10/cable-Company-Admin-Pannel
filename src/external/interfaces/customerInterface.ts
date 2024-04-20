import {
  IAddUserRequest,
  IBaseUserRequest,
  ISingleUserResponse,
} from "./userInterface";

export interface ISingleCustomerResponse extends ISingleUserResponse {
  identityNo: string;
  boxCaNumber: string;
  customerNo: string;
  activeConnection: boolean;
  hasDigitalBox: boolean;
  offerPowerIntake: boolean;
  isDisconnected: boolean;
  connectionStartDate: Date;
  totalPayments: number;
  totalPaymentsPaid: number;
}

export interface ICustomersResponse {
  customers: ISingleCustomerResponse[];
  noOfCustomers: number;
}

export interface ICustomerBase {
  address: string;
  identityNo: string;
  boxCaNumber: string;
  customerNo: string;
  activeConnection: boolean;
  hasDigitalBox: boolean;
  offerPowerIntake: boolean;
  isDisconnected: boolean;
  connectionStartDate: string;
}

export interface IAddCustomerRequest extends IAddUserRequest, ICustomerBase {
  areaID: number;
}

export interface ICustomerResponse extends ISingleUserResponse, ICustomerBase {}

export interface IUpdateCustomerRequest
  extends ICustomerBase,
    IBaseUserRequest {
  id: string;
  areaID: number;
}
