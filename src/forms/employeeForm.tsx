import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import * as Yup from "yup";

export interface IEmployeeForm {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | undefined;
}

export const EmployeeFormInitialValues: IEmployeeForm = {
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: undefined,
};

export const EmployeeFormValidation: Yup.ObjectSchema<IEmployeeForm> =
  Yup.object().shape({
    password: Yup.string().required(),
    phoneNumber: Yup.number()
      .required()
      .max(79999999, "Invalid Phone No")
      .min(60000000, "Invalid Phone No"),
    firstName: Yup.string().required("Required").max(50),
    lastName: Yup.string().required("Required").max(50),
    email: Yup.string().email().required(),
  });

const EmployeeForm = () => {
  return (
    <>
      <AppTextInput
        name="password"
        placeholder="Password"
        label="Password"
        isPassword
      />
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
