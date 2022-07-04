import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const EstateCloudTheme = () => {
  const [darkMode, setDarkMode] = useState(undefined);
  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);
  useEffect(() => {
    const docRootElement = window.document.documentElement;
    if (darkMode) {
      docRootElement.classList.add("dark");
      localStorage.setItem("cloudTheme", "true");
    } else {
      docRootElement.classList.remove("dark");
      localStorage.setItem("cloudTheme", "false");
    }
  }, [darkMode]);
  const onClick = () => {
    setDarkMode(!darkMode);
  };

  return <><Link to="" onClick={onClick()}>togle button to umplemebt</Link></>;
};
export default EstateCloudTheme;
