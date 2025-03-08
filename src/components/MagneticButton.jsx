import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const CTAbtn = ({
  children,
  href = "#",
  onClick,
  CName = "",
  color = "black",
  ...rest
}) => {
  return (
    <a
      href={href}
      className={`size-[9vw] flex items-center justify-center !text-${color} font-medium border-b-[1.8vw] border-b-[#00000048] text-[2vw] text-nowrap max-[768px]:hidden ${CName}`}
      data-hover
      data-hover-bounds
      onClick={onClick}
      {...rest}
    >
      {children}
      <div data-hover-bounds></div>
    </a>
  );
};

CTAbtn.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  CName: PropTypes.string,
  color: PropTypes.string,
};

const SmBtn = ({
  children,
  href,
  onClick,
  CName = "",
  color = "black",
  strokeWidth = 1,
  strokeDashArray = 100,
  duration = 0.4,
  ...rest
}) => {
  const linkRef = useRef(null);
  const lineRef = useRef(null);
  const idRef = useRef(
    "animated-link-" + Math.random().toString(36).substring(2, 9)
  );

  useEffect(() => {
    const linkEl = linkRef.current;
    const lineEl = lineRef.current;

    const handleMouseEnter = () => {
      gsap.to(lineEl, {
        strokeDashoffset: 0,
        duration,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(lineEl, {
        strokeDashoffset: -strokeDashArray,
        duration,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(lineEl, { strokeDashoffset: strokeDashArray });
        },
      });
    };

    linkEl.addEventListener("mouseenter", handleMouseEnter);
    linkEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      linkEl.removeEventListener("mouseenter", handleMouseEnter);
      linkEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [duration, strokeDashArray]);

  return (
    <>
      <style>{`
        #${idRef.current} {
          color: ${color} !important;
        }
        #${idRef.current} line {
          stroke: ${color} !important;
        }
      `}</style>
      <a
        id={idRef.current}
        href={href}
        onClick={onClick}
        ref={linkRef}
        className={`relative gap-2 flex items-center !h-full px-4 text-md text-nowrap group ${CName}`}
        {...rest}
        data-magnet-btn-only
        data-hover-bounds
      >
        {children}
        <svg
          className="absolute bottom-[20%] left-0 w-full px-4 h-[2px] pointer-events-none"
          viewBox={`0 0 ${strokeDashArray} ${strokeWidth}`}
          preserveAspectRatio="none"
        >
          <div data-hover-bounds></div>

          <line
            ref={lineRef}
            x1="0"
            y1={strokeWidth / 2}
            x2={strokeDashArray}
            y2={strokeWidth / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDashArray}
            strokeDashoffset={strokeDashArray}
          />
        </svg>
      </a>
    </>
  );
};

SmBtn.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  CName: PropTypes.string,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDashArray: PropTypes.number,
  duration: PropTypes.number,
};

export { CTAbtn, SmBtn };
