// src/components/MultipleToMultipleInput.tsx
import React, { useState } from 'react';
import { MultipleToMultipleQuestion } from '../../types/types';

interface MultipleToMultipleInputProps {
  onChange: (data: Omit<MultipleToMultipleQuestion, 'type'>) => void;
}

const MultipleToMultipleInput: React.FC<MultipleToMultipleInputProps> = ({ onChange }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onChange({ prompt, options: newOptions, correct_answers: correctAnswers });
  };

  const toggleCorrectAnswer = (option: string) => {
    const newCorrect = correctAnswers.includes(option)
      ? correctAnswers.filter((ans) => ans !== option)
      : [...correctAnswers, option];
    setCorrectAnswers(newCorrect);
    onChange({ prompt, options, correct_answers: newCorrect });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          onChange({ prompt: e.target.value, options, correct_answers: correctAnswers });
        }}
        placeholder="Enter question prompt"
        className="w-full p-2 border rounded-md mb-4"
      />
      <p className="font-medium">Options:</p>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={correctAnswers.includes(option)}
            onChange={() => toggleCorrectAnswer(option)}
            className="mr-2"
          />
          <input
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 border rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default MultipleToMultipleInput;