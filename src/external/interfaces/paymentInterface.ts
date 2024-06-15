import { ISingleUserResponse } from "./userInterface";

export interface ISingleCustomerPaymentResponse {
  id: number;
  amount: number;
  date: Date;
  discriminator: string;
  payer: ISingleUserResponse;
}

export interface ICustomerPaymentsResponse {
  payments: ISingleCustomerPaymentResponse[];
  noOfPayments: number;
}
