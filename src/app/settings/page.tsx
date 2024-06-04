"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import { urls } from "@/constants";
import { mutationKeys, queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import {
  IUpdateEmployeeForm,
  UpdateEmployeeFormInitialValues,
  UpdateEmployeeFormValidation,
} from "@/forms/employee/employeeForm";
import UpdateEmployeeForm from "@/forms/employee/updateEmployeeForm";
import AddUserForm from "@/forms/user/addUserForm";
import { useSystemStore } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex, Card } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Settings = () => {
  const setHeader = useSystemStore((state) => state.setHeader);
  const { windowWidth } = useWindow();
  const { getEmployee, updateEmployee } = useAPIController();
  const user = useUserStore((state) => state.user);
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployee(queryKey[1]);
    },
    queryKey: [queryKeys.employees, user?.username || ""],
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: updateEmployee,
    onSuccess: () => {
      refetch();
    },
  });
  useEffect(() => {
    setHeader("Settings")
  })
  const initialValues: IUpdateEmployeeForm = {
    ...UpdateEmployeeFormInitialValues,
    ...data?.data,
  };
  const onSubmit = (values: IUpdateEmployeeForm) => {
    if (values.phoneNumber != undefined) {
      mutate({
        id: user?.username || "",
        ...values,
        phoneNumber: values.phoneNumber,
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UpdateEmployeeFormValidation}
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
              <AddUserForm />
              <FormButton center text="Update" isSubmit />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default Settings;
