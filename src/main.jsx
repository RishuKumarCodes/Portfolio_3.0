import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import "./components/Preloader.js";
import ReactDOM from "react-dom/client";
import App from "./App";

gsap.registerPlugin(ScrollTrigger, CustomEase);
window.gsap = gsap;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
