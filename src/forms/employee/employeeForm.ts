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

export interface IUpdateEmployeeForm extends IEmployeeForm {
  isAdmin: boolean;
}

export interface IAddEmployeeForm extends IUpdateEmployeeForm, IPasswordForm {
  isAdmin: boolean;
}

export const EmployeeFormInitialValues: IEmployeeForm = {
  ...UserFormInitialValues,
};

export const UpdateEmployeeFormInitialValues: IUpdateEmployeeForm = {
  ...EmployeeFormInitialValues,
  isAdmin: false,
};

export const AddEmployeeFormInitialValues: IAddEmployeeForm = {
  ...UpdateEmployeeFormInitialValues,
  ...PasswordFormInitialValues,
};

export const EmployeeFormValidation: Yup.ObjectSchema<IEmployeeForm> =
  UserFormValidation.shape({});

export const UpdateEmployeeFormValidation: Yup.ObjectSchema<IUpdateEmployeeForm> =
  EmployeeFormValidation.shape({
    isAdmin: Yup.bool().required(),
  });

export const AddEmployeeFormValidation: Yup.ObjectSchema<IAddEmployeeForm> =
  UpdateEmployeeFormValidation.concat(PasswordFormValidation);
