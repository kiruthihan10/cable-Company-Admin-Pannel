export interface ISingleAreaResponse {
  id: number;
  name: string;
  agent: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    isAdmin: boolean;
    companyIsActive: boolean;
    companyName: string;
  };
  noOfCustomers: number;
}

export interface IAreasResponse {
  areas: ISingleAreaResponse[];
  noOfAreas: number;
}
