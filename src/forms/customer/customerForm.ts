import { ICustomerBase } from "@/external/interfaces/customerInterface";
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
import * as Yup from "yup";
import dayjs from "dayjs";

export interface ICustomerFormBase extends IUserForm, ICustomerBase {
  areaID: number | undefined;
}

export interface IAddCustomerForm extends ICustomerFormBase, IPasswordForm {
  initialBilling: number;
}

export interface IUpdateCustomerForm extends ICustomerFormBase {}

export const CustomerFormInitialValues: ICustomerFormBase = {
  ...UserFormInitialValues,
  identityNo: "",
  boxCaNumber: "",
  customerNo: "",
  activeConnection: true,
  hasDigitalBox: true,
  offerPowerIntake: false,
  isDisconnected: false,
  address: "",
  connectionStartDate: dayjs().toISOString(),
  areaID: 0,
};

export const AddCustomerFormInitialValues: IAddCustomerForm = {
  ...CustomerFormInitialValues,
  ...PasswordFormInitialValues,
  initialBilling: 0,
};

export const UpdateCustomerFormInitialValues: IUpdateCustomerForm = {
  ...CustomerFormInitialValues,
};

export const CustomerFormValidation: Yup.ObjectSchema<ICustomerFormBase> =
  UserFormValidation.shape({
    identityNo: Yup.string().required(),
    boxCaNumber: Yup.string().required(),
    customerNo: Yup.string().required(),
    activeConnection: Yup.bool().required(),
    hasDigitalBox: Yup.bool().required(),
    offerPowerIntake: Yup.bool().required(),
    isDisconnected: Yup.bool().required(),
    address: Yup.string().required(),
    connectionStartDate: Yup.string().required(),
    areaID: Yup.number().required(),
  });

export const AddCustomerFormValidation: Yup.ObjectSchema<IAddCustomerForm> =
  CustomerFormValidation.concat(PasswordFormValidation).shape({
    initialBilling: Yup.number().min(0).required(),
  });

export const UpdateCustomerFormValidation: Yup.ObjectSchema<IUpdateCustomerForm> =
  CustomerFormValidation.shape({});
