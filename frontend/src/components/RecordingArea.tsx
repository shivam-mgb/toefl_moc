import React from 'react';
import TimerComponent from './TimerComponent';

interface RecordingAreaProps {
  isRecording?: boolean;
  hasRecording?: boolean;
}

const RecordingArea: React.FC<RecordingAreaProps> = ({
  isRecording = false,
  hasRecording = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center space-y-6">
        {/* Recording Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
          }`} />
          <span className="text-gray-700">
            {isRecording ? 'Recording in progress' : 'Not Recording'}
          </span>
        </div>

        {/* Timer */}
        <TimerComponent 
          time="00:45" 
          label="Recording Time"
          isWarning={isRecording}
        />

        {/* Playback Button */}
        {hasRecording && (
          <button
            className="px-4 py-2 bg-gray-100 text-gray-700
                     rounded-md border border-gray-200
                     hover:bg-gray-200 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                     flex items-center space-x-2"
            onClick={() => console.log('playback')}
          >
            <PlayIcon />
            <span>Playback Recording</span>
          </button>
        )}
      </div>
    </div>
  );
};

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
  </svg>
);

export default RecordingArea; 