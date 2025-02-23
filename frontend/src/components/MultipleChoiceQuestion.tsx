import React from 'react';

interface MultipleChoiceQuestionProps {
    questionText: string;
    options: { id: string; text: string }[];
    selectedAnswer: string | string[] | null;
    onAnswerChange: (answerId: string) => void;
    isMultipleChoice?: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    questionText,
    options,
    selectedAnswer,
    onAnswerChange,
    isMultipleChoice,
}) => {
    const isChecked = (optionId: string) => {
        if (isMultipleChoice) {
            return Array.isArray(selectedAnswer) ? selectedAnswer.includes(optionId) : false;
        } else {
            return selectedAnswer === optionId;
        }
    };

    const handleChange = (optionId: string) => {
        onAnswerChange(optionId);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{questionText}</h3>
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                        <input
                            type={isMultipleChoice ? "checkbox" : "radio"}
                            name="answer"
                            value={option.id}
                            checked={isChecked(option.id)}
                            onChange={() => handleChange(option.id)}
                            className={`form-checkbox h-5 w-5 text-teal-600`}
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;
