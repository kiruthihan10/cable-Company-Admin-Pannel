import { userType } from "@/interfaces/user";
import axios from "axios";

export interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  userType: userType;
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
