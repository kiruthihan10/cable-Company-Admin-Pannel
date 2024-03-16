import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import * as Yup from "yup";
import {
  IPasswordForm,
  PasswordFormInitialValues,
  PasswordFormValidation,
} from "./passwordForm";

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

interface IEmployeeFormProps {
  addEmployee?: boolean;
}

const EmployeeForm = (props: IEmployeeFormProps) => {
  const { addEmployee = true } = props;
  const passwordField = addEmployee ? (
    <AppTextInput
      name="password"
      placeholder="Password"
      label="Password"
      isPassword
    />
  ) : null;
  return (
    <>
      {passwordField}
      <Flex justify={"space-between"}>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="firstName"
            placeholder="FirstName"
            label="FirstName"
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="lastName"
            placeholder="LastName"
            label="LastName"
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput name="email" placeholder="Email" label="Email" />
        </div>
        <div style={{ width: "50%" }}>
          <AppNumberInput
            name="phoneNumber"
            placeholder="PhoneNumber"
            label="PhoneNumber"
            addonBefore="07"
          />
        </div>
      </Flex>
    </>
  );
};

export default EmployeeForm;
