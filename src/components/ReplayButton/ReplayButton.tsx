import "./ReplayButton.css";
import { useState } from "react";
import { Howl, Howler } from "howler";

export const ReplayButton = ({
  url,
  isLoading,
  error,
}: {
  url: string | undefined;
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
          disabled={isLoading || !url}
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
