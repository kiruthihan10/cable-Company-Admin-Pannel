"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import { urls } from "@/constants";
import { mutationKeys, queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import AddCustomerForm from "@/forms/customer/addCustomerForm";
import {
  AddCustomerFormInitialValues,
  AddCustomerFormValidation,
  IAddCustomerForm,
} from "@/forms/customer/customerForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex, Card } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddCustomer = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  const { addCustomer, getAreas } = useAPIController();
  useEffect(() => {
    setHeader("Add Customer");
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.customer],
    mutationFn: addCustomer,
    onSuccess: () => {
      router.push(`/${urls.customer}`);
    },
  });
  const { data, isLoading } = useQuery({
    queryFn: getAreas,
    queryKey: [queryKeys.areas],
  });
  const windowWidth = useWindow();
  const onSubmit = (values: IAddCustomerForm) => {
    mutate({
      ...values,
      phoneNumber: values.phoneNumber || 0,
      areaID: values.areaID || -1,
    });
  };

  return (
    <Formik
      initialValues={{
        ...AddCustomerFormInitialValues,
        areaID: data?.data.areas[0].id,
      }}
      validationSchema={AddCustomerFormValidation}
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
                <AddCustomerForm areas={data?.data.areas || []} />
                <FormButton center text="Add" isSubmit />
              </Flex>
            </Card>
          </Form>
        </Flex>
      </>
    </Formik>
  );
};

export default AddCustomer;
