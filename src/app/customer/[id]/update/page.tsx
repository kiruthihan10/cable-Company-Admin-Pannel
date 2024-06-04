"use client";

import { useRouter } from "next/navigation";
import { ICustomerPageProps } from "../page";
import { useWindow } from "@/external/utils";
import { useAPIController } from "@/external/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/external/keys";
import { urls } from "@/constants";
import {
  IUpdateCustomerForm,
  UpdateCustomerFormInitialValues,
  UpdateCustomerFormValidation,
} from "@/forms/customer/customerForm";
import FormButton from "@/components/unitComponents/formComponents/button";
import { Flex, Card } from "antd";
import { Formik, Form } from "formik";
import UpdateCustomerForm from "@/forms/customer/updateCustomerForm";
import { useSystemStore } from "@/stores/systemStore";
import axios from "axios";

const UpdateCustomer = (props: ICustomerPageProps) => {
  const { params } = props;
  const { id } = params;
  const router = useRouter();
  const { windowWidth } = useWindow();
  const setNotification = useSystemStore((state) => state.setNotification);
  const { getCustomer, updateCustomer, getAreas } = useAPIController();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCustomer(queryKey[1]);
    },
    queryKey: [queryKeys.customers, id],
  });
  const { data: areas, isLoading: isAreasLoading } = useQuery({
    queryFn: () => {
      return getAreas();
    },
    queryKey: [queryKeys.areas],
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: updateCustomer,
    onSuccess: () => {
      setNotification({
        description: "Customer Updated successfully",
        message: "Success",
        notificationType: "success",
      });
      router.push(`/${urls.customer}/${id}`);
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
  const initialValues: IUpdateCustomerForm = {
    ...UpdateCustomerFormInitialValues,
    ...data?.data,
  };
  const onSubmit = (values: IUpdateCustomerForm) => {
    if (values.phoneNumber != undefined && values.areaID != undefined) {
      mutate({
        id,
        ...values,
        phoneNumber: values.phoneNumber,
        areaID: values.areaID,
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UpdateCustomerFormValidation}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Flex
        justify={"center"}
      >
        <Form>
          <Card
            title={`Update ${data?.data.firstName} ${data?.data.lastName}`}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <UpdateCustomerForm areas={areas?.data.areas || []} />
              <FormButton center text="Update" isSubmit />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default UpdateCustomer;
