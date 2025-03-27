import { z } from "zod";
import { Pokemon } from "../lib/schema/index";
import { useRef, useState } from "react";
import { isIE, isSafari } from "react-device-detect";

export const HintPanel = ({
  data,
  count,
}: {
  data: z.infer<typeof Pokemon> | undefined;
  count: number;
}) => {
  let spriteUnlocked = false;
  let typeUnlocked = false;

  const hintRef = useRef<HTMLDivElement | null>(null);

  const scrollToHint = () => {
    hintRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  };

  if (count >= 1) {
    spriteUnlocked = true;
  }

  if (count >= 2) {
    typeUnlocked = true;
  }

  const isCompatible = !(isIE || isSafari);

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
      {spriteUnlocked && isCompatible ? (
        <div className="flex items-center justify-center">
          <h3 className="text-[1.75rem] font-bold">Sprite</h3>
          <img
            src={data?.sprites.front_default}
            alt="sprite"
            className="w-[10rem] h-auto brightness-0"
          />
        </div>
      ) : !isCompatible ? (
        <p className="text-[1.5rem]">
          No hints implemented yet for your browser!
        </p>
      ) : (
        <p className="text-[1.5rem]">
          Oh no! You haven't unlocked any hints yet.
        </p>
      )}
      {typeUnlocked && isCompatible && (
        <div className="text-[1.5rem]">Other hints not implemented yet!</div>
      )}
      <div className="hidden">
        This Pokémon weighs <p className="font-bold">number kg</p>
      </div>
      <div className="hidden">
        <p>Not Helpful? MASTER BALL</p>
        <button>Hint: see what's inside (comparison)</button>
      </div>
      <div className="hidden">First appeared in: </div>
      <div className="hidden">
        <h2>Can potentially have the following abilities:</h2>
        <div>
          <h3>Ability 1 (dynamic)</h3>
          <p>Description</p>
        </div>
      </div>
      <div className="hidden">Sprite {data?.name}</div>
      <div ref={hintRef} className="mt-3 text-[#fafafa]">
        Victoria Zhao
      </div>
    </>
  );
};
