import AppSwitch from "@/components/unitComponents/formComponents/switch";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import AddUserForm from "../user/addUserForm";

const UpdateEmployeeForm = () => {
  return (
    <>
      <Flex justify={"space-between"}>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"isAdmin"} label="Admin" />
        </div>
      </Flex>
      <AddUserForm />
    </>
  );
};

export default UpdateEmployeeForm;
