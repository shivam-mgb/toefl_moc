import React, { useEffect } from 'react';
import ReadingPassageArea from './ReadingPassageArea';
import TextEditorArea from './TextEditorArea';
import TimerComponent from './TimerComponent';

interface WritingPhaseAreaProps {
  passageTitle: string;
  passageText: string;
  essayText: string;
  onEssayChange: (text: string) => void;
  timeRemaining: number;
  onTimeout: () => void; // Add onTimeout callback prop
}

const WritingPhaseArea: React.FC<WritingPhaseAreaProps> = ({
  passageTitle,
  passageText,
  essayText,
  onEssayChange,
  timeRemaining,
  onTimeout,
}) => {

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeout(); // Call the callback when time runs out
    }
  }, [timeRemaining, onTimeout]);


  return (
    <div className="space-y-6 h-full">
      {/* Timer and Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <TimerComponent 
            time={timeRemaining}
            label="Writing Time Remaining"
            isWarning={false}
          />
          <p className="text-gray-600 font-medium">
            Write your response based on the reading passage and the lecture.
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-24rem)]">
        {/* Left Column - Reading Passage */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ReadingPassageArea
            passageTitle={passageTitle}
            passageText={passageText}
          />
        </div>

        {/* Right Column - Writing Area */}
        <div className="flex flex-col space-y-6 h-full">
          {/* Task Prompt */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Writing Task
            </h2>
            <p className="text-gray-700">
              Summarize the points made in the lecture, explaining how they cast doubt on points made in the reading passage.
            </p>
          </div>

          {/* Text Editor - Now takes remaining height */}
          <div className="bg-white rounded-lg shadow-md p-6 flex-grow flex flex-col">
            <TextEditorArea
              value={essayText}
              onChange={onEssayChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPhaseArea; 