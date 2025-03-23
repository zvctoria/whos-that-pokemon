import "./AnswerPanel.css";
import arrow from "../../assets/next.png";

export const AnswerPanel = () => {
  return (
    <div
      id="dialog-box"
      className="text-[1.5rem] w-[95%] mx-auto font-['pokemon-gb',sans-serif] text-black bg-white border-3 border-white pt-[1.1rem] pb-[0.5rem] px-[1rem]"
    >
      <p className="mb-0.75">A wild</p>
      <input
        id="answer-form"
        type="text"
        className="pt-1.5 bg-white h-[2rem] mb-2 w-100 rounded focus:outline-none border-dotted border-b-3 border-b-stone-500"
        placeholder="Charizard"
      />
      <div id="last-line-container" className="flex justify-between">
        <p>appeared!</p>
        <img
          className="w-5 h-5 rotate-90 mt-2 mr-1"
          src={arrow}
          alt="Next arrow for dialog box"
        />
      </div>
    </div>
  );
};
