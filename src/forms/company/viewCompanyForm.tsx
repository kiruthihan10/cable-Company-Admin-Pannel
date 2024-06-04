"use client";

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
import AppTextInput from "@/components/unitComponents/textInput";
import { ICompanyForm } from "./companyForm";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ViewEmployeeForm from "../employee/viewEmployeeForm";
import { useMutation } from "@tanstack/react-query";
import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { urls } from "@/constants";
import { useWindow } from "@/external/utils";

interface IViewCompanyForm {
  companyID: number;
  contactPersonID: string;
}

const ViewCompanyForm = (props: IViewCompanyForm) => {
  const { companyID, contactPersonID } = props;
  const { values } = useFormikContext<ICompanyForm>();
  const {windowWidth} = useWindow();
  const { setCompanyActiveStatus } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [
      mutationKeys.companies,
      mutationKeys.activeStatus,
      values.isActive,
    ],
    mutationFn: setCompanyActiveStatus,
    onSuccess(data, _variables, _context) {},
    onError(_error) {
      // setShowModal(true);
    },
  });
  const router = useRouter();

  const moveToEditCompantPage = () => {
    router.push(`/${urls.company}/${companyID}/${urls.edit}`);
  };
  const changeContactEmployee = () => {};
  const switchCompanyStatus = () => {
    mutate({ companyID: companyID, isActive: !values.isActive || false });
  };
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
              <ViewEmployeeForm employeeUserName={contactPersonID} />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </>
  );
};

export default ViewCompanyForm;
