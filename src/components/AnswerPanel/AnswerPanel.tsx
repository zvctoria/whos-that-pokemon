import "./AnswerPanel.css";
import arrow from "../../assets/next.png";
import { z } from "zod";
import { PokemonList } from "../../lib/schema/index";
import { useState } from "react";

export const AnswerPanel = ({
  pokemonList,
  answer,
  dropdown,
  guess,
  isWon,
  handleWon,
  handleGuess,
  handleReset,
  handleDropdown,
  handleIncorrect,
  handleReverse,
  handleIncreaseCount,
}: {
  pokemonList: z.infer<typeof PokemonList> | undefined;
  answer: string;
  dropdown: { name: string; url: string }[];
  guess: string;
  isWon: boolean;
  handleWon: () => void;
  handleGuess: (newGuess: string) => void;
  handleReset: () => void;
  handleDropdown: (newDropdown: { name: string; url: string }[]) => void;
  handleIncorrect: () => void;
  handleReverse: () => void;
  handleIncreaseCount: () => void;
}) => {
  // NOTE: browser + img tag will automatically cache sprite images,
  // not to mention HTTP 2/3 supports multiplexing. Therefore, the performance
  // hit from constant image calls is likely to be negligible.
  const [isInputFocused, setInputFocused] = useState(false);

  // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component/44378829#44378829
  const handleBlur = (e: any) => {
    // if we are blurring the form somehow, but not clicking the dropdown
    // then remove the dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setInputFocused(false);
    }
  };

  // should be called both when submitting via. enter key or pressing an option
  const checkCorrectGuess = (userGuess: string) => {
    // userGuess variable required since async
    if (userGuess.toLowerCase() === answer.toLowerCase()) {
      handleWon();
    } else {
      handleIncorrect();
      handleDropdown([]);

      setTimeout(() => {
        handleReverse();
        handleIncreaseCount();
        handleGuess("");
      }, 700);
    }
  };

  // TODO: event type
  const handleSubmit = (event: any) => {
    // stop refresh
    event.preventDefault();
    // capitals only for look purposes
    if (guess.length > 0 && guess !== "") {
      handleGuess(capitaliseFirst(guess));
    }
    checkCorrectGuess(guess);
  };

  // component rerenders if 'answer' is changed, but state variables still persists
  // so need to lift state up

  const generateOptions = (e: any) => {
    // add variable just in case, since setState is async
    let input = e.target.value;
    handleGuess(input);
    // keyboard input will now match, but we want comparisons done on lowercase
    input = input.toLowerCase();

    // if I generate options based on a single letter, likely too many HTTP calls
    // PokeAPI results should all be in lowercase already
    if (input.length >= 1 && pokemonList) {
      const matching = pokemonList.results.filter((pokemon) =>
        pokemon.name.startsWith(input)
      );
      // 3 autocomplete choices
      // PROS: keeps everything on the page, makes choices more specific, faster and less expensive sprite loading
      // CONS: perhaps narrows choices too much
      const firstMatches = matching.slice(0, 3);
      // now, will show up in our list. Note: use div/buttons here for maximum customisability
      // compared to select, ul/li, datalist, etc.
      // TODO: in case links ever change, doing another API call to find front_default urls are ideal
      // however, based on current PokeAPI assumptions, url is always the same
      handleDropdown(firstMatches);
    } else {
      handleDropdown([]);
    }
  };

  // This function also triggers upon 'enter', due to button type,
  // for ease and convenience.
  const handleSelect = (choice: string) => {
    handleGuess(capitaliseFirst(choice));
    checkCorrectGuess(choice);
  };

  function capitaliseFirst(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

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
            onClick={handleReset}
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
          <form onSubmit={handleSubmit} autoComplete="off" onBlur={handleBlur}>
            <input
              id="answer-form"
              type="text"
              className="pt-1.5 bg-white h-[2rem] w-[90%] sm:w-[60%] lg:w-[50%] rounded focus:outline-none border-dotted border-b-3 border-b-stone-500"
              placeholder="Charizard"
              value={guess}
              onChange={generateOptions}
              onFocus={() => setInputFocused(true)}
            />
            {dropdown.length > 0 && isInputFocused && (
              <div
                id="dropdown-container"
                className="absolute bg-white flex flex-col bg-red border-dotted border-x-3 border-b-3 border-b-stone-500"
              >
                {dropdown.map((option, index) => {
                  const match = option.url.match(/(\d+)\/$/);
                  // capture group is index [1]
                  const optionId = match ? match[1] : "";

                  return (
                    <div key={index}>
                      <button
                        type="submit"
                        onClick={() => handleSelect(option.name)}
                        className="flex hover:bg-stone-200 focus:bg-stone-200 pr-[5rem] w-[100%] py-1 cursor-pointer outline-hidden"
                      >
                        <img
                          src={
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                            optionId +
                            ".png"
                          }
                          alt={`sprite for ${option.name}`}
                          className="text-[0.5rem] w-[50px] h-[50px] mx-[1rem]"
                        />
                        <span className="text-left my-auto text-[1rem] first-letter:uppercase">
                          {option.name}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
          <div id="last-line-container" className="flex justify-between">
            <p className="mt-1.5">appeared!</p>
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
