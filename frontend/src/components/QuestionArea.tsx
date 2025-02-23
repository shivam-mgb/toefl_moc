import React from 'react';

interface AnswerOption {
  id: string;
  text: string;
}

interface QuestionAreaProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: AnswerOption[];
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
}

const QuestionArea: React.FC<QuestionAreaProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  onAnswerSelect
}) => {
  return (
    <div className="h-full flex flex-col p-6">
      {/* Question Number */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-600">
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>

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

export default QuestionArea; 