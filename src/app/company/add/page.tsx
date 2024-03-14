"use client";

import FormButton from "@/components/unitComponents/formComponents/button";
import { mutationKeys } from "@/external/keys";
import { useAPIController } from "@/external/service";
import CompnayForm, {
  CompanyFormInitialValues,
  CompanyFormValidation,
  ICompanyForm,
} from "@/forms/companyForm";
import { useSystemStore } from "@/stores/systemStore";
import { useMutation } from "@tanstack/react-query";
import { Card, Flex } from "antd";
import { Form, Formik } from "formik";
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
  const { addCompany } = useAPIController();
  const { mutate } = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: addCompany,
    onSuccess(data, _variables, _context) {},
    onError(_error) {},
  });
  const onsubmit = (values: ICompanyForm) => {
    mutate({
      name: values.name,
      employeeCreateRequest: {
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: parseInt(`7${values.phoneNumber || 0}`),
      },
    });
  };

  return (
    <Formik
      initialValues={CompanyFormInitialValues}
      validationSchema={CompanyFormValidation}
      enableReinitialize
      onSubmit={onsubmit}
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
          <Card
            title={"Add Company"}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
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
