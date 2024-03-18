import AppTextInput from "@/components/unitComponents/textInput";
import EmployeeForm, {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  EmployeeFormInitialValues,
  EmployeeFormValidation,
  IAddEmployeeForm,
  IEmployeeForm,
} from "./employeeForm";
import { Card, Divider, Flex, Typography } from "antd";
import * as Yup from "yup";
import FormButton from "@/components/unitComponents/formComponents/button";
import { useState, useEffect } from "react";
import { useFormikContext, Form } from "formik";
import AppSwitch from "@/components/unitComponents/formComponents/switch";

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
      <div style={{ width: "75%" }}>
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
        />
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
