import { z } from "zod";
import { Pokemon } from "../lib/schema/index";

export const HintPanel = ({
  data,
}: {
  data: z.infer<typeof Pokemon> | undefined;
}) => {
  return (
    <>
      <div>Type () () </div>
      <div>
        This Pokémon weighs <p className="font-bold">number kg</p>
      </div>
      <div>
        <p>Not Helpful? MASTER BALL</p>
        <button>Hint: see what's inside</button>
      </div>
      <div>First appeared in: </div>
      <div>
        <h2>Can potentially have the following abilities:</h2>
        <div>
          <h3>Ability 1 (dynamic)</h3>
          <p>Description</p>
        </div>
      </div>
      <div>Sprite</div>
    </>
  );
};
