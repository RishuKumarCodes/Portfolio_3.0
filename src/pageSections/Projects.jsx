import { useState, useEffect } from "react";
import gsap from "gsap";
import data from "../data/ProjectsData.json";
const projData = data.proj;
import browserTab from "/browserTab.svg";
import ProjectPopup from "./ProjectPopup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsToShow = projData.slice(0, 2);

  const openPopup = (project) => {
    setSelectedProject(project);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedProject(null);
  };

  // Custom cursor effect for projects
  useEffect(() => {
    const cursor = document.querySelector(".proj-cursor");
    const projectParaRef = document.querySelector(".proj-cur-txt");
    const projects = document.querySelectorAll(".project");

    const handleMouseEnter = () => {
      if (cursor) {
        gsap.to(cursor, {
          width: "10rem",
          height: "10rem",
          ease: "power2.out",
          mixBlendMode: "normal",
          background: "black",
          transformOrigin: "center",
          scale: 0.9,
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
          transformOrigin: "center",
          scale: 1,
          duration: 0.3,
        });
      }
      if (projectParaRef) {
        projectParaRef.style.visibility = "hidden";
      }
    };

    projects.forEach((project) => {
      project.addEventListener("mouseenter", handleMouseEnter);
      project.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      projects.forEach((project) => {
        project.removeEventListener("mouseenter", handleMouseEnter);
        project.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (projectParaRef) {
        projectParaRef.style.visibility = "hidden";
      }
    };
  }, [projectsToShow]);

  return (
    <>
      {popupOpen && (
        <ProjectPopup
          selectedProject={selectedProject}
          closePopup={closePopup}
        />
      )}

      <div
        id="projects"
        className="bg-gradient-to-b from-[#fce4e4] to-[var(--bg)] mt-[10rem]"
      >
        <h1 className="text-stroke-heading mx-[5%] mb-[-7%]">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-[3%] gap-[3%] mb-12">
          {projectsToShow.map((project) => (
            <section
              key={project.id}
              className={`${project.bg} w-full px-10 py-36`}
            >
              <figure
                className="project w-full !aspect-[16/9] overflow-hidden relative rounded-xl mb-36 cursor-pointer"
                onClick={() => openPopup(project)}
              >
                <img className="absolute z-10" src={browserTab} alt="Tab" />
                <img
                  className="absolute top-[6%] px-1 w-full"
                  src={project.image}
                  alt={project.name}
                />
              </figure>
              <h1 className="border-b border-black/20 font-bold text-[3vw]">
                {project.name}
              </h1>
              <div className="flex justify-between">
                <button className="text-[1.1vw] hover:underline cursor-pointer">
                  Live site
                </button>
                <span className="text-[1.1vw]">{project.date}</span>
              </div>
            </section>
          ))}
        </div>
        <div className="w-full flex justify-center ">
          <a
            href="#"
            className="text-xl font-semibold flex gap-3 items-center m-8 border-b border-transparent hover:border-black"
            data-magnet-btn-only
            data-hover-bounds
          >
            More Projects{" "}
            <img src="/down-arrow.svg" alt="" className="size-5 -rotate-90" />
            <div data-hover-bounds></div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Projects;

// Todo: fix the magnetic small button, fix the cursorComponent.jsx
