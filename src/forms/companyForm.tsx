import AppTextInput from "@/components/unitComponents/textInput";
import EmployeeForm from "./employeeForm";
import { Divider, Typography } from "antd";

const CompnayForm = () => {
  return (
    <>
      <AppTextInput
        name="name"
        placeholder="Company Name"
        label="Company Name"
      />
      <Divider />
      <Typography.Title level={4}>Contact Person</Typography.Title>
      <EmployeeForm />
    </>
  );
};

export default CompnayForm;
