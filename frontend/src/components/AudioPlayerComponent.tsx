import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
  onEnded: () => void; // Added onEnded callback
}

const AudioPlayerComponent: React.FC<AudioPlayerProps> = ({
  audioSrc,
  onPlay,
  onPause,
  isPlaying,
  onEnded, // Using onEnded callback
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (onEnded) {
        onEnded(); // Call the onEnded callback
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded); // Add ended event listener

      if (isPlaying) {
        audio.play().catch(err => console.error("Error playing audio:", err));
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded); // Remove ended listener
      }
    };
  }, [isPlaying, audioSrc, onEnded]); // onEnded added to dependencies

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col space-y-4">
        {/* Audio Element */}
        {/* must change on production to environment variable */}
        <audio ref={audioRef} src={'http://127.0.0.1:5000/files' + audioSrc} />

        {/* Play/Pause and Volume Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="w-12 h-12 flex items-center justify-center
                     bg-teal-600 text-white rounded-full
                     hover:bg-teal-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <VolumeIcon />
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="w-3/4 h-full bg-teal-500 rounded-full" /> {/* Placeholder volume */}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-200"
              style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// SVG Icons
const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V3.75A.75.75 0 008.25 3h-2.5zM11.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-2.5z" />
  </svg>
);

const VolumeIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
  </svg>
);

export default AudioPlayerComponent;