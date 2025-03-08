import ReactDOM from "react-dom";
import { CTAbtn } from "../components/MagneticButton";

function ProjectPopup({ selectedProject, closePopup }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-0 left-0 bg-black/50 h-full w-full z-100 rounded-(--brad)">
      <button
        onClick={closePopup}
        className="absolute right-0 bg-white text-nowrap cursor-pointer h-[70px] w-[100px] rounded-full"
      >
        Close
      </button>
      <div className="absolute bottom-0 left-0 bg-(--bg) h-[calc(100vh-60px)] w-full z-100 rounded-(--brad) overflow-y-scroll">
        <header className="flex m-[10%] justify-between">
          <h2 className="text-[6.6vw] uppercase">{selectedProject?.name}</h2>
          <CTAbtn>Visit</CTAbtn>
        </header>
        <figure className="mx-[10%]">
          <img
            src="/device-mbp-15-nonotch.png"
            alt="image cannot load unfortunately"
          />
        </figure>
        <article className="mx-[10%] my-20 text-[1.6rem]">
          <p>{selectedProject?.description}</p>
        </article>
      </div>
    </div>,
    document.body
  );
}

export default ProjectPopup;
