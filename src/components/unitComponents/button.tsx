"use client";

import { Button, Flex } from "antd";

export interface IAppButton {
  text: string;
  center?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const AppButton = (props: IAppButton) => {
  const {
    text,
    isSubmit = false,
    center = false,
    disabled = false,
    onClick,
  } = props;
  return (
    <Flex
      justify={center ? "center" : "normal"}
      align={center ? "center" : "normal"}
    >
      <Button
        type="primary"
        disabled={disabled}
        onClick={onClick}
        htmlType={isSubmit ? "submit" : "button"}
      >
        {text}
      </Button>
    </Flex>
  );
};

export default AppButton;
