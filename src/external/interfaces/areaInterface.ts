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

export interface ISingleAreaResponse {
  id: number;
  name: string;
  agent: IAreaAgent;
  noOfCustomers: number;
}

export interface IAreasResponse {
  areas: ISingleAreaResponse[];
  noOfAreas: number;
}
