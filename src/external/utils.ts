import { useState, useEffect } from "react";

export const useWindow = () => {
  const [windowWidth, setWidnowWidth] = useState(0);
  useEffect(() => {
    setWidnowWidth(window.innerWidth);
  }, []);
  return windowWidth;
};
