import { z } from "zod";
import { Pokemon } from "../lib/schema/index";
import { useRef, useState } from "react";

export const HintPanel = ({
  data,
}: {
  data: z.infer<typeof Pokemon> | undefined;
}) => {
  const [typeUnlocked, setTypeUnlocked] = useState(false);

  const hintRef = useRef(null);

  const scrollToHint = () => {
    hintRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  };

  return (
    <>
      <h1
        onClick={scrollToHint}
        className="text-[2.5rem] font-bold leading-13 cursor-pointer"
      >
        Need a hint?
      </h1>
      <h2 className="text-[1.3rem] leading-6.5 mb-6">
        Each incorrect guess will reveal helpful hints, like its type,
        abilities, and sprite!
      </h2>
      <hr className="mb-4 w-40 mx-auto h-1 opacity-20" />
      {typeUnlocked ? (
        <div ref={hintRef} className="hidden">
          Type () (){" "}
        </div>
      ) : (
        <p ref={hintRef} className="text-[1.5rem]">
          Oh no! You haven't unlocked any hints yet.
        </p>
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
      <div className="hidden">Sprite</div>
    </>
  );
};
