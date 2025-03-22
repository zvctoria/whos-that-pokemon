import "./ReplayButton.css";
import { useState } from "react";

export const ReplayButton = () => {
  const [isPlaying, setPlaying] = useState(false);

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  return (
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
  );
};
