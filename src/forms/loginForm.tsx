"use client";

import { Form, useFormikContext } from "formik";
import { Card, Flex, Input, Typography } from "antd";

const { Text } = Typography;
import { useEffect, useState } from "react";
import { ILogin } from "@/app/page";
import AppButton from "@/components/button";
import AppTextInput from "@/components/textInput";

const LoginForm = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  const { values, handleChange } = useFormikContext<ILogin>();
  return (
    <Form>
      <Flex
        justify={"center"}
        align={"center"}
        style={{ height: `${windowHeight}px` }}
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
            <AppButton formik center/>
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
