import { Select, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useField } from "formik";
const { Text } = Typography;

interface IAppSelect {
  name: string;
  label: string;
  options: DefaultOptionType[];
}

const AppSelect = (props: IAppSelect) => {
  const { name, label, options } = props;
  const [{ value, onChange }, { error }, {}] = useField(name);
  const labelComponent = label ? (
    <Typography.Title level={5}>{label}</Typography.Title>
  ) : null;
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      {labelComponent}
      <Select options={options} defaultValue={options[0]} value={value} onChange={onChange} style={{width:'100%'}} />
      <Text type="danger">{error}</Text>
    </div>
  );
};

export default AppSelect;
