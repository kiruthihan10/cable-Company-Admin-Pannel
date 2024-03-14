"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import CompnayForm from "@/forms/companyForm";
import { useSystemStore } from "@/stores/systemStore";
import { Card, Flex } from "antd";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";

const AddCompany = () => {
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Add Companies");
  });
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  return (
    <Formik
      initialValues={{}}
      onSubmit={function (
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ): void | Promise<any> {
        throw new Error("Function not implemented.");
      }}
    >
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          height: `${windowHeight * 0.8}px`,
          width: `${windowWidth * 0.8}px`,
        }}
      >
        <Form>
          <Card title={"Add Company"} style={{ width: `${windowWidth * 0.64}px` }}>
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <CompnayForm />
              <FormButton formik center text={"Add"} isSubmit />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </Formik>
  );
};

export default AddCompany;
