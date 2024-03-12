"use client";

import { useSystemStore } from "@/stores/systemStore";
import { useEffect } from "react";

const Home = () => {
  const setHeader = useSystemStore((state) => state.setHeader);
  useEffect(() => {
    setHeader("Home");
  });
  return <></>;
};

export default Home;
