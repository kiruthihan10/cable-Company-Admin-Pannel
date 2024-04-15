import { DatePicker, DatePickerProps, Typography } from "antd";
import dayjs from "dayjs";
import { useField } from "formik";
const { Text } = Typography;

interface IAppDatePicker {
  name: string;
  label: string;
  min?: string;
  max?: string;
  readonly?: boolean;
}

const AppDatePicker = (props: IAppDatePicker) => {
  const { name, label, min, max, readonly } = props;
  const [{ value, onChange }, { error }, { setValue }] = useField(name);
  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  const onValueChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange(setValue(dateString));
  };
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      <DatePicker
        onChange={onValueChange}
        allowClear={false}
        value={dayjs(value)}
        style={{ width: "100%" }}
        minDate={min ? dayjs(min) : undefined}
        maxDate={max ? dayjs(max) : undefined}
        readOnly={readonly}
        inputReadOnly={readonly}
        disabled={readonly}
      />
      <Text type="danger">{error}</Text>
    </div>
  );
};

export default AppDatePicker;
