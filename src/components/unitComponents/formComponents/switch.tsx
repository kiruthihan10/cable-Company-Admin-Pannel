"use client";

import { Switch, Typography } from "antd";
import { useField } from "formik";
import { ReactNode } from "react";
import ErrorText from "./errorText";
const { Text } = Typography;

interface IAppSwitch {
  name: string;
  label?: string;
  disabled?: boolean;
  checkedChildren?: ReactNode;
  uncheckedChildren?: ReactNode;
}

const AppSwitch = (props: IAppSwitch) => {
  const { name, label, disabled, checkedChildren, uncheckedChildren } = props;
  const [{ value, onChange }, { error }, { setValue }] = useField(name);
  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  const onValChange = (checked: boolean) => {
    onChange(setValue(checked));
  };
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={uncheckedChildren}
        value={value}
        onChange={onValChange}
        disabled={disabled}
      />
      <ErrorText name={name} />
    </div>
  );
};

export default AppSwitch;
