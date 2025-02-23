import React from 'react';
import AudioPlayerComponent from './AudioPlayerComponent';

interface TaskPromptAreaProps {
  promptText: string;
}

const TaskPromptArea: React.FC<TaskPromptAreaProps> = ({
  promptText
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Task 1: Independent Speaking
        </h2>
      </div>

      {/* Audio Player */}
      <div>
        <AudioPlayerComponent
          onPlay={() => console.log('play')}
          onPause={() => console.log('pause')}
          isPlaying={false}
        />
      </div>

      {/* Prompt Text */}
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed">
          {promptText}
        </p>
      </div>
    </div>
  );
};

export default TaskPromptArea; 