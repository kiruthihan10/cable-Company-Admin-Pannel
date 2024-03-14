"use client";

import { Form } from "formik";
import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import AppTextInput from "@/components/unitComponents/textInput";
import FormButton from "@/components/unitComponents/formComponents/button";

const LoginForm = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  return (
    <Form>
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          height: `${windowHeight * 0.8}px`,
          width: `${windowWidth - 250}px`,
        }}
      >
        <Card title={'Login'} style={{ width: 300 }}>
          <Flex vertical gap="small" style={{ width: "100%" }}>
            <AppTextInput
              name={"username"}
              placeholder="Username"
              label="Username"
            />
            <AppTextInput
              name="password"
              placeholder="Password"
              label="Password"
            />
            <FormButton formik center text={"Login"} isSubmit />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
