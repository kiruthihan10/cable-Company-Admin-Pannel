import { ISingleUserResponse } from "./userInterface";

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
