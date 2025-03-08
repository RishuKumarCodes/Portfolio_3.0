import linkedin from "/socialMedia/linkedin.svg";
import twitter from "/socialMedia/twitter.svg";
import leetcode from "/socialMedia/leetcode.svg";
import github from "/socialMedia/github.svg";
import { useEffect, useState } from "react";
import { SmBtn } from "./MagneticButton";

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
        <div className="bg-[url('/floating-sidebar.svg')] bg-cover bg-no-repeat h-[77%] w-[230px] mt-[14px] px-[3.5%]">
          <SmBtn href="#" CName="flex justify-center pt-1 !text-[1.45rem]">
            Get CV
            <img
              src="/diagonal-arrow.svg"
              className="size-5 max-w-0 rotate-[135deg] group-hover:max-w-[20px] transition-all duration-300 overflow-hidden"
            />
          </SmBtn>
        </div>
        <br />
        {windowHeight > 700 ? (
          <div className="flex my-auto h-full ">
            <SmBtn
              color="white"
              target="_blank"
              href="https://www.linkedin.com/in/rishukumarcodes/"
            >
              Linkedin
              <img
                src="/diagonal-arrow.svg"
                className="size-4 max-w-0 group-hover:max-w-[20px] transition-all duration-300 overflow-hidden filter invert"
              />
            </SmBtn>
            <SmBtn
              color="white"
              target="_blank"
              href="https://x.com/Rishu_kumar878"
            >
              Twitter
              <img
                src="/diagonal-arrow.svg"
                className="size-4 max-w-0 group-hover:max-w-[20px] transition-all duration-300 overflow-hidden filter invert"
              />
            </SmBtn>
            <span className="border border-neutral-600 my-4 mx-2" />
            <SmBtn
              color="white"
              target="_blank"
              href="https://leetcode.com/u/rishukumarcodes/"
            >
              leetcode
              <img
                src="/diagonal-arrow.svg"
                className="size-4 max-w-0 group-hover:max-w-[20px] transition-all duration-300 overflow-hidden filter invert"
              />
            </SmBtn>
            <SmBtn
              color="white"
              target="_blank"
              href="https://github.com/RishuKumarCodes"
            >
              Github
              <img
                src="/diagonal-arrow.svg"
                className="size-4 max-w-0 group-hover:max-w-[20px] transition-all duration-300 overflow-hidden filter invert"
              />
            </SmBtn>
          </div>
        ) : (
          <div className="flex gap-1.5">
            <SmBtn
              CName="!rotate-90"
              color="white"
              target="_blank"
              href="https://www.linkedin.com/in/rishukumarcodes/"
            >
              <img className=" w-[1.25rem]" src={linkedin} alt="" />
            </SmBtn>
            <SmBtn
              CName="!rotate-90"
              color="white"
              target="_blank"
              href="https://x.com/Rishu_kumar878"
            >
              <img className=" w-[1.25rem]" src={twitter} alt="" />
            </SmBtn>
            <span className="border border-neutral-600 my-4 mx-2" />
            <SmBtn
              CName="!rotate-90"
              color="white"
              target="_blank"
              href="https://leetcode.com/u/rishukumarcodes/"
            >
              <img className=" w-[1.25rem]" src={leetcode} alt="" />
            </SmBtn>
            <SmBtn
              CName="!rotate-90"
              color="white"
              target="_blank"
              href="https://github.com/RishuKumarCodes"
            >
              <img className=" w-[1.25rem]" src={github} alt="" />
            </SmBtn>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
