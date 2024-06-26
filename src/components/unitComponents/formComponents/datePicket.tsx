import { DatePicker, DatePickerProps, Typography } from "antd";
import dayjs from "dayjs";
import { useField } from "formik";
import ErrorText from "./errorText";

interface IAppDatePicker {
  name: string;
  label: string;
  min?: string;
  max?: string;
  readonly?: boolean;
}

const AppDatePicker = (props: IAppDatePicker) => {
  const { name, label, min, max, readonly } = props;
  const [{ value, onBlur }, {}, { setValue }] = useField(name);
  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  const onValueChange: DatePickerProps["onChange"] = (date, dateString) => {
    setValue(dateString);
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
        onBlur={onBlur}
      />
      <ErrorText name={name} />
    </div>
  );
};

export default AppDatePicker;
