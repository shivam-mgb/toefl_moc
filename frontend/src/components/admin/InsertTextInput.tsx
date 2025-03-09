// src/components/InsertTextInput.tsx
import React, { useState } from 'react';
import { InsertTextQuestion } from '../../types/types';

interface InsertTextInputProps {
  onChange: (data: Omit<InsertTextQuestion, 'type'>) => void;
}

const InsertTextInput: React.FC<InsertTextInputProps> = ({ onChange }) => {
  const [insertionSentence, setInsertionSentence] = useState<string>('');
  const [correctInsertionPoint, setCorrectInsertionPoint] = useState<string>('');

  const handleChange = (sentence: string, insertionPoint: string) => {
    onChange({ prompt: sentence, correct_answer: insertionPoint });
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Sentence to Insert:</label>
      <textarea
        value={insertionSentence}
        onChange={(e) => {
          const newValue = e.target.value;
          setInsertionSentence(newValue);
          handleChange(newValue, correctInsertionPoint); // Use latest value directly
        }}
        placeholder="Enter the sentence to insert"
        className="w-full p-2 border rounded-md mb-4"
      />
      <label className="block mb-2 font-medium">Correct Insertion Point:</label>
      <select
        value={correctInsertionPoint}
        onChange={(e) => {
          const newValue = e.target.value;
          setCorrectInsertionPoint(newValue);
          handleChange(insertionSentence, newValue); // Use latest value directly
        }}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select correct point</option>
        {['a', 'b', 'c', 'd'].map((label) => (
          <option key={label} value={label}>
            [{label}]
          </option>
        ))}
      </select>
    </div>
  );
};

export default InsertTextInput;