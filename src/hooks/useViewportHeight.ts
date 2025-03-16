import {useEffect} from "react";

export const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);
}
