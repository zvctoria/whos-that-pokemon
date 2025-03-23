import { z } from "zod";
import { Pokemon } from "../lib/schema/index";

export const HintPanel = ({
  data,
}: {
  data: z.infer<typeof Pokemon> | undefined;
}) => {
  return (
    <>
      <h1>Need a hint?</h1>
      <h2>
        Each incorrect guess will reveal helpful hints, like type, abilities,
        and its sprite!
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
