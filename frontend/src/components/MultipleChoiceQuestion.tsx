import React from 'react';

interface MultipleChoiceQuestionProps {
    questionText: string;
    options: { id: string; text: string }[];
    selectedAnswer: string | null;
    onAnswerChange: (answerId: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    questionText,
    options,
    selectedAnswer,
    onAnswerChange,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{questionText}</h3>
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="answer"
                            value={option.id}
                            checked={selectedAnswer === option.id}
                            onChange={() => onAnswerChange(option.id)}
                            className="form-radio h-5 w-5 text-teal-600"
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;
