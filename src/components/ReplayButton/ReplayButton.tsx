import "./ReplayButton.css";
import { useState } from "react";
import ReactPlayer from "react-player";
import spinner from "../../assets/90-ring-with-bg.svg";

export const ReplayButton = ({
  url,
  isLoading,
  error,
  isIncorrect,
}: {
  url: string | undefined;
  isLoading: boolean;
  error: Error | null;
  isIncorrect: boolean;
}) => {
  const [isPlaying, setPlaying] = useState(false);

  const togglePause = () => {
    setPlaying((isPlaying) => !isPlaying);
  };

  return (
    <>
      {error &&
        "Seems like we couldn't load your Pokémon! Please check back later."}
      <div className="flex justify-center mt-7 mb-8">
        <button
          id="play-button"
          className="bg-white-600 cursor-pointer flex"
          onClick={togglePause}
          disabled={isLoading || !url}
        >
          {isLoading ? (
            <span className="text-center align-middle">
              <img
                src={spinner}
                alt="spinner"
                className="w-[15rem] h-[15rem]"
              />
            </span>
          ) : isIncorrect ? (
            <span className="pixel-x"></span>
          ) : isPlaying ? (
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
          volume={0.3}
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
