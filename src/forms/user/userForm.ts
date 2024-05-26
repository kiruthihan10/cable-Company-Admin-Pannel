import * as Yup from "yup";

export interface IUserForm {
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | undefined;
}

export const UserFormInitialValues: IUserForm = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: undefined,
};

export const UserFormValidation: Yup.ObjectSchema<IUserForm> =
  Yup.object().shape({
    phoneNumber: Yup.number()
      .required()
      .max(79999999, "Invalid Phone No")
      .min(60000000, "Invalid Phone No"),
    firstName: Yup.string().required("Required").max(50),
    lastName: Yup.string().required("Required").max(50),
    email: Yup.string().email(),
  });
