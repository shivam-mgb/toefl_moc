import React from 'react';

interface MultipleChoiceQuestionProps {
    questionNumber: number;
    totalQuestions: number;
    questionText: string;
    options: { id: string; text: string }[];
    selectedAnswer: string[] | undefined; // Changed to undefined | string[]
    onAnswerSelect: (answer: string[]) => void;
    isMultipleChoice: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
    questionNumber,
    totalQuestions,
    questionText,
    options,
    selectedAnswer,
    onAnswerSelect,
    isMultipleChoice,
}) => {
    const handleCheckboxChange = (optionId: string) => {
        const updatedSelectedAnswer = [...(selectedAnswer || [])]; 
        const index = updatedSelectedAnswer.indexOf(optionId);

        if (index === -1) {
            updatedSelectedAnswer.push(optionId);
        } else {
            updatedSelectedAnswer.splice(index, 1);
        }
        onAnswerSelect(updatedSelectedAnswer);
    };

    const handleRadioChange = (optionId: string) => {
        onAnswerSelect([optionId]);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-2">Question {questionNumber} of {totalQuestions}</p>
            <h3 className="text-lg font-semibold mb-4">{questionText}</h3>
            <div className="space-y-2">
                {options.map((option) => (
                    <label key={option.id} className="flex items-center space-x-2">
                        <input
                            type={isMultipleChoice ? "checkbox" : "radio"}
                            name={`question-${questionNumber}-${option.id}`}
                            id={`answer-${questionNumber}-${option.id}`}
                            value={option.id}
                            checked={isMultipleChoice
                                ? selectedAnswer?.includes(option.id) ?? false
                                : selectedAnswer?.[0] === option.id
                            }
                            onChange={() => (isMultipleChoice ? handleCheckboxChange(option.id) : handleRadioChange(option.id))}
                            className={`form-checkbox h-5 w-5 text-teal-600 ${isMultipleChoice ? 'cursor-pointer' : ''}`}
                        />
                        <span>{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;
