"use client";

import { Form } from "formik";
import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import AppButton from "@/components/unitComponents/button";
import AppTextInput from "@/components/unitComponents/textInput";

const LoginForm = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <Form>
      <Flex
        justify={"center"}
        align={"center"}
        style={{ height: `${windowHeight*0.8}px` }}
      >
        <Card title="Login" style={{ width: 300 }}>
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
            <AppButton formik center text={"Login"} isSubmit />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
