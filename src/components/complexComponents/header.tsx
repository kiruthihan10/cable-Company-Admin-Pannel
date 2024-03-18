"use client";

import { useSystemStore } from "@/stores/systemStore";
import { Divider, Flex, Typography } from "antd";

const Header = () => {
  const header = useSystemStore((state) => state.header);
  return (
    <Flex
      justify={"space-between"}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        borderBottom: "1px solid black",
        height: 120,
      }}
    >
      <Flex align="center" style={{ width: "100%" }}>
        <Typography.Title level={1} style={{ width: 256 }}>
          Cable <br />
          Companies
        </Typography.Title>
        <Divider
          type="vertical"
          style={{ backgroundColor: "black", height: "100%", margin: 0 }}
        />
        <Typography.Title level={2} style={{ paddingLeft: "5%" }}>
          {header}
        </Typography.Title>
      </Flex>
    </Flex>
  );
};

export default Header;
