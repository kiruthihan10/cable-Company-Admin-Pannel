"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import { urls } from "@/constants";
import { mutationKeys, queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import AddAreaForm from "@/forms/area/addAreaForm";
import {
  AreaFormValidation,
  AreaFromInitialValues,
  IAreaForm,
} from "@/forms/area/areaForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Flex } from "antd";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddArea = () => {
  const router = useRouter();
  const { addArea, getEmployees } = useAPIController();
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Area");
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.area],
    mutationFn: addArea,
    onSuccess: () => {
      router.push(`/${urls.area}`);
    },
  });
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return getEmployees();
    },
    queryKey: [queryKeys.employees],
  });
  const { windowWidth } = useWindow();
  const onSubmit = (values: IAreaForm) => {
    mutate({
      ...values,
    });
  };
  return (
    <Formik
      initialValues={{
        ...AreaFromInitialValues,
        agentId: data?.data.employees[0].username || "",
      }}
      validationSchema={AreaFormValidation}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <>
        <Flex
          justify={"center"}
        >
          <Form>
            <Card
              title={"Add Area"}
              style={{ width: `${windowWidth * 0.64}px` }}
            >
              <Flex vertical gap="small" style={{ width: "100%" }}>
                <AddAreaForm employees={data?.data.employees || []} />
                <FormButton center text="Add" isSubmit />
              </Flex>
            </Card>
          </Form>
        </Flex>
      </>
    </Formik>
  );
};

export default AddArea;
