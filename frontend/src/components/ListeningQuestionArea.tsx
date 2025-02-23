import React from 'react';

interface AnswerOption {
  id: string;
  text: string;
}

interface ListeningQuestionAreaProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: AnswerOption[];
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
  showReplayButton?: boolean;
  onReplayClick?: () => void;
}

const ListeningQuestionArea: React.FC<ListeningQuestionAreaProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  onAnswerSelect,
  showReplayButton,
  onReplayClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Question Number */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-600">
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>

      {/* Replay Button */}
      {showReplayButton && (
        <button
          onClick={onReplayClick}
          className="mb-6 px-4 py-2 bg-gray-100 text-gray-700
                   rounded-md border border-gray-200
                   hover:bg-gray-200 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
                   flex items-center space-x-2"
        >
          <ReplayIcon />
          <span>Replay Audio Snippet</span>
        </button>
      )}

      {/* Question Text */}
      <div className="mb-8">
        <p className="text-gray-800 text-lg leading-relaxed">
          {questionText}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-4">
        {options.map((option) => (
          <label
            key={option.id}
            className={`block p-4 rounded-lg border-2 cursor-pointer
                      transition-colors duration-200
                      ${selectedAnswer === option.id 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 hover:border-teal-200'}`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="answer"
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => onAnswerSelect(option.id)}
                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
              />
              <span className="ml-3 text-gray-700">{option.text}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

const ReplayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
  </svg>
);

export default ListeningQuestionArea; 