import React, { useEffect } from "react";
import gsap from "gsap";

import browserTab from "/browserTab.svg";
import proj1 from "/projects/portfolio.png";
import proj2 from "/projects/baasskyy.png";
import proj3 from "/projects/spotify.png";
import proj4 from "/projects/harryPotter.png";

function Projects() {
  useEffect(() => {
    const textEffect = () => {
      const words = document.querySelectorAll("#projects div");
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 150,
        },
        {
          opacity: 1,
          stagger: 0.16,
          y: 0,
          ease: "sine.out",
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          textEffect();
        }
      },
      { threshold: 0.2 }
    );

    const aboutElement = document.querySelector("#projects");
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    // for custom cursor:
    const cursor = document.querySelector(".custom-cursor");
    const projectParaRef = document.querySelector(".project-para-cursor");
    const projects = document.querySelectorAll(".project");

    const handleMouseEnter = (project) => {
      if (cursor) {
        gsap.to(cursor, {
          width: "10rem",
          height: "10rem",
          ease: "power2.out",
          mixBlendMode: "normal",
          background: "black",
          duration: 0.3,
        });
      }
      if (projectParaRef) {
        projectParaRef.style.visibility = "visible";
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        gsap.to(cursor, {
          width: "20px",
          height: "20px",
          ease: "power2.out",
          mixBlendMode: "difference",
          background: "#ffffff",
          duration: 0.3,
        });
      }
      if (projectParaRef) {
        projectParaRef.style.visibility = "hidden";
      }
    };

    projects.forEach((project) => {
      project.addEventListener("mouseenter", () => handleMouseEnter(project));
      project.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
      projects.forEach((project) => {
        project.removeEventListener("mouseenter", () =>
          handleMouseEnter(project)
        );
        project.removeEventListener("mouseleave", handleMouseLeave);
        if (projectParaRef) {
          projectParaRef.style.visibility = "hidden";
        }
      });
    };
  }, []);

  return (
    <div id="projects">
      <h1
        className="text-[6vw] font-[Iceland] text-brown [text-shadow:0_0_0_black] transition duration-300 mt-12 mb-8 mx-[14%] hover:[text-shadow:-3px_3px_0_black]"
      >
        PROJECTS
      </h1>
      <div className="flex w-full px-[14%] gap-[4%] max-[500px]:flex-col max-[500px]:px-0 border">
        <div className="project aspect-[16/9.005] mb-16 rounded-[1rem] overflow-hidden relative opacity-0 max-[500px]:w-[80%] max-[500px]:m-[5%] max-[500px]:even:ml-[15%]">
          <img
            className="bg absolute left-0 z-10"
            src={browserTab}
            alt=""
          />
          <img
            className="element absolute top-[6%] left-0 object-contain h-full z-8"
            src={proj1}
            alt=""
          />
        </div>
        <div className="project aspect-[16/9.005] mb-16 rounded-[1rem] overflow-hidden relative opacity-0 max-[500px]:w-[80%] max-[500px]:m-[5%] max-[500px]:even:ml-[15%]">
          <img
            className="bg absolute left-0 z-10"
            src={browserTab}
            alt=""
          />
          <img
            className="element absolute top-[6%] left-0 object-contain h-full z-8"
            src={proj2}
            alt=""
          />
        </div>
      </div>
      <div className="flex w-full px-[14%] gap-[4%] max-[500px]:flex-col max-[500px]:px-0">
        <div className="project aspect-[16/9.005] mb-16 rounded-[1rem] overflow-hidden relative opacity-0 max-[500px]:w-[80%] max-[500px]:m-[5%] max-[500px]:even:ml-[15%]">
          <img
            className="bg absolute left-0 z-10"
            src={browserTab}
            alt=""
          />
          <img
            className="element absolute top-[6%] left-0 object-contain h-full z-8"
            src={proj3}
            alt=""
          />
        </div>
        <div className="project aspect-[16/9.005] mb-16 rounded-[1rem] overflow-hidden relative opacity-0 max-[500px]:w-[80%] max-[500px]:m-[5%] max-[500px]:even:ml-[15%]">
          <img
            className="bg absolute left-0 z-10"
            src={browserTab}
            alt=""
          />
          <img
            className="element absolute top-[6%] left-0 object-contain h-full z-8"
            src={proj4}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
