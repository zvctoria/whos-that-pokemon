import "./ReplayButton.css";
import { useState } from "react";
import ReactPlayer from "react-player";

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
        <ReactPlayer
          url={url}
          playing={isPlaying}
          controls={false}
          volume={0.5}
          width={0}
          height={0}
          type="audio/ogg"
          config={{
            file: {
              forceAudio: true,
            },
          }}
          onEnded={() => setPlaying(false)}
        />
      )}
    </>
  );
};
