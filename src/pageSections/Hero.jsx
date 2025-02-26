import { useRef, useEffect, useState } from "react";
import "../styles/hero.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import bgImg from "/heroSection-bg.jpg";
import subImg from "/heroSection-subject.png";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const imgBorder = useRef(null);
  const img = useRef(null);
  const Hey = useRef(null);
  const Imrishu = useRef(null);
  const leftBoxRef = useRef(null);
  const highlightRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Initial animations on page load
  useEffect(() => {
    if (imgBorder.current) {
      gsap.set(imgBorder.current, {
        scale: 0.1,
        opacity: 0,
        rotationY: 50,
        transformPerspective: 1900,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      });
    }
    if (img.current) gsap.set(img.current, { scale: 5 });
    if (Hey.current) gsap.set(Hey.current, { opacity: 0, rotation: 0 });
    if (Imrishu.current) {
      const spans = Imrishu.current.querySelectorAll("span");
      gsap.set(spans, { y: 1000 });
    }
    // Timeout to wait until preloader finishes
    const timer = setTimeout(() => {
      if (imgBorder.current) {
        gsap.to(imgBorder.current, {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 2.4,
          ease: "expo.out",
        });
      }
      if (img.current) {
        gsap.to(img.current, { scale: 1, duration: 2.4, ease: "expo.out" });
      }

      if (Imrishu.current) {
        gsap.to(Imrishu.current.querySelectorAll("span"), {
          y: 0,
          stagger: 0.08,
          duration: 2.5,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.084,0.61 0.065,0.742 0.2,0.858 0.276,0.92 0.374,1 1,1 "
          ),
        });
      }

      let tl = gsap.timeline();
      tl.fromTo(
        Hey.current,
        { y: 90, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.5, delay: 0.8, ease: "expo.out" }
      );

      if (leftBoxRef.current) {
        gsap.fromTo(
          leftBoxRef.current,
          { y: "80%" },
          { y: "0%", duration: 2.5, ease: "back.inOut(1)" }
        );
      }

      if (highlightRef.current) {
        gsap.fromTo(
          highlightRef.current,
          { y: "80%" },
          { y: "0%", duration: 2.5, ease: "back.inOut(1)" }
        );
      }

      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => setVideoError(true));
      }
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll trigger effect
  useEffect(() => {
    const bgImgEl = img.current.querySelector(".img_1");
    const subImgEl = img.current.querySelector(".img_2");

    gsap.fromTo(
      bgImgEl,
      { y: 0 },
      {
        y: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: imgBorder.current,
          start: "center center",
          scrub: true,
          scroller: ".content-wrapper",
        },
      }
    );

    gsap.fromTo(
      subImgEl,
      { y: 0 },
      {
        y: "-17%",
        ease: "none",
        scrollTrigger: {
          trigger: imgBorder.current,
          start: "center center",
          scrub: true,
          scroller: ".content-wrapper",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 3D Mousemove effect with differential layer shifts
  useEffect(() => {
    if (!imgBorder.current) return;
    const bgImgEl = img.current.querySelector(".img_1");
    const subImgEl = img.current.querySelector(".img_2");

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      const bgX = offsetX * -10;
      const bgY = offsetY * -10;
      const subX = offsetX * -20;
      const subY = offsetY * -20;

      gsap.to(bgImgEl, {
        x: bgX,
        y: bgY,
        ease: "power3.out",
        duration: 0.5,
      });
      gsap.to(subImgEl, {
        x: subX,
        y: subY,
        ease: "power3.out",
        duration: 0.5,
      });
    };

    // Attach the event listener to the frame only
    const frame = imgBorder.current;
    frame.addEventListener("mousemove", handleMouseMove);
    return () => frame.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>
        {`
          .hero-section {
            --space: 3vw;
            --gap: calc(var(--space) / 2);

            --h: calc(100vh + 75px);
            --w: calc(100% - var(--space)) - var(--siteborder);

            --img-h: calc(100vh - var(--siteborder)*2 - var(--space));
            --img-w: calc(100vw - var(--space) - 64px - var(--siteborder)*2);

            --leftbox-w: calc(27vw + var(--gap));
            --leftbox-h: calc(37vh + var(--gap));
            --hilight-w: calc(100% - var(--leftbox-w));

            --edge-w: calc(var(--brad)*2);
            --edge-h: calc(var(--brad)*2);
            --edge-pos-t: calc(-1 * (var(--brad)*2) + 1px);
            --edge-sdw: calc(-1 * var(--gap)) var(--gap) 0 var(--bg);
            user-select: none;
          }
        `}
      </style>
      <div className="hero-section h-(--h) w-(--w) mx-(--gap) mt-(--gap) relative overflow-hidden mb-7">
        <section
          className="image-section overflow-hidden h-(--img-h) w-(--img-w) !rounded-[var(--brad)] "
          ref={imgBorder}
        >
          {/* Images */}
          <figure className="img relative " ref={img}>
            <img
              className="img_1 relative object-cover top-0 max-w-full min-h-[1080px] scale-[101%] w-(--img-w) h-(--img-h) object-top overflow-visible"
              data-scroll
              data-scroll-speed="2"
              src={bgImg}
              alt="Background"
            />
            <img
              className="img_2 absolute object-cover top-0 left-0 max-w-full min-h-[1080px] scale-[101%] w-(--img-w) h-(--img-h) object-top overflow-visible"
              data-scroll
              data-scroll-speed="4"
              src={subImg}
              alt="Subject"
            />
          </figure>

          {/* Text */}
          <figcaption
            className="text absolute bottom-[0%] right-[5%] text-white flex"
            data-scroll
            data-scroll-speed="-0.8"
          >
            <p
              ref={Hey}
              className="relative opacity-0 left-[60px] bottom-[35px] text-[3vw]"
            >
              Hey,
            </p>
            <h1 ref={Imrishu} className="p-0 text-[12vw] flex overflow-hidden">
              {Array.from("I'm Rishu").map((char, index) => (
                <span key={index} className="inline-block leading-[100%]">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
          </figcaption>
        </section>

        {/* Terminal at bottom-left */}
        <section
          className="absolute bottom-0 h-(--leftbox-h) w-(--leftbox-w) bg-(--bg) rounded-tr-(--mrad) z-2"
          ref={leftBoxRef}
        >
          <div className="absolute w-(--edge-w) h-(--edge-h) rounded-full top-(--edge-pos-t) left-[-1px] shadow-(--edge-sdw)"></div>
          <div className="mt-(--gap) w-[27vw] h-[37vh] rounded-(--brad) overflow-hidden">
            {!showVideo || videoError ? (
              <img
                src="/consoleLogImg.jpg"
                className="h-full w-full object-cover object-left"
                alt="Console Fallback"
              />
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover object-left"
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
              >
                <source src="/consoleLogs.mp4" type="video/mp4" />
              </video>
            )}
          </div>
        </section>

        {/* Highlights strip */}
        <section
          className="flex ml-auto text-(--pcol) text-[7.3rem] w-(--hilight-w)"
          ref={highlightRef}
        >
          <div className="absolute w-(--edge-w) h-(--edge-h) rounded-full top-(--edge-pos-t) left-[-1px] shadow-(--edge-sdw)"></div>
          <p
            className="whitespace-nowrap animate-[moveHighlight_25s_linear_infinite] z-1 flex items-center"
            style={{ fontFamily: "Reenie Beanie" }}
          >
            based on bihar{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
            aspiring software developer{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
            open source{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
            based on bihar{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
            aspiring software developer{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
            open source{" "}
            <span className="text-gray-800 text-[5rem] px-7">&#9679;</span>
          </p>
        </section>
      </div>
    </>
  );
}

export default Hero;
