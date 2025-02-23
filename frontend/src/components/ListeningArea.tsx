import React from 'react';
import AudioPlayerComponent from './AudioPlayerComponent';
import StaticImageArea from './StaticImageArea';
import TimerComponent from './TimerComponent';

interface ListeningAreaProps {
  timeRemaining: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const ListeningArea: React.FC<ListeningAreaProps> = ({
  timeRemaining,
  isPlaying,
  onPlay,
  onPause
}) => {
  return (
    <div className="space-y-8">
      {/* Timer and Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <TimerComponent 
            time={timeRemaining}
            label="Listening Time Remaining"
            isWarning={false}
          />
          <p className="text-gray-600 font-medium">
            Listen to the lecture carefully. You will need this information to write your response.
          </p>
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <AudioPlayerComponent
          onPlay={onPlay}
          onPause={onPause}
          isPlaying={isPlaying}
        />
      </div>

      {/* Static Image */}
      <div className="bg-white rounded-lg shadow-md">
        <StaticImageArea />
      </div>

      {/* Status Message */}
      <div className="text-center">
        <p className={`text-lg ${isPlaying ? 'text-teal-600 font-semibold' : 'text-gray-500'}`}>
          {isPlaying 
            ? "Lecture is playing. Please listen carefully."
            : "Click Play to start the lecture."}
        </p>
      </div>
    </div>
  );
};

export default ListeningArea; 