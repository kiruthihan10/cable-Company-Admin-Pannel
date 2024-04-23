"use client";

import { Input, Typography } from "antd";
import { useField } from "formik";
import ErrorText from "./formComponents/errorText";

interface IAppTextInput {
  name: string;
  placeholder?: string;
  label?: string;
  isPassword?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  isTextArea?: boolean;
}

const AppTextInput = (props: IAppTextInput) => {
  const {
    name,
    placeholder,
    label,
    isPassword = false,
    disabled = false,
    readonly = false,
    isTextArea = false,
  } = props;
  const [{ value, onChange, onBlur }, { error }, {}] = useField(name);

  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  const inputComponent = isPassword ? (
    <Input.Password
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readonly}
      onBlur={onBlur}
    />
  ) : isTextArea ? (
    <Input.TextArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readonly}
      onBlur={onBlur}
    />
  ) : (
    <Input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readonly}
      onBlur={onBlur}
    />
  );
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      {inputComponent}
      {/* <ErrorText name={name} /> */}
      <ErrorText name={name} />
    </div>
  );
};

export default AppTextInput;
