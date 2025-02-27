import linkedin from "/socialMedia/linkedin.svg";
import twitter from "/socialMedia/twitter.svg";
import leetcode from "/socialMedia/leetcode.svg";
import github from "/socialMedia/github.svg";
import { useEffect, useState } from "react";

function Sidebar() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-[60px]">
      <div className="flex justify-around rotate-[-90deg] w-[100vh] transform origin-[100%_0%] h-[60px] -translate-x-[100%] ">
        <div className="bg-[url('/floating-sidebar.svg')] bg-cover bg-no-repeat h-[77%] w-[230px] mt-[14px] ml-5 mb-5 flex items-end justify-center ">
          <a href="#" className="px-14 text-[1.6rem] text-nowrap">
            Get CV
          </a>
        </div>
        <br />
        {windowHeight > 700 ? (
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
  );
}

export default Sidebar;
