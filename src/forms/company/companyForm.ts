import {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  EmployeeFormInitialValues,
  EmployeeFormValidation,
  IAddEmployeeForm,
  IEmployeeForm,
} from "../employee/employeeForm";
import * as Yup from "yup";

export interface ICompanyForm extends IEmployeeForm {
  name: string;
  isActive?: boolean;
}

export interface IAddCompanyForm extends ICompanyForm, IAddEmployeeForm {}

export const CompanyFormInitialValues: ICompanyForm = {
  ...EmployeeFormInitialValues,
  name: "",
  isActive: false,
};

export const AddCompanyFormInitialValues: IAddCompanyForm = {
  ...AddEmployeeFormInitialValues,
  ...CompanyFormInitialValues,
};

export const CompanyFormValidation: Yup.ObjectSchema<ICompanyForm> =
  EmployeeFormValidation.shape({
    name: Yup.string().required(),
    isActive: Yup.bool(),
  });

export const AddCompanyFormValidation: Yup.ObjectSchema<IAddCompanyForm> =
  CompanyFormValidation.concat(AddEmployeeFormValidation);
