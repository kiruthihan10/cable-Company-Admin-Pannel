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
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddCustomer = () => {
  const router = useRouter();
  const setHeader = useSystemStore((state) => state.setHeader);
  const { addCustomer, getAreas } = useAPIController();
  useEffect(() => {
    setHeader("Customers");
  });
  const setNotification = useSystemStore((state) => state.setNotification);
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.customer],
    mutationFn: addCustomer,
    onSuccess: () => {
      setNotification({
        description: "Customer created successfully",
        message: "Success",
        notificationType: "success",
      });
      router.push(`/${urls.customer}`);
    },
    onError(error, _variables, _context) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setNotification({
            description: "User with Phone Number Already Exists",
            message: "Phone Number Exists",
            notificationType: "error",
          });
        }
      }
    },
  });
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return getAreas();
    },
    queryKey: [queryKeys.areas],
  });
  const { windowWidth } = useWindow();
  const onSubmit = (values: IAddCustomerForm) => {
    mutate({
      ...values,
      phoneNumber: values.phoneNumber || 0,
      areaID: values.areaID || -1,
    });
  };

  if (data?.data.areas.length == 0) {
    router.push(`/${urls.area}/${urls.add}`);
    setNotification({
      description: "No Areas Available",
      message: "Create a New Area before creating an Employee",
      notificationType: "error",
    });
    return <></>;
  }

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
              title={"Add New Customer"}
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
