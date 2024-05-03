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
import { Flex, Card, notification } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const AddEmployee = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Employee");
  });
  const setNotification = useSystemStore((state) => state.setNotification);
  const { addEmployee } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: addEmployee,
    onSuccess: () => {
      setNotification({
        description: "Employee created successfully",
        message: "Success",
        notificationType: "success",
      });
      router.push(`/${urls.employee}`);
    },
    onError(error, _variables, _context) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setNotification({
            description: "User with Phone Number Already Exists",
            message: "Phone No Exists",
            notificationType: "error",
          });
        }
      }
    },
  });
  const { windowWidth } = useWindow();
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
