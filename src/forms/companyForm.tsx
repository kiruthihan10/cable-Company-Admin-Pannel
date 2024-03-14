import AppTextInput from "@/components/unitComponents/textInput";
import EmployeeForm, {
  EmployeeFormInitialValues,
  EmployeeFormValidation,
  IEmployeeForm,
} from "./employeeForm";
import { Divider, Typography } from "antd";
import * as Yup from "yup";

export interface ICompanyForm extends IEmployeeForm {
  name: string;
}

export const CompanyFormInitialValues = {
  ...EmployeeFormInitialValues,
  name: "",
};

export const CompanyFormValidation: Yup.ObjectSchema<ICompanyForm> =
  EmployeeFormValidation.shape({
    name: Yup.string().required(),
  });

const CompnayForm = () => {
  return (
    <>
      <AppTextInput
        name="name"
        placeholder="Company Name"
        label="Company Name"
      />
      <Divider />
      <Typography.Title level={4}>Contact Person</Typography.Title>
      <EmployeeForm />
    </>
  );
};

export default CompnayForm;
