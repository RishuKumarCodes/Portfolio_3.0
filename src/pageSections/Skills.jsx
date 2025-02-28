import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../data/skillsData.json";
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
    // Maximum translation in pixels
    const maxTranslation = 20;
    // Calculate offsets relative to half the width/height
    const xOffset = (deltaX / (rect.width / 2)) * maxTranslation;
    const yOffset = (deltaY / (rect.height / 2)) * maxTranslation;
    gsap.to(cardRef.current, {
      x: xOffset,
      y: yOffset,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      scale: 1,
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
      className="absolute aspect-[231/250] w-[13vw] m-[10px] bg-[#fce8e8] border border-[var(--stroke)] shadow-[2px_2px_0_var(--stroke)] p-4 text-center"
      style={styleOverrides}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3
        className="text-[1.63vw] font-black mb-[5%] text-white"
        style={{
          WebkitTextStroke: "1px var(--stroke)",
          textShadow: "2px 2px 0 var(--stroke)",
        }}
      >
        {title}
      </h3>
      {items.map((item, index) => (
        <p
          key={index}
          className="text-[1vw] my-[0.3rem] tracking-[0.7px] opacity-[0.7] "
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const TechStackLargeScreen = () => {
  return (
    <div
      className="tech-stack hidden md:block h-full w-full absolute top-0 left-0 z-[-4] opacity-0"
      data-scroll
      style={{ "--stroke": "#bd6666", "--tech-bg": "#fce8e8" }}
    >
      {data.techStackData.map((card) => (
        <TechStackCard
          key={card.id}
          id={card.id}
          dataScrollSpeed={card.dataScrollSpeed}
          styleOverrides={card.styleOverrides}
          title={card.title}
          items={card.items}
        />
      ))}
    </div>
  );
};

const TechStackSmallScreen = () => {
  return (
    <div className="tech-stack-small-width flex items-center overflow-y-scroll md:hidden">
      {data.techStackData.map((card, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-[150px] h-[160px] bg-[rgb(255,211,211)] m-[10px] p-4"
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
};

const SkillsContent = () => {
  return (
    <div className="content flex flex-col justify-center h-full w-full p-[13%] pb-[3%] md:w-[40%] md:m-auto md:p-0">
      <div className="heading overflow-hidden">
        <h1
          className="relative top-[100%] text-[6vw]  text-(--pcol)"
          style={{
            fontFamily: "'MuseoModerno', sans-serif",
            textShadow: "0 0 0 black",
            transition: "100ms",
          }}
        >
          Skills
        </h1>
      </div>
      <p className="text-[max(1.3vw,1rem)] flex flex-wrap">
        {data.skillsTextData.split(" ").map((word, index) => (
          <p
            key={index}
            className="wordBox flex flex-row w-min pr-[0.8rem] overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            <p className="word relative whitespace-nowrap w-min top-[100%]">
              {word}{" "}
            </p>
          </p>
        ))}
      </p>
    </div>
  );
};

function Skills() {
  const imgBorder = useRef(null);

  useEffect(() => {
    const textEffect = () => {
      // Select the nested <p> elements for the word animation
      const words = document.querySelectorAll(".content p p p");

      gsap.fromTo(
        ".content h1",
        { top: "200%", opacity: 0 },
        {
          top: "0%",
          opacity: 1,
          duration: 0.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: imgBorder.current,
            start: "top 100%",
            toggleActions: "restart reset restart reset",
          },
        }
      );

      gsap.fromTo(
        words,
        { top: "100%" },
        {
          top: "0%",
          stagger: 0.02,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imgBorder.current,
            start: "top 100%",
            toggleActions: "restart reset restart reset",
          },
        }
      );

      gsap.fromTo(
        ".tech-stack",
        { opacity: 0 },
        {
          opacity: 1,
          delay: 0.5,
          duration: 1.5,
          scrollTrigger: {
            trigger: imgBorder.current,
            start: "top 100%",
            toggleActions: "restart reset restart reset",
          },
        }
      );

      gsap.fromTo(
        ".tech-stack",
        { y: "10%" },
        {
          y: "0%",
          delay: 0.5,
          duration: 0.5,
          scrollTrigger: {
            trigger: imgBorder.current,
            start: "top 100%",
            toggleActions: "restart reset restart reset",
          },
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          textEffect();
        }
      },
      { threshold: 0 }
    );

    const skillsElement = document.querySelector("#skills");
    if (skillsElement) {
      observer.observe(skillsElement);
    }

    gsap.utils.toArray(".tech-stack [data-scroll-speed]").forEach((card) => {
      const speed = parseFloat(card.getAttribute("data-scroll-speed"));
      gsap.to(card, {
        yPercent: -20 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      if (skillsElement) {
        observer.unobserve(skillsElement);
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={imgBorder}
        id="skills"
        className="aspect-[16/9] w-full relative overflow-hidden z-50"
      >
        <TechStackLargeScreen />
        <SkillsContent />
      </div>
      <TechStackSmallScreen />
    </>
  );
}

export default Skills;
