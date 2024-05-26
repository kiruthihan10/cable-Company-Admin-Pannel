import * as Yup from "yup";

import AppTextInput from "@/components/unitComponents/textInput";

export interface IPasswordForm {
  password: string;
}

export const PasswordFormInitialValues: IPasswordForm = {
  password: "123456789",
};

export const PasswordFormValidation: Yup.ObjectSchema<IPasswordForm> =
  Yup.object().shape({
    password: Yup.string().required(),
  });

const PasswordForm = () => {
  <AppTextInput
    name="password"
    placeholder="Password"
    label="Password"
    isPassword
  />;
};

export default PasswordForm;
