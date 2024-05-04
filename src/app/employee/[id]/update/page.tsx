"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import {
  IUpdateEmployeeForm,
  UpdateEmployeeFormInitialValues,
  UpdateEmployeeFormValidation,
} from "@/forms/employee/employeeForm";
import { Flex, Card } from "antd";
import { Formik, Form } from "formik";
import { IEmployeePageProps } from "../page";
import { mutationKeys, queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import UpdateEmployeeForm from "@/forms/employee/updateEmployeeForm";
import { useRouter } from "next/navigation";
import { urls } from "@/constants";
import { useWindow } from "@/external/utils";
import { useSystemStore } from "@/stores/systemStore";
import axios from "axios";

const UpdateEmployee = (props: IEmployeePageProps) => {
  const { params } = props;
  const { id } = params;
  const router = useRouter();
  const {windowWidth} = useWindow();
  const { getEmployee, updateEmployee } = useAPIController();
  const setNotification = useSystemStore((state) => state.setNotification);
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: ({ queryKey }) => {
      return getEmployee(queryKey[1]);
    },
    queryKey: [queryKeys.employees, id],
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.employee],
    mutationFn: updateEmployee,
    onSuccess: () => {
      setNotification({
        description: "Employee Updated successfully",
        message: "Success",
        notificationType: "success",
      });
      router.push(`/${urls.employee}/${id}`);
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
  const initialValues: IUpdateEmployeeForm = {
    ...UpdateEmployeeFormInitialValues,
    ...data?.data,
  };
  const onSubmit = (values: IUpdateEmployeeForm) => {
    if (values.phoneNumber != undefined) {
      mutate({ id, ...values, phoneNumber: values.phoneNumber });
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
    </Formik>
  );
};

export default UpdateEmployee;
