import { useState, useEffect } from "react";
import gsap from "gsap";
import data from "../data/ProjectsData.json";
const projData = data.proj;
import browserTab from "/browserTab.svg";
import ProjectPopup from "./ProjectPopup";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmBtn } from "../components/MagneticButton";

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
              <h1 className="border-b border-black/20 font-bold md:text-[3vw] text-[8vw]">
                {project.name}
              </h1>
              <div className="flex justify-between items-center h-[40px] -ml-4">
                <SmBtn CName="md:text-[1.2rem] group">
                  Live site
                  <img
                    src="/diagonal-arrow.svg"
                    className="size-5 rotate-45 group-hover:rotate-0 transition-transform"
                  />
                </SmBtn>
                <span className="md:text-[1.2rem] text-md">{project.date}</span>
              </div>
            </section>
          ))}
        </div>
        <div className="w-full flex justify-center h-[70px]">
          <SmBtn href="#" CName="text-xl">
            More Projects <img src="/right-arrow.svg" className="size-4" />
          </SmBtn>
        </div>
      </div>
    </>
  );
}

export default Projects;
