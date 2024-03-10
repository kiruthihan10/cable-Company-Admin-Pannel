"use client";

import { Button, Flex } from "antd";
import { useFormikContext } from "formik";

interface IAppButton {
  text: string;
  center?: boolean;
  formik?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

const AppButton = (props: IAppButton) => {
  const {
    text,
    isSubmit = false,
    center = false,
    formik = false,
    onClick,
  } = props;
  const { dirty, isValid } = useFormikContext();
  return (
    <Flex
      justify={center ? "center" : "normal"}
      align={center ? "center" : "normal"}
    >
      <Button
        type="primary"
        disabled={formik ? !(isValid && dirty) : false}
        onClick={onClick}
        htmlType={isSubmit ? "submit" : "button"}
      >
        {text}
      </Button>
    </Flex>
  );
};

export default AppButton;
