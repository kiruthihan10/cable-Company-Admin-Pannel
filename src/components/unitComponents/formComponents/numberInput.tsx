import { Input, InputNumber, Typography } from "antd";
import { useField } from "formik";
const { Text } = Typography;

interface IAppNumberInput {
  name: string;
  placeholder?: string;
  label?: string;
  max?: number;
  addonBefore?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const AppNumberInput = (props: IAppNumberInput) => {
  const {
    name,
    placeholder,
    label,
    max,
    addonBefore,
    disabled = false,
    readonly = false,
  } = props;
  const [{ value, onChange }, { error }, {}] = useField(name);

  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
        }}
        max={max}
        type="number"
        addonBefore={addonBefore}
        disabled={disabled}
        readOnly={readonly}
      />
      <Text type="danger">{error}</Text>
    </div>
  );
};

export default AppNumberInput;
