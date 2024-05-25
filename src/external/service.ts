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
  IUpdateCustomerRequest,
} from "./interfaces/customerInterface";
import {
  IAddAreaRequest,
  IAreaResponse,
  IAreasResponse,
  ISingleAreaResponse,
  IUpdateAreaRequest,
} from "./interfaces/areaInterface";

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
    ? "https://cablecompanies.azurewebsites.net/"
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
      .post<T>(baseURL + url, data, {
        validateStatus: (status) => {
          return status != 401 && status != 404 && status != 409;
        },
      })
      .catch(async (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.status != 401) {
            throw error;
          }
        }
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

  const getCustomer = (id: string) => {
    return get<ICustomerResponse>(`/Customer/${id}`);
  };

  const updateCustomer = (addCustomerRequest: IUpdateCustomerRequest) => {
    return post<ICustomerResponse>(
      `/Customer/${addCustomerRequest.id}`,
      addCustomerRequest
    );
  };
  const getAreas = (page?: number, size?: number, orderBy?: string) => {
    return get<IAreasResponse>("/Area", {
      page,
      size,
      orderBy,
    });
  };

  const addArea = (request: IAddAreaRequest) => {
    return post<IAreaResponse>("/Area", request);
  };

  const getArea = (id: number) => {
    return get<IAreaResponse>(`/Area/${id}`);
  };

  const updateArea = (request: IUpdateAreaRequest) => {
    return post<IAreaResponse>(`/Area/${request.id}`, request);
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
    getCustomer,
    updateCustomer,
    getAreas,
    addArea,
    getArea,
    updateArea,
  };
};
