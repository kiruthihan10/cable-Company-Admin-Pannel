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

export interface ICompanyForm extends IEmployeeForm {
  name: string;
}

export interface IAddCompanyForm extends ICompanyForm, IAddEmployeeForm {}

export const CompanyFormInitialValues: ICompanyForm = {
  ...EmployeeFormInitialValues,
  name: "",
};

export const AddCompanyFormInitialValues: IAddCompanyForm = {
  ...AddEmployeeFormInitialValues,
  ...CompanyFormInitialValues,
};

export const CompanyFormValidation: Yup.ObjectSchema<ICompanyForm> =
  EmployeeFormValidation.shape({
    name: Yup.string().required(),
  });

export const AddCompanyFormValidation: Yup.ObjectSchema<IAddCompanyForm> =
  CompanyFormValidation.concat(AddEmployeeFormValidation);

interface ICompanyFormProps {
  add?: boolean;
}

const CompanyForm = (props: ICompanyFormProps) => {
  const { add = true } = props;
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWidnowWidth] = useState(0);
  const { values } = useFormikContext<ICompanyForm>();
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          height: `${windowHeight * 0.8}px`,
          width: `${windowWidth * 0.8}px`,
        }}
      >
        <Form>
          <Card
            title={add ? "Add Company" : values.name}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <AppTextInput
                name="name"
                placeholder="Company Name"
                label="Company Name"
              />
              <Divider />
              <Typography.Title level={4}>Contact Person</Typography.Title>
              <EmployeeForm addEmployee={add} />
              <FormButton center text={add ? "Add" : "Update"} isSubmit />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </>
  );
};

export default CompanyForm;
