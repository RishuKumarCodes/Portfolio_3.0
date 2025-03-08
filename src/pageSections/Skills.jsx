import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../data/skillsData.json";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

const TechStackCard = ({
  id,
  dataScrollSpeed,
  styleOverrides,
  title,
  items,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const deltaX = e.clientX - cardCenterX;
    const deltaY = e.clientY - cardCenterY;
    const maxTranslation = 20;
    const xOffset = (deltaX / (rect.width / 2)) * maxTranslation;
    const yOffset = (deltaY / (rect.height / 2)) * maxTranslation;
    gsap.to(cardRef.current, {
      x: xOffset,
      y: yOffset,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      data-scroll
      data-scroll-speed={dataScrollSpeed}
      className="absolute aspect-[231/250] w-[13vw] bg-[#ffeded] shadow-[9px_9px_46px_#0000003d,inset_50px_50px_82px_#f1cbcb] p-4 text-center rounded-(--brad) !scale-90"
      style={styleOverrides}
      onMouseMove={handleMouseMove}
      onMouseEnter={() =>
        gsap.to(cardRef.current, {
          ease: "power3.out",
          duration: 0.3,
        })
      }
      onMouseLeave={() =>
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.3,
        })
      }
    >
      <h3 className="text-(--pcol) font-bold text-[1.3vw] my-3">{title}</h3>
      {items.map((item, index) => (
        <p key={index} className="text-[1vw] tracking-[0.7px] text-zinc-700">
          {item}
        </p>
      ))}
    </div>
  );
};

TechStackCard.propTypes = {
  id: PropTypes.string.isRequired,
  dataScrollSpeed: PropTypes.number,
  styleOverrides: PropTypes.object,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const TechStackLargeScreen = () => (
  <div
    className="tech-stack hidden md:block h-full w-full absolute top-0 left-0"
    data-scroll
  >
    {data.techStackData.map((card) => (
      <TechStackCard key={card.id} {...card} />
    ))}
  </div>
);

const TechStackSmallScreen = () => (
  <div className="tech-stack-small-width flex items-center overflow-y-scroll md:hidden mt-4">
    {data.techStackData.map((card, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-[150px] h-[160px] bg-[#ffd3d3] m-[10px] p-4 !rounded-(--brad)"
        style={{ borderRadius: "var(--border-radius)" }}
      >
        <h3 className="text-base mb-2">{card.title}</h3>
        {card.items.map((item, idx) => (
          <p key={idx} className="text-[12px]">
            {item}
          </p>
        ))}
      </div>
    ))}
  </div>
);

const SkillsContent = () => (
  <div className="content">
    <div className="heading z-0 overflow-hidden w-[54vw] ">
      <h1
        className="text-stroke-heading mb-[-19%] md:mt-[-10%] w-[54vw]"
        style={{
          fontFamily: "'MuseoModerno', sans-serif",
        }}
      >
        Skills
      </h1>
    </div>
    <p className="text-[max(1.6vw,1rem)] flex flex-wrap px-[5%] md:p-10 py-4 md:w-[52vw]">
      {data.skillsTextData.split(" ").map((word, index) => (
        <span
          key={index}
          className="wordBox w-min pr-[0.65rem] overflow-hidden font-[400]"
          style={{ letterSpacing: "-2px" }}
        >
          <span className="word relative whitespace-nowrap w-min top-[100%]">
            {word}
          </span>
        </span>
      ))}
    </p>
  </div>
);

function Skills() {
  const skillsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          gsap.fromTo(
            ".content h1",
            { left: "10%" },
            {
              left: "0%",
              scrollTrigger: {
                trigger: ".content",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            ".content p span span",
            { top: "100%" },
            {
              top: "0%",
              stagger: 0.015,
              ease: "expo.out",
              duration: 0.67,
              delay: "0 !important",
              scrollTrigger: {
                trigger: skillsRef.current,
                scroller: ".content-wrapper",
                start: "top 67%",
                toggleActions: "restart reset restart reset",
              },
            },
            "<"
          );

          gsap.utils
            .toArray(".tech-stack [data-scroll-speed]")
            .forEach((card) => {
              const speed = parseFloat(card.getAttribute("data-scroll-speed"));
              gsap.to(card, {
                yPercent: -20 * speed,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  scroller: ".content-wrapper",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            });
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, 4000);
  }, []);

  return (
    <>
      <div
        ref={skillsRef}
        id="skills"
        className=" md:aspect-[16/9] w-full relative overflow-hidden z-50"
      >
        <TechStackLargeScreen />
        <SkillsContent />
      </div>
      <TechStackSmallScreen />
    </>
  );
}

export default Skills;
