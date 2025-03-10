import ReactDOM from "react-dom";
import { CTAbtn, SmBtn } from "../components/MagneticButton";
import LenisScroll from "../components/LenisScroll.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ProjectPopup({ selectedProject, closePopup }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        duration: 1,
        background: "transparent",
      });

      gsap.from([closeBtnRef.current, contentRef.current], {
        duration: 1,
        opacity: 0,
        y: "50vh",
        ease: "expo.out",
      });

      gsap.fromTo(
        footerRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            scrub: true,
          },
        }
      );
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    gsap.to([closeBtnRef.current, contentRef.current], {
      duration: 0.4,
      opacity: 0,
      y: "40vh",
      ease: "power2.out",
    });
    gsap.to(containerRef.current, {
      duration: 1,
      background: "transparent",
      onComplete: closePopup,
    });
  };

  return ReactDOM.createPortal(
    <div
      ref={containerRef}
      id="projectPopupContainer"
      className="fixed bottom-0 left-0 bg-black/50 h-full w-full z-[100] rounded-(--brad)"
    >
      <div
        ref={closeBtnRef}
        onClick={handleClose}
        id="projectPopupCloseBtn"
        className="absolute right-0 bg-[url('/floating-sidebar.svg')] bg-contain bg-no-repeat cursor-pointer h-[46px] mt-[5px] w-[230px] mr-10 px-[30px]"
      >
        <SmBtn className="flex justify-center items-center gap-1 pt-1 !text-[1.26rem] !h-[50px] mt-1 mx-4 group ">
          <img
            src="/close.svg"
            className="size-6 group-hover:rotate-90 transition-all duration-500"
            alt="Close Icon"
          />
          Close
        </SmBtn>
      </div>
      <div
        ref={contentRef}
        id="projectPopupContent"
        className="absolute bottom-0 left-0 bg-(--bg) h-[calc(100vh-50px)] w-full z-100 rounded-(--brad) overflow-y-scroll"
      >
        <LenisScroll>
          <header className="flex m-[10%] mb-7 justify-between ">
            <h2 className="text-[6.6vw] uppercase">{selectedProject?.name}</h2>
            <CTAbtn>
              Visit
              <img
                src="/diagonal-arrow.svg"
                className="size-[2vw] rotate-45 group-hover:rotate-0 transition-transform duration-500 ml-2"
                alt="Arrow"
              />
            </CTAbtn>
          </header>
          <section className="flex my-24 mx-[10%] justify-around gap-[8%]">
            <div className="flex-1 space-y-5">
              <h3 className="text-neutral-400 text-sm">Date:</h3>
              <hr className="opacity-15" />
              <p className="text-xl">
                {selectedProject?.date || "date unavailable"}
              </p>
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="text-neutral-400 text-sm">Tech stack:</h3>
              <hr className="opacity-15" />
              <p className="text-xl">
                {selectedProject?.type || "unavailable"}
              </p>
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="text-neutral-400 text-sm">Repository:</h3>
              <hr className="opacity-15" />
              <SmBtn
                CName="text-xl group -mt-8 -ml-4 w-fit"
                href={selectedProject?.repo}
                target="_blank"
              >
                Go to Github
                <img
                  src="/diagonal-arrow.svg"
                  className="size-5 rotate-45 group-hover:rotate-0 transition-transform"
                  alt="Github arrow"
                />
              </SmBtn>
            </div>
          </section>
          <figure className="mx-auto bg-[url('/device-mbp-15-nonotch.png')] bg-contain bg-no-repeat w-[70%] h-auto pt-[0.72%]">
            <div className="relative cursor-grab aspect-16/9 mx-auto">
              <style>
                {`
                  .swiper-button-prev::after, 
                  .swiper-button-next::after { 
                    display: none; 
                  }
                `}
              </style>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-[80.9%] rounded-t-[1vw]"
              >
                {selectedProject?.visuals.map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={src}
                      alt={`Project visual ${idx}`}
                      className="w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute w-32 h-12 bottom-[20%] right-[12%]">
                <div className="swiper-button-prev cursor-pointer bg-white !size-12 p-3.5 rounded-full">
                  <img src="/right-arrow.svg" className="rotate-180" alt="<-" />
                </div>
                <div className="swiper-button-next cursor-pointer bg-white !size-12 p-3.5 rounded-full">
                  <img src="/right-arrow.svg" alt="->" />
                </div>
              </div>
            </div>
          </figure>

          <article className="mx-[10%] my-20 text-[1.6rem]">
            <h2 className="text-[1.25rem] text-zinc-600">Overview:</h2>
            <p>{selectedProject?.details.overview}</p>

            <h2 className="text-[1.25rem] text-zinc-600">Objectives:</h2>
            <p>{selectedProject?.details.objectives}</p>

            <h2 className="text-[1.25rem] text-zinc-600">Challenge:</h2>
            <p>{selectedProject?.details.challenge}</p>

            <h2 className="text-[1.25rem] text-zinc-600">Learnings:</h2>
            <p>{selectedProject?.details.learnings}</p>

            <h2 className="text-[1.25rem] text-zinc-600">
              Reflection & future improvements:
            </h2>
            <p>{selectedProject?.details.reflectionsAndFutureImprovements}</p>
          </article>

          <div className="h-20 bg-(--footer)">
            <div className="bg-(--bg) rounded-b-(--mrad) h-full"></div>
          </div>
          <footer className="bg-(--footer) text-white overflow-hidden">
            <div
              ref={footerRef}
              id="projectPopupFooterContent"
              className="relative flex items-center flex-col py-20"
            >
              <h1 className="text-xl mt-5 text-(--scol)">Next case-study</h1>
              <h1
                className="text-[5.5vw] mb-5 uppercase"
                style={{
                  fontFamily: "MuseoModerno , sans-serif",
                  fontWeight: "100",
                }}
              >
                baasskyy
              </h1>
              <div className="h-72 aspect-16/9 bg-(--pcol)"></div>
              <div className="border-t border-white/20 mb-5 w-full"></div>
              <CTAbtn
                CName="!text-[1.1vw] my-10"
                color="white"
                borderCol="#ffffff48"
              >
                All projects
              </CTAbtn>
            </div>
          </footer>
        </LenisScroll>
      </div>
    </div>,
    document.body
  );
}

export default ProjectPopup;
