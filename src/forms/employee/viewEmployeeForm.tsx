import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";

const ViewEmployeeForm = () => {
  return (
    <>
      <Flex justify={"space-between"}>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="firstName"
            placeholder="FirstName"
            label="FirstName"
            readonly
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="lastName"
            placeholder="LastName"
            label="LastName"
            readonly
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="email"
            placeholder="Email"
            label="Email"
            readonly
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppNumberInput
            name="phoneNumber"
            placeholder="PhoneNumber"
            label="PhoneNumber"
            addonBefore="07"
            readonly
          />
        </div>
      </Flex>
    </>
  );
};

export default ViewEmployeeForm;
