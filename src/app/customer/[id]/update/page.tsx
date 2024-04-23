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

const UpdateCustomer = (props: ICustomerPageProps) => {
  const { params } = props;
  const { id } = params;
  const router = useRouter();
  const {windowWidth} = useWindow();
  const { getCustomer, updateCustomer, getAreas } = useAPIController();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getCustomer(queryKey[1]);
    },
    queryKey: [queryKeys.customers, id],
  });
  const { data: areas, isLoading: isAreasLoading } = useQuery({
    queryFn: getAreas,
    queryKey: [queryKeys.areas],
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: updateCustomer,
    onSuccess: () => {
      router.push(`/${urls.customer}/${id}`);
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
