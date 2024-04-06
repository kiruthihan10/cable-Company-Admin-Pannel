import * as Yup from "yup";
import {
  IPasswordForm,
  PasswordFormInitialValues,
  PasswordFormValidation,
} from "../passwordForm";
import {
  IUserForm,
  UserFormInitialValues,
  UserFormValidation,
} from "../user/userForm";

export interface IEmployeeForm extends IUserForm {}

export interface IAddEmployeeForm extends IEmployeeForm, IPasswordForm {
  isAdmin: boolean;
}

export const EmployeeFormInitialValues: IEmployeeForm = {
  ...UserFormInitialValues,
};

export const AddEmployeeFormInitialValues: IAddEmployeeForm = {
  ...EmployeeFormInitialValues,
  ...PasswordFormInitialValues,
  isAdmin: false,
};

export const EmployeeFormValidation: Yup.ObjectSchema<IEmployeeForm> =
  UserFormValidation.shape({});

export const AddEmployeeFormValidation: Yup.ObjectSchema<IAddEmployeeForm> =
  EmployeeFormValidation.concat(PasswordFormValidation).shape({
    isAdmin: Yup.bool().required(),
  });
