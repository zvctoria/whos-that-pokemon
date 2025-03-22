import "./ReplayButton.css";
import { useState } from "react";
import { z } from "zod";
import { Pokemon } from "../../lib/schema/index";

export const ReplayButton = ({
  data,
  isLoading,
  error,
}: {
  data: z.infer<typeof Pokemon> | undefined;
  isLoading: boolean;
  error: Error | null;
}) => {
  const [isPlaying, setPlaying] = useState(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  return (
    <>
      {isLoading && "Currently loading your Pokémon!"}
      {error &&
        "Seems like we couldn't load your Pokémon! Please check back later."}
      <div className="flex justify-center my-8">
        <button
          id="play-button"
          className="bg-white-600 cursor-pointer flex"
          onClick={isPlaying ? pauseSound : playSound}
        >
          {isPlaying ? (
            <span id="pixel-pause"></span>
          ) : (
            <span id="pixel-play"></span>
          )}
        </button>
      </div>
    </>
  );
};
