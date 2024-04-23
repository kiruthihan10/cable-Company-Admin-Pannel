"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import {
  CustomerFormInitialValues,
  ICustomerFormBase,
} from "@/forms/customer/customerForm";
import ViewCustomerForm from "@/forms/customer/viewCustomerForm";
import { EmployeeFormValidation } from "@/forms/employee/employeeForm";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Spin } from "antd";
import { Form, Formik } from "formik";
import { useEffect } from "react";

export interface ICustomerPageProps {
  params: { id: string };
}

const CustomerPage = (props: ICustomerPageProps) => {
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getCustomer, getAreas } = useAPIController();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCustomer(queryKey[1]);
    },
    queryKey: [queryKeys.employees, id],
  });
  const {
    data: areas,
    isLoading: isAreasLoading,
    error: areasError,
  } = useQuery({
    queryFn: getAreas,
    queryKey: [queryKeys.areas],
  });
  useEffect(() => {
    setHeader("Customers");
  });
  const windowWidth = useWindow();
  if (isLoading || isAreasLoading) {
    return <Spin spinning fullscreen />;
  }
  const initialValues: ICustomerFormBase = data?.data
    ? CustomerFormInitialValues
    : CustomerFormInitialValues;
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
              <ViewCustomerForm
                customerUserName={id}
                areas={areas?.data.areas || []}
              />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default CustomerPage;
