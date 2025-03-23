import { z } from "zod";
import { Pokemon } from "../lib/schema/index";

export const HintPanel = ({
  data,
}: {
  data: z.infer<typeof Pokemon> | undefined;
}) => {
  return (
    <>
      <h1 className="text-[2.5rem] font-bold font-[pixel-operator,sans-serif] leading-13 cursor-pointer">
        Need a hint?
      </h1>
      <h2 className="text-[1.3rem] font-[pixel-operator,sans-serif] leading-6.5">
        Each incorrect guess will reveal helpful hints, like its type,
        abilities, and sprite!
      </h2>
      <div className="hidden">Type () () </div>
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
