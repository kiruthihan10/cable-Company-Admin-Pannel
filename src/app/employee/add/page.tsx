"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import AppTextInput from "@/components/unitComponents/textInput";
import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import AddEmployeeForm from "@/forms/employee/addEmployeeForm";
import AddFirstTimeEmployeeForm from "@/forms/employee/addFirstEmployeeForm";
import {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  IAddEmployeeForm,
} from "@/forms/employee/employeeForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation } from "@tanstack/react-query";
import { Flex, Card, Divider, Typography } from "antd";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

const AddEmployee = () => {
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Employee");
  });
  const { addEmployee } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: addEmployee,
  });
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  const onSubmit = (values: IAddEmployeeForm) => {
    mutate({ ...values, phoneNumber: values.phoneNumber || 0 });
  };
  return (
    <Formik
      initialValues={AddEmployeeFormInitialValues}
      validationSchema={AddEmployeeFormValidation}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <>
        <Flex
          justify={"center"}
          style={{
            width: `${windowWidth * 0.8}px`,
          }}
        >
          <Form>
            <Card
              title={"Add Company"}
              style={{ width: `${windowWidth * 0.64}px` }}
            >
              <Flex vertical gap="small" style={{ width: "100%" }}>
                <AddEmployeeForm />
                <FormButton center text="Add" isSubmit />
              </Flex>
            </Card>
          </Form>
        </Flex>
      </>
    </Formik>
  );
};

export default AddEmployee;
