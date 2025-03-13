import React, { useState } from 'react';
import AudioPlayerComponent from './AudioPlayerComponent';

interface AudioQuestionProps {
  questionId: string;
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  audioUrl: string;
  options: {
    id: string;
    text: string;
  }[];
  selectedAnswer: string[] | undefined;
  onAnswerSelect: (answer: string[]) => void;
}

const AudioQuestion: React.FC<AudioQuestionProps> = ({
  questionId,
  questionNumber,
  totalQuestions,
  questionText,
  audioUrl,
  options,
  selectedAnswer = [],
  onAnswerSelect,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayToggle = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const handleOptionSelect = (optionId: string) => {
    onAnswerSelect([optionId]); // We're using an array for consistency with other question types
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        Question {questionNumber} of {totalQuestions}
      </h3>
      <p className="mb-4">{questionText}</p>
      
      {/* Audio player for this specific question */}
      <div className="mb-6">
        <AudioPlayerComponent
          audioSrc={audioUrl}
          isPlaying={isPlaying}
          onPlay={() => handlePlayToggle(true)}
          onPause={() => handlePlayToggle(false)}
          onEnded={() => handlePlayToggle(false)}
        />
      </div>
      
      {/* Multiple choice options */}
      <div className="space-y-3">
        {options.map((opt) => (
          <div key={opt.id} className="flex items-center">
            <input
              type="radio"
              id={`question-${questionId}-option-${opt.id}`}
              name={`question-${questionId}`}
              value={opt.id}
              checked={selectedAnswer?.includes(opt.id)}
              onChange={() => handleOptionSelect(opt.id)}
              className="mr-3 h-4 w-4 text-teal-600"
            />
            <label
              htmlFor={`question-${questionId}-option-${opt.id}`}
              className="text-gray-700"
            >
              {opt.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioQuestion;