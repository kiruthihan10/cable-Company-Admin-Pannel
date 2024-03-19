import AppTextInput from "@/components/unitComponents/textInput";
import EmployeeForm, {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  EmployeeFormInitialValues,
  EmployeeFormValidation,
  IAddEmployeeForm,
  IEmployeeForm,
} from "./employeeForm";
import { Button, Card, Divider, Dropdown, Flex, Space, Typography } from "antd";
import * as Yup from "yup";
import FormButton from "@/components/unitComponents/formComponents/button";
import { useState, useEffect } from "react";
import { useFormikContext, Form } from "formik";
import AppSwitch from "@/components/unitComponents/formComponents/switch";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export interface ICompanyForm extends IEmployeeForm {
  name: string;
  isActive?: boolean;
}

export interface IAddCompanyForm extends ICompanyForm, IAddEmployeeForm {}

export const CompanyFormInitialValues: ICompanyForm = {
  ...EmployeeFormInitialValues,
  name: "",
  isActive: false,
};

export const AddCompanyFormInitialValues: IAddCompanyForm = {
  ...AddEmployeeFormInitialValues,
  ...CompanyFormInitialValues,
};

export const CompanyFormValidation: Yup.ObjectSchema<ICompanyForm> =
  EmployeeFormValidation.shape({
    name: Yup.string().required(),
    isActive: Yup.bool(),
  });

export const AddCompanyFormValidation: Yup.ObjectSchema<IAddCompanyForm> =
  CompanyFormValidation.concat(AddEmployeeFormValidation);

interface ICompanyFormProps {
  add?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

const CompanyForm = (props: ICompanyFormProps) => {
  const { add = true, disabled = false, readonly } = props;
  const [windowWidth, setWidnowWidth] = useState(0);
  const { values } = useFormikContext<ICompanyForm>();
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

  const renderNameField = add ? (
    <AppTextInput
      name="name"
      placeholder="Company Name"
      label="Company Name"
      disabled={disabled}
      readonly={readonly}
    />
  ) : (
    <Flex justify={"space-between"}>
      <div style={{ width: "50%" }}>
        <AppTextInput
          name="name"
          placeholder="Company Name"
          label="Company Name"
          disabled={disabled}
          readonly={readonly}
        />
      </div>
      <Flex style={{ width: "25%" }} justify={"center"} align={"center"}>
        <AppSwitch
          name="isActive"
          checkedChildren="Active"
          uncheckedChildren="Inactive"
          label="Company Status"
          disabled={disabled || readonly}
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
  );
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
            title={add ? "Add Company" : values.name}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              {renderNameField}
              <Divider />
              <Typography.Title level={4}>Contact Person</Typography.Title>
              <EmployeeForm
                addEmployee={add}
                disabled={disabled}
                readonly={readonly}
              />
              {disabled || readonly ? null : (
                <FormButton center text={add ? "Add" : "Update"} isSubmit />
              )}
            </Flex>
          </Card>
        </Form>
      </Flex>
    </>
  );
};

export default CompanyForm;
