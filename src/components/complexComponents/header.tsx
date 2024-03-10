"use client";

import { useSystemStore, header } from "@/stores/systemStore";
import { useUserStore } from "@/stores/userStore";
import { Divider, Flex, Typography } from "antd";

const Header = () => {
  const header = useSystemStore((state) => state.header);
  const user = useUserStore((state) => state.user);
  const LoginHeaders: header[] = ["Login"];
  const AdminHeaders: header[] = ["Customers"];
  const EmployeeHeaders: header[] = ["Customers"];
  const SuperAdminHeaders: header[] = ["Customers"];
  const renderHeaderTiles = () => {
    const tiles = [];
    let selectedHeader = null;
    if (header == "Login") {
      selectedHeader = LoginHeaders;
    } else if (user?.userType === "Admin") {
      selectedHeader = AdminHeaders;
    } else if (user?.userType === "Employee") {
      selectedHeader = EmployeeHeaders;
    } else {
      selectedHeader = SuperAdminHeaders;
    }
    for (const headerData of selectedHeader) {
      tiles.push(
        <Typography.Title level={4} underline={headerData === header}>
          {headerData}
        </Typography.Title>
      );
    }
    return tiles;
  };
  return (
    <Flex justify={"space-between"}>
      <Flex align="center">
        <Typography.Title level={3} style={{ paddingRight: "10px" }}>
          Cable <br />
          Companies
        </Typography.Title>
        <Divider
          type="vertical"
          style={{ backgroundColor: "black", height: "80%" }}
        />
        {renderHeaderTiles()}
      </Flex>
    </Flex>
  );
};

export default Header;
