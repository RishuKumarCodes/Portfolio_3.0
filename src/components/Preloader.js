// NOTE : I MOVED THE PRELOADER HTML CSS TO INDEX.HTML SO IT LOADS QUICKLY.
import gsap from 'gsap'; 

let preloaderAnimationStarted = false;

// Underline for "code"
function underlineCode() {
  const container = document.getElementById("line1");
  const letters = container.querySelectorAll('.letter');
  const firstLetter = letters[10],
    lastLetter = letters[13];
  const containerRect = container.getBoundingClientRect();
  const firstRect = firstLetter.getBoundingClientRect();
  const lastRect = lastLetter.getBoundingClientRect();
  const leftPos = firstRect.left - containerRect.left;
  const width = lastRect.right - firstRect.left;

  // Underline element
  const underline = document.createElement("div");
  underline.style.position = "absolute";
  underline.style.height = "2px";
  underline.style.background = "#962626";
  underline.style.bottom = "2px";
  underline.style.left = leftPos + "px";
  underline.style.width = "0px";
  container.appendChild(underline);

  // Animation
  const tlUnderline = gsap.timeline({ onComplete: () => underline.remove() });
  tlUnderline.to(underline, {
    duration: 0.4,
    width: width,
    ease: "power2.out"
  })
  .to(underline, {
    duration: 0.4,
    left: leftPos + width + "px",
    width: 0,
    ease: "power2.in",
    delay: 2
  });
}

// Underline for "creativity"
function underlineCreativity() {
  const container = document.getElementById("line2");
  const letters = container.querySelectorAll('.letter');
  const firstLetter = letters[12],
    lastLetter = letters[21];
  const containerRect = container.getBoundingClientRect();
  const firstRect = firstLetter.getBoundingClientRect();
  const lastRect = lastLetter.getBoundingClientRect();
  const leftPos = firstRect.left - containerRect.left;
  const width = lastRect.right - firstRect.left;

  // Underline element
  const underline = document.createElement("div");
  underline.style.position = "absolute";
  underline.style.height = "2px";
  underline.style.background = "#962626";
  underline.style.bottom = "2px";
  underline.style.left = leftPos + "px";
  underline.style.width = "0px";
  container.appendChild(underline);

  // Animation
  const tlUnderline = gsap.timeline({ onComplete: () => underline.remove() });
  tlUnderline.to(underline, {
    duration: 0.4,
    width: width,
    ease: "power2.out"
  })
  .to(underline, {
    duration: 0.4,
    left: leftPos + width + "px",
    width: 0,
    ease: "power2.in",
    delay: 0.28
  });
}

function startPreloaderAnimation() {
  if (preloaderAnimationStarted) return;
  preloaderAnimationStarted = true;

  const line1Letters = document.querySelectorAll('#line1 .letter');
  const line2Letters = document.querySelectorAll('#line2 .letter');
  const allLetters = document.querySelectorAll('.letter');
  const preloader = document.getElementById("preloader");

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to("#preloader", {
        onComplete: () => {
          preloader.style.display = "none";
        }
      });
    }
  });

  // Animate first line in: slide in, unskew, clear blur
  tl.to(line1Letters, {
    x: "0%",
    skewX: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 0.6,
    ease: "back.out",
    stagger: 0.03,
  })
    // After first line is fully in, underline the "code" word
    .call(underlineCode)
    // Wait for the underline animation to complete
    .to({}, { duration: 0.6 })
    // Animate second line in
    .to(line2Letters, {
      x: "0%",
      skewX: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.3,
      ease: "back.out",
      stagger: 0.03,
    })
    // Underline the "creativity" word in second line
    .call(underlineCreativity)
    .to({}, { duration: 1 })
    // Animate exit for all letters together
    .to(allLetters, {
      x: "150%",
      skewX: -5,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.02,
      delay: -0.4
    })
    .to(preloader, {
      opacity: 0,
      duration: 0.8,
      delay: -0.4,
      ease: "power1.inOut",
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startPreloaderAnimation);
} else {
  startPreloaderAnimation();
}

setTimeout(startPreloaderAnimation, 3000);
