import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisScroll = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        lenisRef.current = new Lenis({
          wrapper: scrollContainerRef.current,
          content: scrollContainerRef.current,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        scrollContainerRef.current.style.height = "100%";
        scrollContainerRef.current.style.overflow = "auto";
        document.body.style.overflow = "hidden";

        function raf(time) {
          lenisRef.current.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        ScrollTrigger.defaults({
          scroller: scrollContainerRef.current,
        });
        ScrollTrigger.refresh();

        lenisRef.current.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenisRef.current?.raf(time * 1000);
        });
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, []);

  return (
    <div
      className="content-wrapper"
      ref={scrollContainerRef}
      style={{ height: "100%", overflow: "auto", position: "relative" }}
    >
      {children}
    </div>
  );
};

export default LenisScroll;
