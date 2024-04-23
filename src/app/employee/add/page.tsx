"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import { urls } from "@/constants";
import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import AddEmployeeForm from "@/forms/employee/addEmployeeForm";
import {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  IAddEmployeeForm,
} from "@/forms/employee/employeeForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation } from "@tanstack/react-query";
import { Flex, Card } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddEmployee = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Employee");
  });
  const { addEmployee } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: addEmployee,
    onSuccess: () => {
      router.push(`/${urls.employee}`);
    },
  });
  const {windowWidth} = useWindow();
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
              title={"Add Employee"}
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
