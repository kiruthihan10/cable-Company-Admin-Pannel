import * as Yup from "yup";
import {
  IPasswordForm,
  PasswordFormInitialValues,
  PasswordFormValidation,
} from "../passwordForm";

export interface IEmployeeForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | undefined;
}

export interface IAddEmployeeForm extends IEmployeeForm, IPasswordForm {}

export const EmployeeFormInitialValues: IEmployeeForm = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: undefined,
};

export const AddEmployeeFormInitialValues: IAddEmployeeForm = {
  ...EmployeeFormInitialValues,
  ...PasswordFormInitialValues,
};

export const EmployeeFormValidation: Yup.ObjectSchema<IEmployeeForm> =
  Yup.object().shape({
    phoneNumber: Yup.number()
      .required()
      .max(79999999, "Invalid Phone No")
      .min(60000000, "Invalid Phone No"),
    firstName: Yup.string().required("Required").max(50),
    lastName: Yup.string().required("Required").max(50),
    email: Yup.string().email().required(),
  });

export const AddEmployeeFormValidation: Yup.ObjectSchema<IAddEmployeeForm> =
  EmployeeFormValidation.concat(PasswordFormValidation);
