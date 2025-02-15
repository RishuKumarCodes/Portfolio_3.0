import { useRef, useEffect } from "react";
import "./hero.css";

// import BottomLeftBox from "./BottomLeftBox";
// import HighlightStrip from "./HighlightStrip";
import gsap from "gsap";

import bgImg from "/heroSection-bg.jpg";
import subImg from "/heroSection-subject.png";

function Hero() {
  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const imgBorder = useRef(null);
  const img = useRef(null);
  const boxAnimate = useRef(null);

  useEffect(() => {
    // Set initial states immediately to prevent flicker
    if (textRef1.current) {
      gsap.set(textRef1.current, { opacity: 0, rotation: 0 });
    }
    if (textRef.current) {
      const spans = textRef.current.querySelectorAll("span");
      gsap.set(spans, { opacity: 0, y: 200, rotation: 22, scale: 0.7 });
    }
    if (imgBorder.current) {
      gsap.set(imgBorder.current, {
        overflow: "hidden",
        scale: 0.9,
        y: -60,
        borderRadius: "var(--border-radius)",
      });
    }
    if (img.current) {
      gsap.set(img.current, { scale: 1.4, y: 60, opacity: 0 });
    }

    // Start the animations after a delay
    const timer = setTimeout(() => {
      // Animate the image border to its final state
      if (imgBorder.current) {
        gsap.to(imgBorder.current, {
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
        });
      }

      // Animate the image to its final state
      if (img.current) {
        gsap.to(img.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
        });
      }

      // Animate each letter of the main text to its final state
      if (textRef.current) {
        gsap.to(textRef.current.querySelectorAll("span"), {
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          delay: 0.3,
          stagger: 0.04,
          duration: 0.1,
          ease: "elastic.out(1,0.3)",
        });
      }

      // Animate the "Hey," text using a timeline
      let tl = gsap.timeline();
      tl.to(textRef1.current, {
        opacity: 1,
        rotation: 20,
        duration: 0.2,
        ease: "power2.out",
      })
        .to(textRef1.current, {
          rotation: -20,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(textRef1.current, {
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
        });
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  // animate left box
  useEffect(() => {
    if (boxAnimate.current) {
      gsap.from(boxAnimate.current, {
        y: "80%",
        duration: 1,
        ease: "power1.inOut",
      });
    }
  }, []);

  // animate hilight strip
  useEffect(() => {
    if (boxAnimate.current) {
      gsap.from(boxAnimate.current, {
        y: "80%",
        duration: 1,
        ease: "back.inOut(1)",
      });
    }
  }, []);
  return (
    <div className="hero-section">
      <div className="image-section" ref={imgBorder}>
        <div className="img" ref={img}>
          <img
            className="img_1"
            data-scroll
            data-scroll-speed="2"
            src={bgImg}
            alt="Background"
          />
          <img
            className="img_2"
            data-scroll
            data-scroll-speed="4"
            src={subImg}
            alt="Subject"
          />
        </div>

        <div className="text" data-scroll data-scroll-speed="-0.8">
          <p ref={textRef1}>Hey,</p>
          <h1 ref={textRef}>
            {Array.from("I'm Rishu").map((char, index) => (
              <span key={index}>
                {char === " " ? <span>&nbsp;</span> : char}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* left box */}
      <div className="info" ref={boxAnimate}>
        <div className="round-edge-top-left-1 round-edge"></div>
        <div className="round-edge-top-left-2 round-edge"></div>
      </div>
      {/* hilights strip */}
      <div className="highlight-strip" ref={boxAnimate}>
        <div className="round-edge-top-left-3 round-edge"></div>
        <p>
          BASED ON BIHAR, INDIA &#8618; OPEN SOURCE &#8618; BASED ON BIHAR,
          INDIA &#8618; OPEN SOURCE &#8618;{" "}
        </p>
      </div>
    </div>
  );
}

export default Hero;
