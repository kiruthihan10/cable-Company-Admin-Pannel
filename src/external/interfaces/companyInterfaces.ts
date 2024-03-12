export interface ISingleCompanyResponse {
  id: number;
  name: string;
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
