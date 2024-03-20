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
