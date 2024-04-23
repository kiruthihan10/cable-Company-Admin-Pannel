import { useState, useEffect } from "react";

export const useWindow = () => {
  const [windowWidth, setWidnowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  return { windowWidth, windowHeight };
};
