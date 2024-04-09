import AppNumberInput from "@/components/unitComponents/formComponents/numberInput";
import AppTextInput from "@/components/unitComponents/textInput";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface IViewEmployeeForm {
  employeeUserName: string;
}

const ViewEmployeeForm = (props: IViewEmployeeForm) => {
  const { employeeUserName } = props;
  const router = useRouter();
  const updateEmployee = () => {
    router.push(`/employee/${employeeUserName}}`);
  };
  const manageEmployeeMenuItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Update Employee",
      onClick: updateEmployee,
    },
  ];
  const manageEmployeeMenuProps = {
    items: manageEmployeeMenuItems,
  };
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
          <Dropdown menu={manageEmployeeMenuProps}>
            <Button>
              <Space>
                Manage Company
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Flex>
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
