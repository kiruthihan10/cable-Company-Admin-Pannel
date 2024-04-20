import AppDatePicker from "@/components/unitComponents/formComponents/datePicket";
import AppSelect from "@/components/unitComponents/formComponents/select";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import dayjs from "dayjs";
import AddUserForm from "../user/addUserForm";
import { IAddCustomerForm } from "./addCustomerForm";
import { DefaultOptionType } from "antd/es/select";
import { useFormikContext } from "formik";

const UpdateCustomerForm = (props: IAddCustomerForm) => {
  const { areas } = props;
  const options: DefaultOptionType[] = [];
  areas.forEach((area) => {
    options.push({
      value: area.id,
      label: area.name,
    });
  });
  const { values } = useFormikContext();
  console.log(values)
  return (
    <>
      <Flex justify={"space-between"}>
        <div style={{ width: "100%" }}>
          <AppSelect name="areaID" label="Area" options={options} />
        </div>
      </Flex>
      <AddUserForm />
      <Flex>
        <div style={{ width: "100%" }}>
          <AppTextInput
            name="address"
            placeholder="Address"
            label="Address"
            isTextArea
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="identityNo"
            placeholder="Identity Number"
            label="Identity Number"
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="boxCaNumber"
            placeholder="Box CA Number"
            label="Box CA Number"
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="customerNo"
            placeholder="Customer Number"
            label="Customer Number"
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppDatePicker
            name="connectionStartDate"
            label="Connection Start Date"
            max={dayjs().toString()}
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"activeConnection"} label="Active" />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"hasDigitalBox"} label="Digital" />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"offerPowerIntake"} label="Power Intake" />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"isDisconnected"} label="Disconnected" />
        </div>
      </Flex>
    </>
  );
};

export default UpdateCustomerForm;
