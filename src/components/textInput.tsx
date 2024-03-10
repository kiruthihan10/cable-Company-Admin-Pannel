"use client"

import { Input, Typography } from "antd";
import { useField } from "formik";
const { Text } = Typography;

interface IAppTextInput {
  name: string;
  placeholder?: string;
  label?: string;
}

const AppTextInput = (props: IAppTextInput) => {
  const { name, placeholder, label } = props;
  const [{ value, onChange }, { error }, {}] = useField(name);

  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  return (
    <>
      {labelComponent}
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Text type="danger">{error}</Text>
    </>
  );
};

export default AppTextInput;
