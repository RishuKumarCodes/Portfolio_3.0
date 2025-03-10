import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/CursorComponent.css";
import { vec2 } from "vecteur";

const CursorComponent = () => {
  const cursorRef = useRef(null);
  const projectParaRef = useRef(null);

  useEffect(() => {
    class Cursor {
      constructor(targetEl) {
        this.el = targetEl;
        this.position = {
          previous: vec2(-100, -100),
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          lerpAmount: 0.1,
        };
        this.scale = {
          previous: 1,
          current: 1,
          target: 1,
          lerpAmount: 0.1,
        };
        this.isHovered = false;
        this.hoverEl = null;
        this.addListeners();
      }

      update() {
        this.position.current.lerp(
          this.position.target,
          this.position.lerpAmount
        );
        this.scale.current = gsap.utils.interpolate(
          this.scale.current,
          this.scale.target,
          this.scale.lerpAmount
        );

        const delta = this.position.current.clone().sub(this.position.previous);

        this.position.previous.copy(this.position.current);
        this.scale.previous = this.scale.current;

        gsap.set(this.el, {
          x: this.position.current.x,
          y: this.position.current.y,
        });

        if (!this.isHovered) {
          const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
          const distance =
            Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;

          gsap.set(this.el, {
            rotate: angle,
            scaleX: this.scale.current + Math.min(distance, 1),
            scaleY: this.scale.current - Math.min(distance, 0.3),
          });
        }
      }

      updateTargetPosition(x, y) {
        if (this.isHovered) {
          const bounds = this.hoverEl.getBoundingClientRect();

          const cx = bounds.x + bounds.width / 2;
          const cy = bounds.y + bounds.height / 2;

          const dx = x - cx;
          const dy = y - cy;

          this.position.target.x = cx + dx * 0.15;
          this.position.target.y = cy + dy * 0.15;
          if (!this.hoverEl.hasAttribute("data-magnet-btn-only")) {
            // this changes the size of cursor on hover:
            this.scale.target = Math.max(((window.innerWidth * 0.45) / 100), 5.1);
          }else {
            this.scale.target = 1;
          }
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const distance = Math.sqrt(dx * dx + dy * dy) * 0.01;

          gsap.set(this.el, { rotate: angle });
          gsap.to(this.el, {
            scaleX:
              this.scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
            scaleY:
              this.scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
            duration: 0.5,
            ease: "power4.out",
            overwrite: true,
          });
        } else {
          this.position.target.x = x;
          this.position.target.y = y;
          this.scale.target = 1;
        }
      }

      addListeners() {
        const hoverElements = document.querySelectorAll(
          "[data-hover], [data-magnet-btn-only]"
        );
        hoverElements.forEach((hoverEl) => {
          const hoverBoundsEl =
            hoverEl.querySelector("[data-hover-bounds]") || hoverEl;
          hoverBoundsEl.addEventListener("pointerover", () => {
            this.isHovered = true;
            this.hoverEl = hoverBoundsEl;
          });
          hoverBoundsEl.addEventListener("pointerout", () => {
            this.isHovered = false;
            this.hoverEl = null;
          });

          const xTo = gsap.quickTo(hoverEl, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });
          const yTo = gsap.quickTo(hoverEl, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });

          hoverEl.addEventListener("pointermove", (event) => {
            const { clientX: cx, clientY: cy } = event;
            const { height, width, left, top } =
              hoverEl.getBoundingClientRect();
            const x = cx - (left + width / 2);
            const y = cy - (top + height / 2);
            xTo(x * 0.2);
            yTo(y * 0.2);
          });

          hoverEl.addEventListener("pointerout", () => {
            xTo(0);
            yTo(0);
          });
        });
      }
    }

    // cursor for project-popup section && it also contains small-magnet-button functionality.
    const cursor = new Cursor(cursorRef.current);

    const handlePointerOver = (event) => {
      const hoverEl = event.target.closest("[data-hover]");
      if (hoverEl) {
        const hoverBoundsEl =
          hoverEl.querySelector("[data-hover-bounds]") || hoverEl;
        cursor.isHovered = true;
        cursor.hoverEl = hoverBoundsEl;
      }
    };

    const handlePointerOut = (event) => {
      const hoverEl = event.target.closest("[data-hover]");
      if (hoverEl) {
        cursor.isHovered = false;
        cursor.hoverEl = null;
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    const handleDelegatedPointerMove = (event) => {
      const hoverEl = event.target.closest("[data-hover] , [data-magnet-btn-only]");
      if (hoverEl && hoverEl.tagName === "A") {
        const { clientX: cx, clientY: cy } = event;
        const { height, width, left, top } = hoverEl.getBoundingClientRect();
        const x = cx - (left + width / 2);
        const y = cy - (top + height / 2);
        gsap.to(hoverEl, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const handleDelegatedPointerOut = (event) => {
      const hoverEl = event.target.closest("[data-hover] , [data-magnet-btn-only]");
      if (hoverEl && hoverEl.tagName === "A") {
        gsap.to(hoverEl, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    document.addEventListener("pointermove", handleDelegatedPointerMove);
    document.addEventListener("pointerout", handleDelegatedPointerOut);

    // "case-study" text inside the project section (appers on hover) ---------------------
    const animateProjectHoverCursorTxt = (x, y) => {
      gsap.to(projectParaRef.current, {
        x: x - 4,
        y: y - 15,
        opacity: 1,
        fontSize: "normal",
        duration: 0.48,
        ease: "power2.out",
      });
    };

    function update() {
      cursor.update();
    }

    function onMouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
      cursor.updateTargetPosition(x, y);
      animateProjectHoverCursorTxt(x, y);
    }

    gsap.ticker.add(update);
    window.addEventListener("pointermove", onMouseMove);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointermove", handleDelegatedPointerMove);
      document.removeEventListener("pointerout", handleDelegatedPointerOut);
    };
  }, []);
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <div ref={cursorRef} className="proj-cursor"></div>
      <p ref={projectParaRef} className="proj-cur-txt">
        case-study
      </p>
    </>
  );
};

export default CursorComponent;

// This code is messed-up but it just works ;)
