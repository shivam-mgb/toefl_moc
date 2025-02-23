import React from 'react';
import TimerComponent from './TimerComponent';
import ReadingPassageArea from './ReadingPassageArea';

interface WritingReadingPhaseProps {
  passageTitle: string;
  passageText: string;
  onSkip: () => void;
}

const WritingReadingPhase: React.FC<WritingReadingPhaseProps> = ({
  passageTitle,
  passageText,
  onSkip
}) => {
  return (
    <div className="space-y-8">
      {/* Timer and Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-8">
            <TimerComponent 
              time="03:00" 
              label="Reading Time Remaining"
              isWarning={false}
            />
            <button
              onClick={onSkip}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800
                       underline decoration-dashed
                       focus:outline-none focus:text-gray-800"
            >
              Skip to Listening Phase
            </button>
          </div>
          <p className="text-gray-600 font-medium">
            Read the passage carefully. You will use this information later.
            Once you proceed, you cannot return to this passage.
          </p>
        </div>
      </div>

      {/* Reading Passage */}
      <div className="h-[calc(100vh-24rem)] bg-white rounded-lg shadow-md overflow-hidden">
        <ReadingPassageArea
          passageTitle={passageTitle}
          passageText={passageText}
        />
      </div>
    </div>
  );
};

export default WritingReadingPhase; 