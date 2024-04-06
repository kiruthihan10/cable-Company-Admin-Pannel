import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import AddUserForm from "../user/addUserForm";

const AddEmployeeForm = () => {
  return (
    <>
      <Flex justify={"space-between"}>
        <div style={{ width: "75%" }}>
          <AppTextInput
            name="password"
            placeholder="Password"
            label="Password"
            isPassword
          />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"isAdmin"} label="Admin" />
        </div>
      </Flex>
      <AddUserForm />
    </>
  );
};

export default AddEmployeeForm;
