"use client";

import { useSystemStore } from "@/stores/systemStore";
import { IAreaPageProps } from "../page";
import { useAPIController } from "@/external/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "@/external/keys";
import { useWindow } from "@/external/utils";
import { useRouter } from "next/navigation";
import { urls } from "@/constants";
import {
  AreaFormValidation,
  AreaFromInitialValues,
  IAreaForm,
} from "@/forms/area/areaForm";
import { Form, Formik } from "formik";
import FormButton from "@/components/unitComponents/formComponents/button";
import AddAreaForm from "@/forms/area/addAreaForm";
import { Flex, Card } from "antd";
import { useEffect } from "react";

const UpdateArea = (props: IAreaPageProps) => {
  const router = useRouter();
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getArea, getEmployees, updateArea } = useAPIController();
  useEffect(() => {
    setHeader("Areas");
  });
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getArea(Number(queryKey[1]));
    },
    queryKey: [queryKeys.areas, id],
  });
  const { data: employeesData, isLoading: isEmployeesLoading } = useQuery({
    queryFn: () => {
      return getEmployees();
    },
    queryKey: [queryKeys.employees],
  });
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.area, id],
    mutationFn: updateArea,
    onSuccess: () => {
      router.push(`/${urls.area}/${id}`);
    },
  });
  const { windowWidth } = useWindow();
  const onSubmit = (values: IAreaForm) => {
    mutate({
      ...values,
      id: id,
    });
  };
  const initialValues =
    data?.data === undefined
      ? {
          ...AreaFromInitialValues,
          agentId: employeesData?.data.employees[0].username || "",
        }
      : { ...data.data, agentId: data.data.agent.username };
  return (
    <Formik
      initialValues={initialValues}
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
                <AddAreaForm employees={employeesData?.data.employees || []} />
                <FormButton center text="Add" isSubmit />
              </Flex>
            </Card>
          </Form>
        </Flex>
      </>
    </Formik>
  );
};

export default UpdateArea;
