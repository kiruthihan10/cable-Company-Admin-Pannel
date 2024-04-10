import { useFormikContext } from "formik";
import AppButton, { IAppButton } from "../button";

interface IFormButton extends IAppButton {}

const FormButton = (props: IFormButton) => {
  const { dirty, isValid, errors } = useFormikContext();
  console.log(errors);
  const disabled = !(isValid && dirty);
  return <AppButton {...props} disabled={disabled} />;
};

export default FormButton;
