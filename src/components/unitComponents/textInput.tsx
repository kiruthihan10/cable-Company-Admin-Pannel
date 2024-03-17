"use client";

import { Input, InputNumber, Typography } from "antd";
import { useField } from "formik";
const { Text } = Typography;

interface IAppTextInput {
  name: string;
  placeholder?: string;
  label?: string;
  isPassword?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

const AppTextInput = (props: IAppTextInput) => {
  const {
    name,
    placeholder,
    label,
    isPassword = false,
    disabled = false,
    readonly = false,
  } = props;
  const [{ value, onChange }, { error }, {}] = useField(name);

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
    />
  ) : (
    <Input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readonly}
    />
  );
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      {inputComponent}
      <Text type="danger">{error}</Text>
    </div>
  );
};

export default AppTextInput;
