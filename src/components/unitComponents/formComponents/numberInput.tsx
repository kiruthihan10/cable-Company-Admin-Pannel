import { Input, InputNumber, Typography } from "antd";
import { useField } from "formik";
import ErrorText from "./errorText";
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
  const [{ value, onChange, onBlur }, { error, touched }, {}] = useField(name);
  console.log(touched);

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
        onBlur={onBlur}
      />
      <ErrorText name={name} />
    </div>
  );
};

export default AppNumberInput;
