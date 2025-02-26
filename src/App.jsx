import "./index.css";
import SiteBorder from "./components/SiteBorder.jsx";
import Hero from "./pageSections/Hero.jsx";
import About from "./pageSections/About.jsx";
import CursorComponent from "./components/CursorComponent";
import LenisScroll from "./components/LenisScroll.jsx";

function App() {
  return (
    <>
      <CursorComponent />
      <SiteBorder>
        <LenisScroll>
          <Hero />
          <About />
        </LenisScroll>
      </SiteBorder>
    </>
  );
}

export default App;
