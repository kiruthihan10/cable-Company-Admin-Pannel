import { Card, Divider, Flex, Typography } from "antd";
import { Form } from "formik";
import FormButton from "@/components/unitComponents/formComponents/button";
import { useEffect, useState } from "react";
import AppTextInput from "@/components/unitComponents/textInput";
import AddFirstTimeEmployeeForm from "../employee/addFirstEmployeeForm";
import { useWindow } from "@/external/utils";

const AddCompanyForm = () => {
  const {windowWidth} = useWindow();
  return (
    <>
      <Flex
        justify={"center"}
        style={{
          width: `${windowWidth * 0.8}px`,
        }}
      >
        <Form>
          <Card
            title={"Add Company"}
            style={{ width: `${windowWidth * 0.64}px` }}
          >
            <Flex vertical gap="small" style={{ width: "100%" }}>
              <AppTextInput
                name="name"
                placeholder="Company Name"
                label="Company Name"
              />
              <Divider />
              <Typography.Title level={4}>Contact Person</Typography.Title>
              <AddFirstTimeEmployeeForm />
              <FormButton center text="Add" isSubmit />
            </Flex>
          </Card>
        </Form>
      </Flex>
    </>
  );
};

export default AddCompanyForm;
