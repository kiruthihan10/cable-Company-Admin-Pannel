import { ILoginRequest, login } from "./service";

export const MutateConstants = {
  login: "login",
};

export const MutateLogin = async (formData: ILoginRequest) => {
  const { data } = await login(formData);
  return data;
};
