"use client";

import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";
import { blue, gray } from "@ant-design/colors";
import { useSystemStore } from "@/stores/systemStore";

interface IStylingConfig {
  children: ReactNode;
}

const StylingConfig = ({ children }: IStylingConfig) => {
  const isDarkMode = useSystemStore((state) => state.isDarkMode);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : undefined,
        token: {},
        components: {
          Card: isDarkMode? {
            headerFontSize: 40
          }: {

          },
        },
      }}
    >
      <body style={isDarkMode ? { background: "black" } : undefined}>
        {children}
      </body>
    </ConfigProvider>
  );
};

export default StylingConfig;
