import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { urls } from "@/constants";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AppDatePicker from "@/components/unitComponents/formComponents/datePicket";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import dayjs from "dayjs";
import AppSelect from "@/components/unitComponents/formComponents/select";
import { DefaultOptionType } from "antd/es/select";
import { ISingleAreaResponse } from "@/external/interfaces/areaInterface";

interface IViewCustomerForm {
  customerUserName: string;
  areas: ISingleAreaResponse[];
}

const ViewCustomerForm = (props: IViewCustomerForm) => {
  const { customerUserName, areas } = props;
  const router = useRouter();
  const updateCustomer = () => {
    router.push(`/${urls.customer}/${customerUserName}/update`);
  };
  const manageCustomerMenuItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Update Customer",
      onClick: updateCustomer,
    },
  ];
  const manageCustomerMenuProps = {
    items: manageCustomerMenuItems,
  };
  const options: DefaultOptionType[] = [];
  areas.forEach((area) => {
    options.push({
      value: area.id,
      label: area.name,
    });
  });
  return (
    <>
      <Flex justify={"space-between"}>
        <div style={{ width: "33%" }}>
          <AppTextInput
            name="firstName"
            placeholder="FirstName"
            label="FirstName"
            readonly
          />
        </div>
        <div style={{ width: "33%" }}>
          <AppTextInput
            name="lastName"
            placeholder="LastName"
            label="LastName"
            readonly
          />
        </div>
        <Flex style={{ width: "33%" }} justify={"center"} align={"end"}>
          <Dropdown menu={manageCustomerMenuProps}>
            <Button>
              <Space>
                Manage Customer
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Flex>
      </Flex>
      <Flex>
        <div style={{ width: "33%" }}>
          <AppTextInput
            name="email"
            placeholder="Email"
            label="Email"
            readonly
          />
        </div>
        <div style={{ width: "33%" }}>
          <AppNumberInput
            name="phoneNumber"
            placeholder="PhoneNumber"
            label="PhoneNumber"
            addonBefore="07"
            readonly
          />
        </div>
        <div style={{ width: "33%" }}>
          <AppSelect name="areaID" label="Area" options={options} readonly />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "100%" }}>
          <AppTextInput
            name="address"
            placeholder="Address"
            label="Address"
            isTextArea
            readonly
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="identityNo"
            placeholder="Identity Number"
            label="Identity Number"
            readonly
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="boxCaNumber"
            placeholder="Box CA Number"
            label="Box CA Number"
            readonly
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "50%" }}>
          <AppTextInput
            name="customerNo"
            placeholder="Customer Number"
            label="Customer Number"
            readonly
          />
        </div>
        <div style={{ width: "50%" }}>
          <AppDatePicker
            name="connectionStartDate"
            label="Connection Start Date"
            max={dayjs().toString()}
            readonly
          />
        </div>
      </Flex>
      <Flex>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"activeConnection"} label="Active" disabled />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"hasDigitalBox"} label="Digital" disabled />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"offerPowerIntake"} label="Power Intake" disabled />
        </div>
        <div style={{ width: "25%" }}>
          <AppSwitch name={"isDisconnected"} label="Disconnected" disabled />
        </div>
      </Flex>
    </>
  );
};

export default ViewCustomerForm;
