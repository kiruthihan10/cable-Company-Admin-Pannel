"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import AddEmployeeForm from "@/forms/employee/addEmployeeForm";
import {
  AddEmployeeFormInitialValues,
  AddEmployeeFormValidation,
  IAddEmployeeForm,
  IUpdateEmployeeForm,
  UpdateEmployeeFormInitialValues,
  UpdateEmployeeFormValidation,
} from "@/forms/employee/employeeForm";
import { Flex, Form, Card } from "antd";
import { Formik } from "formik";
import { IEmployeePageProps } from "../page";
import { useState, useEffect } from "react";
import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useQuery } from "@tanstack/react-query";
import UpdateEmployeeForm from "@/forms/employee/updateEmployeeForm";

const UpdateEmployee = (props: IEmployeePageProps) => {
  const { params } = props;
  const { id } = params;
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  const { getEmployee } = useAPIController();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployee(queryKey[1]);
    },
    queryKey: [queryKeys.employees, id],
  });
  const initialValues: IUpdateEmployeeForm = {
    ...UpdateEmployeeFormInitialValues,
    ...data?.data,
  };
  const onSubmit = (values: IUpdateEmployeeForm) => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UpdateEmployeeFormValidation}
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
              title={`Update ${data?.data.firstName} ${data?.data.lastName}`}
              style={{ width: `${windowWidth * 0.64}px` }}
            >
              <Flex vertical gap="small" style={{ width: "100%" }}>
                <UpdateEmployeeForm />
                <FormButton center text="Update" isSubmit />
              </Flex>
            </Card>
          </Form>
        </Flex>
      </>
    </Formik>
  );
};

export default UpdateEmployee;
