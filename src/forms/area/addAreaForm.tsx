import AppSelect from "@/components/unitComponents/formComponents/select";
import AppTextInput from "@/components/unitComponents/textInput";
import { Flex } from "antd";
import { ISingleEmployeeResponse } from "@/external/interfaces/employeeInterfaces";
import { DefaultOptionType } from "antd/es/select";

interface IAddAreaForm {
  employees: ISingleEmployeeResponse[];
}

const AddAreaForm = (props: IAddAreaForm) => {
  const { employees } = props;
  const options: DefaultOptionType[] = [];
  employees.forEach((employee) => {
    options.push({
      value: employee.username,
      label: `${employee.firstName} ${employee.lastName}`,
    });
  });
  return (
    <Flex justify={"space-between"}>
      <div style={{ width: "50%" }}>
        <AppTextInput
          name="name"
          placeholder="Area Name"
          label="Area Name"
        />
      </div>
      <div style={{ width: "50%" }}>
        <AppSelect name="agentId" label="Agent" options={options} />
      </div>
    </Flex>
  );
};

export default AddAreaForm;
