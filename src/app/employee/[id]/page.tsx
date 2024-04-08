"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import {
  EmployeeFormInitialValues,
  EmployeeFormValidation,
  IEmployeeForm,
} from "@/forms/employee/employeeForm";
import ViewEmployeeForm from "@/forms/employee/viewEmployeeForm";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Form, Spin } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";

interface IEmployeePageProps {
  params: { id: string };
}

const EmployeePage = (props: IEmployeePageProps) => {
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getEmployee } = useAPIController();
  const { data, isLoading, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployee(queryKey[1]);
    },
    queryKey: [queryKeys.employees, id],
  });
  useEffect(() => {
    setHeader("Employees");
  });
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  if (isLoading) {
    return <Spin spinning fullscreen />;
  }
  const initialValues: IEmployeeForm = data?.data
    ? {
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        phoneNumber: data.data.phoneNumber,
      }
    : EmployeeFormInitialValues;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployeeFormValidation}
      enableReinitialize
      onSubmit={() => {}}
    >
      <Flex
        justify={"center"}
        style={{
          width: `${windowWidth * 0.8}px`,
        }}
      >
        <Form>
          <Card
            title={data?.data.firstName}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <ViewEmployeeForm />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default EmployeePage;
