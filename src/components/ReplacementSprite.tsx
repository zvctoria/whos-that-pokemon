import { z } from "zod";
import { Pokemon } from "../lib/schema/index";
import spinner from "../assets/90-ring-with-bg.svg";
// for the 'x' styling
import "../components/ReplayButton/ReplayButton.css";

export const ReplacementSprite = ({
  data,
  isLoading,
  isIncorrect,
}: {
  data: z.infer<typeof Pokemon> | undefined;
  isLoading: boolean;
  isIncorrect: boolean;
}) => {
  return (
    <div className="flex mt-7 mb-8 w-[13rem] h-[13rem] mx-auto">
      {isLoading ? (
        <span className="text-center align-middle">
          <img src={spinner} alt="spinner" className="w-[13rem] h-[13rem]" />
        </span>
      ) : isIncorrect ? (
        <span className="pixel-x"></span>
      ) : (
        <span>
          <img
            src={data?.sprites.front_default}
            alt="sprite"
            className="mx-auto w-[13rem] h-[13rem] h-auto brightness-0"
          />
        </span>
      )}
    </div>
  );
};
