import ReactDOM from "react-dom";
import { CTAbtn, SmBtn } from "../components/MagneticButton";
import LenisScroll from "../components/LenisScroll.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ProjectPopup({ selectedProject, closePopup }) {
  useEffect(() => {
    gsap.from("#projectPopupContainer", {
      duration: 1,
      background: "transparent",
    });

    gsap.from("#projectPopupCloseBtn , #projectPopupContent", {
      duration: 1,
      opacity: 0,
      y: "50vh",
      ease: "expo.out",
    });

    gsap.fromTo(
      "#projectPopupFooterContent",
      { top: "-1000px" },
      {
        top: "0px",
        scrollTrigger: {
          trigger: "#projectPopupFooterContent",
          scrub: true,
          markers: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleClose = () => {
    gsap.to("#projectPopupCloseBtn , #projectPopupContent", {
      duration: 0.4,
      opacity: 0,
      y: "40vh",
      ease: "power2.out",
    });
    gsap.to("#projectPopupContainer", {
      duration: 1,
      background: "transparent",
      onComplete: closePopup,
    });
  };

  return ReactDOM.createPortal(
    <div
      id="projectPopupContainer"
      className="fixed bottom-0 left-0 bg-black/50 h-full w-full z-[100] rounded-(--brad)"
    >
      <div
        onClick={handleClose}
        id="projectPopupCloseBtn"
        className="absolute right-0 bg-[url('/floating-sidebar.svg')] bg-contain bg-no-repeat cursor-pointer h-[46px] mt-[5px] w-[230px] mr-10 px-[30px]"
      >
        <SmBtn className="flex justify-center items-center gap-1 pt-1 !text-[1.26rem] !h-[50px] mt-1 mx-4 group ">
          <img
            src="/close.svg"
            className="size-6  group-hover:rotate-90 transition-all duration-500"
          />
          Close
        </SmBtn>
      </div>
      <div
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
              />
            </CTAbtn>
          </header>
          <section className="flex my-24 mx-[10%] justify-around gap-[8%]">
            <div className="flex-1 space-y-5">
              <h3 className="text-neutral-400 text-sm">Date:</h3>
              <hr className="opacity-15" />
              <p className="text-xl">
                {selectedProject?.date || "date unavilable"}
              </p>
            </div>
            <div className="flex-1 space-y-5">
              <h3 className="text-neutral-400 text-sm">Tech stack:</h3>
              <hr className="opacity-15" />
              <p className="text-xl">{selectedProject?.type || "unavilable"}</p>
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
                  className="size-5 rotate-45 group-hover:rotate-0 transition-transform "
                />
              </SmBtn>
            </div>
          </section>
          <figure className="mx-auto bg-[url('/device-mbp-15-nonotch.png')] bg-contain bg-no-repeat w-[70%] h-auto pt-[0.72%]">
            <div className="relative cursor-grab aspect-16/9 mx-auto">
              <style>
                {` .swiper-button-prev::after, .swiper-button-next::after { display: none; } `}
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

            <h2 className="text-[1.25rem] text-zinc-600">objectives:</h2>
            <p>{selectedProject?.details.objectives}</p>

            <h2 className="text-[1.25rem] text-zinc-600">challenge:</h2>
            <p>{selectedProject?.details.challenge}</p>

            <h2 className="text-[1.25rem] text-zinc-600">learnings:</h2>
            <p>{selectedProject?.details.learnings}</p>

            <h2 className="text-[1.25rem] text-zinc-600">
              Reflection & future improvements:
            </h2>
            <p>{selectedProject?.details.reflectionsAndFutureImprovements}</p>
          </article>

          {/* <figcaption></figcaption> */}
          <footer className="bg-(--footer) min-h-[90vh] text-white overflow-hidden">
            <div className="h-20 bg-(--bg) rounded-b-(--mrad) z-10"></div>
            <div
              id="projectPopupFooterContent"
              className="relative flex items-center flex-col py-14 z-0"
            >
              <h1 className="text-xl my-5">Next case-study</h1>
              <div className="size-92 bg-(--pcol)"></div>
              <div className="border-t border-white/20 my-5 w-full "></div>
              <CTAbtn
                CName="!text-[1.1vw] "
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
