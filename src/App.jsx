import "./index.css";
import SiteBorder from "./components/SiteBorder.jsx";
import Hero from "./pageSections/Hero.jsx";
import About from "./pageSections/About.jsx";
import CursorComponent from "./components/CursorComponent";
import LenisScroll from "./components/LenisScroll.jsx";
import Skills from "./pageSections/Skills.jsx";

function App() {
  return (
    <>
      <CursorComponent />
      <SiteBorder>
        <LenisScroll>
          <Hero />
          <About />
          <Skills/>
        </LenisScroll>
      </SiteBorder>
    </>
  );
}

export default App;
