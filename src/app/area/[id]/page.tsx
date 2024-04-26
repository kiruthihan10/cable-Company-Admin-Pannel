"use client";

import { queryKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import { useWindow } from "@/external/utils";
import {
  AreaFormValidation,
  AreaFromInitialValues,
  IAreaForm,
} from "@/forms/area/areaForm";
import ViewAreaForm from "@/forms/area/viewAreaForm";
import { useSystemStore } from "@/stores/systemStore";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Spin } from "antd";
import { Form, Formik } from "formik";
import { useEffect } from "react";

export interface IAreaPageProps {
  params: { id: number };
}

const AreaPage = (props: IAreaPageProps) => {
  const { params } = props;
  const { id } = params;
  const setHeader = useSystemStore((state) => state.setHeader);
  const { getArea } = useAPIController();
  const { data, isLoading } = useQuery({
    queryFn: ({ queryKey }) => {
      return getArea(Number(queryKey[1]));
    },
    queryKey: [queryKeys.areas, id],
  });
  useEffect(() => {
    setHeader("Areas");
  });
  const { windowWidth } = useWindow();
  if (isLoading || data?.data == undefined) {
    return <Spin spinning fullscreen />;
  }
  const initialValues: IAreaForm =
    {
      ...data?.data,
      agentId: data?.data.agent.username || "",
      name: data?.data.name || "",
    } || AreaFromInitialValues;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AreaFormValidation}
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
            title={data?.data.name}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <ViewAreaForm
                areaId={id}
                agent={data.data.agent}
              />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default AreaPage