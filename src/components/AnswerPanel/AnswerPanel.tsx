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
  const [dropdown, setDropdown] = useState<{ name: string; url: string }[]>([]);
  const [guess, setGuess] = useState("");
  const [isWon, setWon] = useState(false);

  const checkCorrectGuess = () => {
    if (guess.toLowerCase() === answer.toLowerCase()) {
      setWon(true);
    }
    // else: handle incorrect case
    // this function should be called on enter-submit and on pressing an option
  };

  // TODO: event type
  const handleSubmit = (event: any) => {
    // stop refresh
    event.preventDefault();
    checkCorrectGuess();
  };

  // component rerenders if 'answer' is changed, but state variables still persists
  const newGame = () => {
    setWon(false);
    setGuess("");
    handleReset();
  };

  const generateOptions = (e: any) => {
    // add variable just in case, since setState is async
    const input = e.target.value;
    setGuess(input);

    // if I generate options based on a single letter, likely too many HTTP calls
    // PokeAPI results should all be in lowercase already
    if (input.length >= 2 && pokemonList) {
      const matching = pokemonList.results.filter((pokemon) =>
        pokemon.name.startsWith(input)
      );
      const firstMatches = matching.slice(0, 5);
      // now, will show up in our list. Note: use div/buttons here for maximum customisability
      // compared to select, ul/li, datalist, etc.
      // TODO: in case links ever change, doing another API call to find front_default urls are ideal
      // however, based on current PokeAPI assumptions, url is always the same
      setDropdown(firstMatches);
    } else {
      setDropdown([]);
    }
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
              onChange={generateOptions}
            />
          </form>
          <div
            id="dropdown-container"
            className="w-[70%] flex flex-col bg-red cursor-pointer border-dotted border-3 border-b-stone-500"
          >
            {dropdown.map((option) => {
              const match = option.url.match(/(\d+)\/$/);
              const optionId = match ? match[1] : "";

              return (
                <div className="flex hover:bg-stone-500">
                  <img
                    src={
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      optionId +
                      ".png"
                    }
                    alt={`sprite for ${option.name}`}
                    className="text-[0.5rem]"
                  />
                  <button key={option.name} className="text-left text-[1rem]">
                    {option.name}
                  </button>
                </div>
              );
            })}
          </div>
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
