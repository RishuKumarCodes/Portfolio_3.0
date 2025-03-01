import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const initScrollAnimation = () => {
      const words = aboutRef.current.querySelectorAll("p .word");
      gsap.fromTo(
        words,
        { y: "100%" },
        {
          y: "0%",
          stagger: 0.025,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            scroller: ".content-wrapper",
            start: "top 77%",
            toggleActions: "restart reset restart reset",
          },
        }
      );
      ScrollTrigger.refresh();
    };

    const handleLoad = () => {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            initScrollAnimation();
          }, 100);
        });
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={aboutRef}
        id="about"
        className="
          flex items-center justify-between p-[14%] gap-12
          max-[768px]:pb-[11px]
          max-[500px]:pt-[13%] max-[500px]:pr-[5%] max-[500px]:pb-[11px] max-[500px]:pl-[5%]
        "
      >
        <p
          className="w-[65%] max-[768px]:w-full flex flex-row flex-wrap "
          style={{
            fontSize: "max(1.87vw, 1.15rem)",
          }}
        >
          {`I'm Rishu, an undergrad focused on building efficient digital solutions through precise coding and creative problem-solving.`
            .split(" ")
            .map((word, index) => (
              <span
                key={index}
                className="wordBox flex w-min pr-[0.65rem] overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <span className="word w-min whitespace-nowrap" style={{ letterSpacing: "-2px" }}>{word} </span>
              </span>
            ))}
        </p>
        <a
          href="#"
          className="
            h-[9vw] w-[9vw] flex items-center justify-center text-black font-medium
            border-b-[1.8vw] border-b-[#00000048] text-[2vw]
            max-[768px]:hidden
          "
          data-hover
          data-hover-bounds
        >
          Get CV
          <div data-hover-bounds></div>
        </a>
        <a
          href="#"
          className="
            h-[9vw] w-[9vw] flex items-center justify-center text-black font-medium
            border-b-[1.8vw] border-b-[#00000048] text-[2vw] whitespace-nowrap
            max-[768px]:hidden
          "
          data-hover
          data-hover-bounds
        >
          Hire me
          <div data-hover-bounds></div>
        </a>
      </div>

      {/* for small screen */}
      <div className="flex mr-[10%] justify-end gap-[10%] md:hidden">
        <a
          href="#"
          className="h-[90px] w-[90px] bg-[rgb(255,217,217)] text-black flex items-center justify-center rounded-full"
        >
          Get CV
        </a>
        <a
          href="#"
          className="h-[90px] w-[90px] bg-[rgb(255,217,217)] text-black flex items-center justify-center rounded-full"
        >
          Hire me
        </a>
      </div>
    </>
  );
}

export default About;
