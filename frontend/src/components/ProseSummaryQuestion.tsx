import React from 'react';

interface ProseSummaryQuestionProps {
  questionText: string;
  options: { id: string; text: string }[];
  onAnswerSelect: (answer: string[]) => void;
}

const ProseSummaryQuestion: React.FC<ProseSummaryQuestionProps> = ({ questionText, options, onAnswerSelect }) => {
  const [selectedAnswers, setSelectedAnswers] = React.useState<string[]>([]);

  const handleCheckboxChange = (optionId: string, isChecked: boolean) => {
    setSelectedAnswers(prevAnswers => {
      if (isChecked) {
        return [...prevAnswers, optionId];
      } else {
        return prevAnswers.filter(answer => answer !== optionId);
      }
    });
  };

  React.useEffect(() => {
    onAnswerSelect(selectedAnswers);
  }, [selectedAnswers, onAnswerSelect]);

  return (
    <div>
      <h3>{questionText}</h3>
      {options.map(option => (
        <div key={option.id}>
          <input
            type="checkbox"
            id={option.id}
            name="answer"
            value={option.id}
            checked={selectedAnswers.includes(option.id)}
            onChange={(e) => handleCheckboxChange(option.id, e.target.checked)}
          />
          <label htmlFor={option.id}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default ProseSummaryQuestion;
