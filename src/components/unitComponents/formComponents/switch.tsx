"use client";

import { Switch, Typography } from "antd";
import { useField } from "formik";
import { ReactNode } from "react";
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
  const [{ value, onChange }, { error }, {}] = useField(name);
  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={uncheckedChildren}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <Text type="danger">{error}</Text>
    </div>
  );
};

export default AppSwitch;
