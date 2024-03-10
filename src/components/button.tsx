import { Button, Flex } from "antd";
import { useFormikContext } from "formik";

interface IAppButton {
  center?: boolean;
  formik?: boolean;
}

const AppButton = (props: IAppButton) => {
  const { center = false, formik = false } = props;
  const { dirty, isValid } = useFormikContext();
  return (
    <Flex
      justify={center ? "center" : "normal"}
      align={center ? "center" : "normal"}
    >
      <Button type="primary" disabled={formik ? !(isValid && dirty) : false}>
        Login
      </Button>
    </Flex>
  );
};

export default AppButton;
