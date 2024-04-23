"use client";

import { Form } from "formik";
import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import AppTextInput from "@/components/unitComponents/textInput";
import FormButton from "@/components/unitComponents/formComponents/button";
import { useWindow } from "@/external/utils";

const LoginForm = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const windowWidth = useWindow();
  useEffect(() => {
    setWindowHeight(window.innerHeight);
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
        <Card title={"Login"} style={{ width: 300 }}>
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
              isPassword
            />
            <FormButton center text={"Login"} isSubmit />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
