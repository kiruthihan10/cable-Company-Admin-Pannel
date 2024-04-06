import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";

const AddUserForm = () => {
  return (
    <>
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

export default AddUserForm