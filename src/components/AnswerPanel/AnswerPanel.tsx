import "./AnswerPanel.css";
import arrow from "../../assets/next.png";
import { z } from "zod";
import { PokemonList } from "../../lib/schema/index";
import { useState, useEffect } from "react";

export const AnswerPanel = ({
  pokemonList,
  answer,
  handleReset,
}: {
  pokemonList: z.infer<typeof PokemonList> | undefined;
  answer: string;
  handleReset: () => void;
}) => {
  // NOTE: browser + img tag will automatically cache sprite images,
  // not to mention HTTP 2/3 supports multiplexing. Therefore, the performance
  // hit from constant image calls is likely to be negligible.
  const [dropdown, setDropdown] = useState([]);
  const [guess, setGuess] = useState("");
  const [isWon, setWon] = useState(false);

  const checkCorrectGuess = () => {
    if (guess.toLowerCase() === answer.toLowerCase()) {
      setWon(true);
    }
  };

  const handleSubmit = (event: any) => {
    // stop refresh
    event.preventDefault();
    checkCorrectGuess();
  };

  const newGame = () => {
    setWon(false);
    setGuess("");
    handleReset();
  };

  return (
    <div
      id="dialog-box"
      className="text-[1.5rem] w-[95%] mx-auto font-['pokemon-gb',sans-serif] text-black bg-white border-3 border-white pt-[1.1rem] pb-[0.5rem] px-[1rem]"
    >
      {isWon ? (
        <div id="won" className="text-[1rem] sm:text-[1.5rem]">
          <p className="mb-1">CONGRATULATIONS!</p>
          <button
            className="flex ml-[0.5rem] cursor-pointer animate-pulse"
            onClick={newGame}
          >
            <img
              className="w-5 h-5 mt-2 mr-1"
              src={arrow}
              alt="Next arrow for dialog box"
            />
            <span className="leading-11">NEW GAME</span>
          </button>
        </div>
      ) : (
        <div id="not-won">
          <p className="mb-0.75">A wild</p>
          <form onSubmit={handleSubmit}>
            <input
              id="answer-form"
              type="text"
              className="pt-1.5 bg-white h-[2rem] mb-2 w-[90%] sm:w-[60%] lg:w-[50%] rounded focus:outline-none border-dotted border-b-3 border-b-stone-500"
              placeholder="Charizard"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </form>
          <div id="last-line-container" className="flex justify-between">
            <p>appeared!</p>
            <img
              className="w-5 h-5 rotate-90 mt-2 mr-1"
              src={arrow}
              alt="Next arrow for dialog box"
            />
          </div>
        </div>
      )}
    </div>
  );
};
