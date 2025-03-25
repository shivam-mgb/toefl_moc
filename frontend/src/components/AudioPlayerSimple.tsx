import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayerSimple: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercentage = 
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercentage);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <audio 
        ref={audioRef} 
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-gray-700" />
          ) : (
            <Play className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-gray-700" />
          ) : (
            <Volume2 className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayerSimple;