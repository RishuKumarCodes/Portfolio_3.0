import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SmBtn } from "./MagneticButton";

gsap.registerPlugin(ScrollToPlugin);

function NavBox() {
  const textRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      gsap.from(textRef.current, {
        rotateX: 90,
        delay: 0.4,
        duration: 1,
        transformOrigin: "top",
      });
    }, 4000);
  }, []);

  const scrollToSection = (id) => {
    const container = document.querySelector(".content-wrapper");
    if (container) {
      gsap.to(container, { duration: 1, scrollTo: id });
    }
  };

  return (
    <div
      ref={textRef}
      className="fixed top-[var(--siteborder)] right-[7%] w-[350px] h-[47px] flex items-center px-[40px] z-[500] max-[500px]:hidden"
      style={{ background: "url('/portfolio-nav-bar.svg') no-repeat" }}
    >
      <SmBtn
        href="#about"
        color="white"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#about");
        }}
        CName="mb-1"
      >
        About
      </SmBtn>
      <SmBtn
        href="#projects"
        color="white"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#projects");
        }}
        CName="mb-1"
      >
        Work
      </SmBtn>
      <SmBtn
        href="#contact"
        color="white"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("#contact");
        }}
        CName="mb-1"
      >
        Contact
      </SmBtn>
    </div>
  );
}

export default NavBox;
