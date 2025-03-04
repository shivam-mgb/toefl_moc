// src/components/QuestionInput.tsx
import React, { useState } from 'react';
import MultipleToSingleInput from './MultipleToSingleInput';
import MultipleToMultipleInput from './MultipleToMultipleInput';
import InsertTextInput from './InsertTextInput';
import ProseSummaryInput from './ProseSummaryInput';
import { Question } from '../../types/types';

interface QuestionInputProps {
  onChange: (question: Question) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onChange }) => {
  const [type, setType] = useState<string>('multiple_to_single');

  const handleChange = (data: Omit<Question, 'type'>) => {
    onChange({ type, ...data } as Question);
  };

  const renderInput = () => {
    switch (type) {
      case 'multiple_to_single':
        return <MultipleToSingleInput onChange={handleChange} />;
      case 'multiple_to_multiple':
        return <MultipleToMultipleInput onChange={handleChange} />;
      case 'insert_text':
        return <InsertTextInput onChange={handleChange} />;
      case 'prose_summary':
        return <ProseSummaryInput onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="border p-4 rounded-md mb-4 bg-white">
      <label className="block mb-2 font-medium">Question Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="multiple_to_single">Multiple Choice (Single Answer)</option>
        <option value="multiple_to_multiple">Multiple Choice (Multiple Answers)</option>
        <option value="insert_text">Insert a Text</option>
        <option value="prose_summary">Prose Summary</option>
      </select>
      {renderInput()}
    </div>
  );
};

export default QuestionInput;