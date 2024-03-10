"use client";

import styles from "./page.module.css";
import { Button, Card, Flex, Input, Typography } from "antd";

export default function Home() {
  return (
    <main className={styles.main}>
      <Flex
        justify={"center"}
        align={"center"}
        style={{ height: `${window.innerHeight}px` }}
      >
        <Card title="Login" style={{ width: 300 }} >
          <Flex vertical gap="small" style={{ width: "100%" }}>
            <Typography.Title level={5}>Username</Typography.Title>
            <Input placeholder="Username" />
            <Typography.Title level={5}>Password</Typography.Title>
            <Input.Password placeholder="Password" />
            <Flex justify={"center"} align={"center"}>
              <Button type="primary">Login</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </main>
  );
}
