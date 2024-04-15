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

export interface ICustomerForm extends IUserForm, ICustomerBase {}

export interface IAddCustomerForm extends ICustomerForm, IPasswordForm {
  areaID: number | undefined;
}

export const CustomerFormInitialValues: ICustomerForm = {
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
};

export const AddCustomerFormInitialValues: IAddCustomerForm = {
  ...CustomerFormInitialValues,
  ...PasswordFormInitialValues,
  areaID: 0,
};

export const CustomerFormValidation: Yup.ObjectSchema<ICustomerForm> =
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
  });

export const AddCustomerFormValidation: Yup.ObjectSchema<IAddCustomerForm> =
  CustomerFormValidation.concat(PasswordFormValidation).shape({
    areaID: Yup.number().required(),
  });
