import { Button, Flex } from "antd";
import { useFormikContext } from "formik";

interface IAppButton {
  text: string;
  center?: boolean;
  formik?: boolean;
}

const AppButton = (props: IAppButton) => {
  const { text, center = false, formik = false } = props;
  const { dirty, isValid } = useFormikContext();
  return (
    <Flex
      justify={center ? "center" : "normal"}
      align={center ? "center" : "normal"}
    >
      <Button type="primary" disabled={formik ? !(isValid && dirty) : false}>
        {text}
      </Button>
    </Flex>
  );
};

export default AppButton;
