import "./ReplayButton.css";
import { useState } from "react";
import ReactHowler from "react-howler";

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

  const togglePause = () => {
    setPlaying((isPlaying) => !isPlaying);
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
          onClick={togglePause}
          disabled={isLoading || !url}
        >
          {isPlaying ? (
            <span id="pixel-pause"></span>
          ) : (
            <span id="pixel-play"></span>
          )}
        </button>
      </div>
      {url && (
        <ReactHowler
          src={url}
          playing={isPlaying}
          preload={true}
          onEnd={() => setPlaying(false)}
        />
      )}
    </>
  );
};
