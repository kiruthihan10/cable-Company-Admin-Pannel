"use client";

import { Typography } from "antd";
import { useField } from "formik";
const { Text } = Typography;

interface IDangerText {
  name: string;
}

const ErrorText = (props: IDangerText) => {
  const { name } = props;
  const [{}, { error, touched }, {}] = useField(name);
  if (touched) return <ErrorText name={name} />;
};

export default ErrorText;
