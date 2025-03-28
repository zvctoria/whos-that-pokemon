import { z } from "zod";
import { Pokemon } from "../lib/schema/index";
import { useRef } from "react";
import { isIE, isSafari } from "react-device-detect";

export const HintPanel = ({
  data,
  count,
}: {
  data: z.infer<typeof Pokemon> | undefined;
  count: number;
}) => {
  let weightUnlocked = false;
  let typeUnlocked = false;
  let spriteUnlocked = false;
  let abilitiesUnlocked = false;

  const hintRef = useRef<HTMLDivElement | null>(null);

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
    abilitiesUnlocked = true;
  }

  if (count >= 4) {
    spriteUnlocked = true;
  }

  const isCompatible = !isIE && !isSafari;

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
        <div className="flex items-center justify-center mb-1">
          <h3 className="text-[1.75rem] font-bold pr-2rem">Type</h3>
          <img
            src={data?.sprites.front_default}
            alt="sprite"
            className="w-[10rem] h-auto"
          />
          <img
            src={data?.sprites.front_default}
            alt="sprite"
            className="w-[10rem] h-auto"
          />
        </div>
      ) : (
        <p className="text-[1.5rem]">
          Oh no! You haven't unlocked any hints yet.
        </p>
      )}
      {weightUnlocked && (
        <>
          <h3 className="text-[1.75rem]">
            This Pokémon weighs <b>{data?.weight ? data.weight / 10 : "N/A"}</b>{" "}
            kilograms and is <b>{data?.height ? data.height / 10 : "N/A"}</b>{" "}
            metres tall.
          </h3>
        </>
      )}
      {abilitiesUnlocked && <div>ability hint</div>}
      {spriteUnlocked && isCompatible ? (
        <>
          <div className="flex items-center justify-center mb-1">
            <h3 className="text-[1.75rem] font-bold">Sprite</h3>
            <img
              src={data?.sprites.front_default}
              alt="sprite"
              className="w-[10rem] h-auto brightness-0"
            />
          </div>
          <p className="text-[1.5rem]">No more hints available!</p>
        </>
      ) : !isCompatible ? (
        <p className="text-[1.5rem]">No more hints available!</p>
      ) : null}
      <div ref={hintRef} className="mt-3 text-[#fafafa]">
        Victoria Zhao
      </div>
    </>
  );
};
