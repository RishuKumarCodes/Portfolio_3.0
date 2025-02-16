import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import linkedin from "/socialMedia/linkedin.svg";
import twitter from "/socialMedia/twitter.svg";
import leetcode from "/socialMedia/leetcode.svg";
import github from "/socialMedia/github.svg";

const SiteBorder = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] bg-black flex overflow-hidden">
      {/* sidebar */}
      <div className="w-[50px]">
        <div className="flex justify-around rotate-[-90deg] w-[100vh] transform origin-[100%_0%] h-[50px] -translate-x-[100%] ">
          <div className="bg-[url('/floating-sidebar.svg')] bg-cover bg-no-repeat h-[90%] w-[225px] mt-[5.5px]">
            <a href="#" className="px-18 p-2 text-[1.7rem] text-nowrap">
              Get CV
            </a>
          </div>
          <br />
          {windowWidth > 700 ? (
            <div className=" flex gap-7 text-[1.1rem] my-auto">
              <a
                className="!text-white"
                target="_blank"
                href="https://www.linkedin.com/in/rishukumarcodes/"
              >
                Linkedin
              </a>
              <a
                className="!text-white"
                target="_blank"
                href="https://x.com/Rishu_kumar878"
              >
                Twitter
              </a>
              <span className="border border-neutral-600" />
              <a
                className="!text-white"
                target="_blank"
                href="https://leetcode.com/u/rishukumarcodes/"
              >
                leetcode
              </a>
              <a
                className="!text-white"
                target="_blank"
                href="https://github.com/RishuKumarCodes"
              >
                Github
              </a>
            </div>
          ) : (
            <div className="flex gap-8 text-lg my-auto border">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/rishukumarcodes/"
              >
                <img className="rotate-90 w-[1.25rem]" src={linkedin} alt="" />
              </a>
              <a target="_blank" href="https://x.com/Rishu_kumar878">
                <img className="rotate-90 w-[1.25rem]" src={twitter} alt="" />
              </a>
              <span className="border border-neutral-600" />
              <a target="_blank" href="https://leetcode.com/u/rishukumarcodes/">
                <img className="rotate-90 w-[1.25rem]" src={leetcode} alt="" />
              </a>
              <a target="_blank" href="https://github.com/RishuKumarCodes">
                <img className="rotate-90 w-[1.25rem]" src={github} alt="" />
              </a>
            </div>
          )}
        </div>
      </div>
      {/* main content */}
      <div className="flex-1 m-(--siteborder) ml-0 rounded-(--mrad) overflow-y-scroll h-[calc(100vh)- var(--siteborder)] w-max bg-(--bg)">
        {children}
      </div>
    </div>
  );
};

SiteBorder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SiteBorder;
