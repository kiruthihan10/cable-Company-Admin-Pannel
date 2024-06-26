"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface IEmployeePageProps {
  params: { id: string };
}

const EmployeePage = (props: IEmployeePageProps) => {
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const router = useRouter();
  const { getEmployee } = useAPIController();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployee(queryKey[1]);
    },
    queryKey: [queryKeys.employees, id],
  });
  useEffect(() => {
    setHeader("Employees");
  });
  const {windowWidth} = useWindow();
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
      >
        <Form>
          <Card
            title={data?.data.firstName}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <ViewEmployeeForm employeeUserName={id} />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default EmployeePage;
