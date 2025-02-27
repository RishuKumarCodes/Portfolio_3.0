import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ---------------------- Tech Stack Cards ---------------------- */

// Reusable component for each tech stack card (for large screens)
const TechStackCard = ({ id, dataScrollSpeed, styleOverrides, title, items }) => {
  return (
    <div
      id={id}
      data-scroll
      data-scroll-speed={dataScrollSpeed}
      className="absolute aspect-[231/250] w-[13vw] m-[10px] bg-[#fce8e8] border border-[var(--stroke)] shadow-[2px_2px_0_var(--stroke)] p-4 text-center"
      style={styleOverrides}
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
        <p key={index} className="text-[1vw] my-[0.3rem] tracking-[0.7px] opacity-[0.7]">
          {item}
        </p>
      ))}
    </div>
  );
};

// Component for the tech stack cards shown on large screens
const TechStackLargeScreen = () => {
  return (
    <div
      className="tech-stack hidden md:block h-full w-full absolute top-0 left-0 z-[-4] opacity-0"
      data-scroll
      style={{ "--stroke": "#bd6666", "--tech-bg": "#fce8e8" }}
    >
      <TechStackCard
        id="backend"
        dataScrollSpeed="2"
        styleOverrides={{ left: "6%", top: "33%", transform: "rotate(-12deg)" }}
        title="Backend"
        items={["JavaScript", "Node.js", "Express.js", "RESTful APIs"]}
      />
      <TechStackCard
        id="frontend"
        dataScrollSpeed="0"
        styleOverrides={{ left: "25%", top: "9.3%", transform: "rotate(7deg)" }}
        title="Frontend"
        items={["HTML / CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"]}
      />
      <TechStackCard
        id="tools_tech"
        dataScrollSpeed="-1.2"
        styleOverrides={{ left: "55%", top: "17%", transform: "rotate(-14deg)" }}
        title="Tools & Tech"
        items={["Git", "GitHub", "VS Code", "Linux", "Hoppscotch"]}
      />
      <TechStackCard
        id="database"
        dataScrollSpeed="1.5"
        styleOverrides={{ left: "14%", top: "65%", transform: "rotate(14deg)" }}
        title="Database"
        items={["SQL", "MongoDB"]}
      />
      <TechStackCard
        id="languages"
        dataScrollSpeed="1.5"
        styleOverrides={{ left: "76%", top: "55%", transform: "rotate(-13deg)" }}
        title="Languages"
        items={["C / C++", "Java", "JavaScript", "SQL"]}
      />
      <TechStackCard
        id="ui-ux"
        dataScrollSpeed="2.3"
        styleOverrides={{ left: "83.5%", top: "18%", transform: "rotate(-4deg)" }}
        title="UI/UX"
        items={["Photoshop", "Illustrator", "Figma basics", "Canva"]}
      />
      <TechStackCard
        id="problem-solving"
        dataScrollSpeed="0"
        styleOverrides={{ left: "55%", bottom: "0%", transform: "rotate(5deg)" }}
        title="Problem-solving"
        items={["Data Structures", "Algorithms", "LeetCode"]}
      />
    </div>
  );
};

// Component for the tech stack cards shown on small screens
const TechStackSmallScreen = () => {
  const smallCardData = [
    {
      title: "Backend",
      items: ["JavaScript", "Node.js", "Express.js", "RESTful APIs"],
    },
    {
      title: "Frontend",
      items: ["HTML / CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
    },
    {
      title: "Problem-solving",
      items: ["Data Structures", "Algorithms", "LeetCode"],
    },
    {
      title: "Database",
      items: ["SQL", "MongoDB"],
    },
    {
      title: "Tools & Tech",
      items: ["Git", "GitHub", "VS Code", "Linux", "Hoppscotch"],
    },
    {
      title: "Languages",
      items: ["C / C++", "Java", "JavaScript", "SQL"],
    },
    {
      title: "UI/UX",
      items: ["Photoshop", "Illustrator", "Figma basics", "Canva"],
    },
  ];
  return (
    <div className="tech-stack-small-width flex items-center overflow-y-scroll md:hidden">
      {smallCardData.map((card, index) => (
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

/* ---------------------- Skills Content ---------------------- */

const SkillsText = () => {
  const text = `Driven by continuous learning, I've built a strong full-stack foundation—excelling in efficient RESTful APIs, modern JavaScript frameworks, and robust Git version control. I tackle challenging LeetCode problems, and enjoy art and photography as hobbies.`;

  return (
    <p className="text-[max(1.3vw,1rem)] flex flex-wrap">
      {text.split(" ").map((word, index) => (
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
  );
};

const SkillsContent = () => {
  return (
    <div
      className="content flex flex-col justify-center h-full w-full p-[13%] pb-[3%] md:w-[40%] md:m-auto md:p-0"
      data-scroll
      data-scroll-speed="-2"
    >
      <div
        className="heading overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <h1
          className="relative top-[100%] text-[6vw]"
          style={{
            fontFamily: "'Iceland', sans-serif",
            color: "brown",
            textShadow: "0 0 0 black",
            transition: "100ms",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textShadow = "-3px 3px 0 black")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.textShadow = "0 0 0 black")
          }
        >
          SKILLS
        </h1>
      </div>
      <SkillsText />
    </div>
  );
};

/* ---------------------- Main Skills Component ---------------------- */

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
            scroller: ".content-wrapper",
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
            scroller: ".content-wrapper",
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
            scroller: ".content-wrapper",
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
            scroller: ".content-wrapper",
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

    return () => {
      if (skillsElement) {
        observer.unobserve(skillsElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={imgBorder} id="skills" className="aspect-[16/9] w-full relative overflow-hidden z-50">
        <TechStackLargeScreen />
        <SkillsContent />
      </div>
      <TechStackSmallScreen />
    </>
  );
}

export default Skills;
