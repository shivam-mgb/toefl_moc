import React, { useRef, useEffect } from 'react';
import AudioPlayerComponent from './AudioPlayerComponent';
import StaticImageArea from './StaticImageArea';
import TimerComponent from './TimerComponent';
import { ListeningAreaProps } from '../types/writing';


const ListeningArea: React.FC<ListeningAreaProps> = ({ audioUrl, timeRemaining, isPlaying, onPlay, onPause, onAudioEnd }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', onAudioEnd);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onAudioEnd);
      }
    };
  }, [onAudioEnd]);

  return (
    <div className="space-y-8">
      {/* Timer and Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* <TimerComponent time={timeRemaining} label="Listening Time Remaining" isWarning={false} /> */}
          <p className="text-gray-600 font-medium">Listen to the lecture carefully. You will need this information to write your response.</p>
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <AudioPlayerComponent audioSrc={audioUrl} onPlay={onPlay} onPause={onPause} isPlaying={isPlaying} onEnded={onAudioEnd} />
      </div>

      {/* Static Image */}
      <div className="bg-white rounded-lg shadow-md">
        <StaticImageArea />
      </div>

      {/* Status Message */}
      <div className="text-center">
        <p className={`text-lg ${isPlaying ? 'text-teal-600 font-semibold' : 'text-gray-500'}`}>
          {isPlaying ? 'Lecture is playing. Please listen carefully.' : 'Click Play to start the lecture.'}
        </p>
      </div>
    </div>
  );
};

export default ListeningArea;
