import {
  Button,
  Card,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { Form, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import AppTextInput from "@/components/unitComponents/textInput";
import { ICompanyForm } from "./companyForm";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ViewEmployeeForm from "../employee/viewEmployeeForm";

const ViewCompanyForm = () => {
  const { values } = useFormikContext<ICompanyForm>();
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);

  const router = useRouter();

  const moveToEditCompantPage = () => {
    router.push("edit");
  };
  const changeContactEmployee = () => {};
  const switchCompanyStatus = () => {};
  const manageCompanyMenuItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Edit Company Info",
      onClick: moveToEditCompantPage,
    },
    {
      key: 2,
      label: "Change Contact Employee",
      onClick: changeContactEmployee,
    },
    {
      key: 3,
      label: values.isActive ? "Deactive company" : "Activate Company",
      danger: values.isActive ? true : false,
      onClick: switchCompanyStatus,
    },
  ];
  const manageCompanyMenuProps = {
    items: manageCompanyMenuItems,
  };
  return (
    <>
      <Flex
        justify={"center"}
        style={{
          width: `${windowWidth * 0.8}px`,
        }}
      >
        <Form>
          <Card
            title={values.name}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <Flex justify={"space-between"}>
                <div style={{ width: "50%" }}>
                  <AppTextInput
                    name="name"
                    placeholder="Company Name"
                    label="Company Name"
                    readonly
                  />
                </div>
                <Flex
                  style={{ width: "25%" }}
                  justify={"center"}
                  align={"center"}
                >
                  <AppSwitch
                    name="isActive"
                    checkedChildren="Active"
                    uncheckedChildren="Inactive"
                    label="Company Status"
                    disabled
                  />
                </Flex>
                <Flex style={{ width: "25%" }} justify={"center"} align={"end"}>
                  <Dropdown menu={manageCompanyMenuProps}>
                    <Button>
                      <Space>
                        Manage Company
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </Flex>
              </Flex>
              <Divider />
              <Typography.Title level={4}>Contact Person</Typography.Title>
              <ViewEmployeeForm />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </>
  );
};

export default ViewCompanyForm;
