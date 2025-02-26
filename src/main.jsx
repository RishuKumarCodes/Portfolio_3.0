import ReactDOM from "react-dom/client";
import App from "./App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
window.gsap = gsap;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
