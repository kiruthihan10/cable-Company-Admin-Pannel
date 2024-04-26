import AppSelect from "@/components/unitComponents/formComponents/select";
import AppTextInput from "@/components/unitComponents/textInput";
import { urls } from "@/constants";
import { IAreaAgent } from "@/external/interfaces/areaInterface";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";

interface IViewAreaForm {
  areaId: string;
  agent: IAreaAgent;
}

const ViewAreaForm = (props: IViewAreaForm) => {
  const { areaId, agent } = props;
  const router = useRouter();
  const updateArea = () => {
    router.push(`/${urls.area}/${areaId}/update`);
  };
  const manageAreaMenuItems: MenuProps["items"] = [
    {
      key: 1,
      label: "Update Area",
      onClick: updateArea,
    },
  ];
  const manageAreaMenuProps = {
    items: manageAreaMenuItems,
  };
  const options: DefaultOptionType[] = [
    { value: agent.username, label: `${agent.firstName} ${agent.lastName}` },
  ];
  return (
    <Flex justify={"space-between"}>
      <div style={{ width: "33%" }}>
        <AppTextInput
          name="name"
          placeholder="Area Name"
          label="Area Name"
          readonly
          disabled
        />
      </div>
      <div style={{ width: "33%" }}>
        <AppSelect name="agentId" label="Agent" options={options} readonly />
      </div>
      <Flex style={{ width: "33%" }} justify={"center"} align={"end"}>
        <Dropdown menu={manageAreaMenuProps}>
          <Button>
            <Space>
              Manage Area
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default ViewAreaForm;
