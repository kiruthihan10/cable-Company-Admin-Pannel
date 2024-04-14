import { userType } from "@/interfaces/user";
import { useUserStore } from "@/stores/userStore";
import axios, { AxiosError } from "axios";
import {
  IAddCompanyRequest,
  IAddCompanyResponse,
  ICompaniesResponse,
  IUpdateCompanyActiveState,
} from "./interfaces/companyInterfaces";
import {
  IAddEmployeeRequest,
  IEmployeeResponse,
  IEmployeesResponse,
  IUpdateEmployeeRequest,
} from "./interfaces/employeeInterfaces";
import {
  IAddCustomerRequest,
  ICustomerResponse,
  ICustomersResponse,
} from "./interfaces/customerInterface";
import { IAreasResponse } from "./interfaces/areaInterface";

export interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  role: userType;
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
  axios.defaults.headers["Authorization"] =
    user?.token != undefined ? "Bearer " + user?.token : null;

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
  const getCompanies = (page?: number, size?: number, orderBy?: string) => {
    return get<ICompaniesResponse>("/Company", {
      page,
      size,
      orderBy,
    });
  };

  const addCompany = (addCompanyRequest: IAddCompanyRequest) => {
    return post<IAddCompanyResponse>("/Company", addCompanyRequest);
  };

  const getCompany = (companyID: number) => {
    return get<IAddCompanyResponse>(`/Company/${companyID}`);
  };

  const setCompanyActiveStatus = (request: IUpdateCompanyActiveState) => {
    const { companyID, isActive } = request;
    return post<IAddCompanyResponse>(`/Company/${companyID}/isActive`, {
      isActive: isActive,
    });
  };

  const getEmployees = (page?: number, size?: number, orderBy?: string) => {
    return get<IEmployeesResponse>("/Employee", {
      page,
      size,
      orderBy,
    });
  };
  const addEmployee = (addEmployeeRequest: IAddEmployeeRequest) => {
    return post<IEmployeeResponse>("/Employee", addEmployeeRequest);
  };
  const getEmployee = (id: string) => {
    return get<IEmployeeResponse>(`/Employee/${id}`);
  };
  const updateEmployee = (addEmployeeRequest: IUpdateEmployeeRequest) => {
    return post<IEmployeeResponse>(
      `/Employee/${addEmployeeRequest.id}`,
      addEmployeeRequest
    );
  };
  const getCustomers = (page?: number, size?: number, orderBy?: string) => {
    return get<ICustomersResponse>("/Customer", {
      page,
      size,
      orderBy,
    });
  };
  const addCustomer = (addCustomerRequest: IAddCustomerRequest) => {
    return post<ICustomerResponse>("/Customer", {
      ...addCustomerRequest,
      connectionStartDate: addCustomerRequest.connectionStartDate.slice(0, 10),
    });
  };
  const getAreas = () => {
    return get<IAreasResponse>("/Area");
  };
  return {
    getCompanies,
    addCompany,
    getCompany,
    setCompanyActiveStatus,
    getEmployees,
    addEmployee,
    updateEmployee,
    getEmployee,
    getCustomers,
    addCustomer,
    getAreas,
  };
};
