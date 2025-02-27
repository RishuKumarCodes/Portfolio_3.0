import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

const SiteBorder = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentClasses =
    windowWidth <= 650
      ? "bg-white"
      : "flex-1 m-(--siteborder) ml-0 rounded-(--mrad) overflow-y-scroll h-[calc(100vh)- var(--siteborder)] w-max bg-(--bg)";

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-black flex overflow-hidden ">
        {windowWidth > 650 ? (
          <Sidebar/>
        ) : (
          <></>
        )}
        {/* main content */}
        <div className={contentClasses}>{children}</div>
      </div>
    </>
  );
};

SiteBorder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteBorder;
