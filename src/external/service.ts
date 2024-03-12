import { userType } from "@/interfaces/user";
import { useUserStore } from "@/stores/userStore";
import axios, { AxiosError } from "axios";

export interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  userType: userType;
}

interface ISingleCompanyResponse {
  id: number;
  name: string;
  contactNumber: number;
  contactPerson: string;
  totalCustomers: number;
  totalEmployees: number;
  totalPayments: number;
  totalAreas: number;
}

interface ICompaniesResponse {
  companies: ISingleCompanyResponse[];
  noOfCompanies: number;
}

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://skpt-skpt.koyeb.app/api"
    : "http://127.0.0.1:5054";

export const login = (req: ILoginRequest) => {
  const { username, password } = req;
  return axios.post<ILoginResponse>(baseURL + "/login", {
    username: username,
    password: password,
  });
};

export const useAPIController = () => {
  const user = useUserStore((state) => state.user);
  const setToken = useUserStore((state) => state.setToken);
  axios.defaults.headers["Authorization"] = "Bearer " + user?.token;
  const get = <T>(url: string, params?: unknown) => {
    return axios
      .get<T>(baseURL + url, { params: params })
      .catch(async (error: Error | AxiosError) => {
        handleUnAuth(error);
      });
  };
  const post = <T>(url: string, data?: any) => {
    return axios
      .post<T>(baseURL + url, data)
      .catch(async (error: Error | AxiosError) => {
        handleUnAuth(error);
      });
  };
  const handleUnAuth = async (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      if (error.status == 401) {
        if (user) {
          setToken((await login(user)).data.token);
        }
      }
    }
  };
  const getCompanies = (page?: number, size?: number) => {
    return get<ICompaniesResponse>("/Company", {
      page,
      size,
    });
  };
};
