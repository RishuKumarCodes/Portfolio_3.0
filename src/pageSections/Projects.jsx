import React, { useEffect } from "react";
import gsap from "gsap";
import "./projects.css";

import browserTab from "/browserTab.svg";
import proj1 from "/projects/portfolio.png";
import proj2 from "/projects/baasskyy.png";
import proj3 from "/projects/spotify.png";
import proj4 from "/projects/harryPotter.png";

function Projects() {
  // Text animation effect using Intersection Observer
  useEffect(() => {
    const textEffect = () => {
      const words = document.querySelectorAll("#projects div");
      gsap.fromTo(
        words,
        { opacity: 0, y: 150 },
        { opacity: 1, stagger: 0.16, y: 0, ease: "sine.out" }
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

    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      observer.observe(projectsSection);
    }

    // Cleanup the observer on unmount
    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  }, []);

  // Custom cursor effect for projects
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const projectParaRef = document.querySelector(".project-para-cursor");
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
          scale: 0.9, // Slightly reduces stretch while growing
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
          scale: 1, // Reset scale to normal
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
  }, []);

  return (
    <div id="projects">
      <h1 className="stroke-text">Projects</h1>
      <div>
        <div className="project">
          <img className="bg" src={browserTab} alt="Browser Tab" />
          <img className="element" src={proj1} alt="Project 1" />
        </div>
        <div className="project">
          <img className="bg" src={browserTab} alt="Browser Tab" />
          <img className="element" src={proj2} alt="Project 2" />
        </div>
      </div>
      <div>
        <div className="project">
          <img className="bg" src={browserTab} alt="Browser Tab" />
          <img className="element" src={proj3} alt="Project 3" />
        </div>
        <div className="project">
          <img className="bg" src={browserTab} alt="Browser Tab" />
          <img className="element" src={proj4} alt="Project 4" />
        </div>
      </div>
    </div>
  );
}

export default Projects;
