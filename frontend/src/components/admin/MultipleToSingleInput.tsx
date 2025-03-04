// src/components/MultipleToSingleInput.tsx
import React, { useState } from 'react';
import { MultipleToSingleQuestion } from '../../types/types';

interface MultipleToSingleInputProps {
  onChange: (data: Omit<MultipleToSingleQuestion, 'type'>) => void;
}

const MultipleToSingleInput: React.FC<MultipleToSingleInputProps> = ({ onChange }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    onChange({ prompt, options: newOptions, correct_answer: correctAnswer });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          onChange({ prompt: e.target.value, options, correct_answer: correctAnswer });
        }}
        placeholder="Enter question prompt"
        className="w-full p-2 border rounded-md mb-4"
      />
      <p className="font-medium">Options:</p>
      {options.map((option, index) => (
        <input
          key={index}
          value={option}
          onChange={(e) => updateOption(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
          className="w-full p-2 border rounded-md mb-2"
        />
      ))}
      <select
        value={correctAnswer}
        onChange={(e) => {
          setCorrectAnswer(e.target.value);
          onChange({ prompt, options, correct_answer: e.target.value });
        }}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select correct answer</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option || `Option ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultipleToSingleInput;