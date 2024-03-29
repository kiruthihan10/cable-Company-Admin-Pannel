import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";

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
      <Flex justify={"space-between"}>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="firstName"
            placeholder="FirstName"
            label="FirstName"
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="lastName"
            placeholder="LastName"
            label="LastName"
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput name="email" placeholder="Email" label="Email" />
        </div>
        <div style={{ width: "50%" }}>
          <AppNumberInput
            name="phoneNumber"
            placeholder="PhoneNumber"
            label="PhoneNumber"
            addonBefore="07"
          />
        </div>
      </Flex>
    </>
  );
};

export default AddEmployeeForm;
