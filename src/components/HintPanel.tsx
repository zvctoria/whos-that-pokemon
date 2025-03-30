import { z } from "zod";
import { Pokemon, PokemonTypeSprite } from "../lib/schema/index";
import { useRef } from "react";
import { isIE, isSafari, isMobile } from "react-device-detect";

export const HintPanel = ({
  data,
  count,
  type1,
  type2,
  isAnswerRevealed,
  handleReset,
  handleAnswerRevealed,
}: {
  data: z.infer<typeof Pokemon> | undefined;
  count: number;
  type1: z.infer<typeof PokemonTypeSprite> | undefined;
  type2: z.infer<typeof PokemonTypeSprite> | undefined;
  isAnswerRevealed: boolean;
  handleReset: () => void;
  handleAnswerRevealed: () => void;
}) => {
  let weightUnlocked = false;
  let typeUnlocked = false;
  let spriteUnlocked = false;
  // let abilitiesUnlocked = false;

  const hintRef = useRef<HTMLDivElement | null>(null);

  const handleNewGame = () => {
    handleReset();
  };

  const scrollToHint = () => {
    hintRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  };

  if (count >= 1) {
    typeUnlocked = true;
  }

  if (count >= 2) {
    weightUnlocked = true;
  }

  if (count >= 3) {
    // abilitiesUnlocked = true;
    spriteUnlocked = true;
  }

  // if (count >= 4) {
  //   spriteUnlocked = true;
  // }

  const isCompatible = !isIE && !isSafari && !isMobile;

  const sprite = data?.sprites.front_default;

  return (
    <>
      {count > 0 ? (
        <h1
          onClick={scrollToHint}
          className="text-[2.5rem] text-[#fd6b70] font-bold leading-13 cursor-pointer w-[60%] mx-auto"
        >
          Hints unlocked!
        </h1>
      ) : (
        <h1
          onClick={scrollToHint}
          className="text-[2.5rem] font-bold leading-13 cursor-pointer w-[60%] mx-auto"
        >
          Need a hint?
        </h1>
      )}
      <h2 className="text-[1.3rem] leading-6.5 mb-4">
        Each incorrect guess will reveal helpful hints, like its type,
        abilities, and sprite!
      </h2>
      <hr className="my-6 w-40 mx-auto h-1 opacity-20" />
      {typeUnlocked ? (
        <div className="flex items-center justify-center mb-8">
          <h3 className="text-[1.75rem] font-bold pr-[2rem]">Type</h3>
          <img
            src={
              type1?.sprites["generation-vi"]["omega-ruby-alpha-sapphire"]
                .name_icon
            }
            alt="type sprite"
            className="w-[4rem] h-auto mr-[0.5rem]"
          />
          {type2 && (
            <img
              src={
                type2.sprites["generation-vi"]["omega-ruby-alpha-sapphire"]
                  .name_icon
              }
              alt="type sprite"
              className="w-[4rem] h-auto"
            />
          )}
        </div>
      ) : (
        <p className="text-[1.5rem]">
          Oh no! You haven't unlocked any hints yet.
        </p>
      )}
      {weightUnlocked && (
        <h3 className="text-[1.75rem] leading-7 mb-8">
          This Pokémon weighs <b>{data?.weight ? data.weight / 10 : "N/A"}</b>{" "}
          kilograms and is <b>{data?.height ? data.height / 10 : "N/A"}</b>{" "}
          metres tall.
        </h3>
      )}
      {spriteUnlocked && isCompatible && (
        <>
          <div className="flex items-center justify-center mb-3">
            <h3 className="text-[1.75rem] font-bold">Sprite</h3>
            <img
              src={sprite}
              alt="sprite"
              className="w-[10rem] h-auto brightness-0"
            />
          </div>
        </>
      )}
      {spriteUnlocked && (
        <>
          <hr className="my-6 w-40 mx-auto h-1 opacity-20" />
          <p className="text-[1.5rem]">
            No more hints available! Still confused?
          </p>
          <div className="flex justify-center gap-x-14 xl:gap-x-18 text-[1.5rem] mt-6 mb-12">
            <button
              className="cursor-pointer px-2 py-4 max-w-[20%] py-4 bg-[#fd6b70] rounded-xl"
              onClick={() => {
                handleAnswerRevealed();
                setTimeout(() => {
                  scrollToHint();
                }, 100);
              }}
            >
              Reveal Answer
            </button>
            <button
              className="cursor-pointer px-2 py-4 max-w-[20%] py-4 bg-[#fd6b70] rounded-xl"
              onClick={handleNewGame}
            >
              Try New Pokémon
            </button>
          </div>
          {isAnswerRevealed && (
            <div className="text-[1.15rem] font-[pokemon-gb] font-bold w-[14rem] mx-auto">
              <h3 className="">It's</h3>
              <img
                src={sprite}
                alt="sprite"
                className="w-[10rem] h-auto mx-auto"
              />
              <h3 className="first-letter:uppercase">{data?.name}!</h3>
            </div>
          )}
        </>
      )}
      <div ref={hintRef} className="mt-3 text-[#fafafa]">
        Who's That Pokémon Quiz?
      </div>
    </>
  );
};
