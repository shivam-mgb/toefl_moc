import React from 'react';

interface PassageInputProps {
  title: string;
  text: string;
  onTitleChange: (title: string) => void;
  onTextChange: (text: string) => void;
}

const PassageInput: React.FC<PassageInputProps> = ({ title, text, onTitleChange, onTextChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Passage Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter passage title"
        className="w-full p-2 border rounded-md mb-4"
      />
      <label className="block text-lg font-semibold mb-2">Passage Text</label>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter passage text"
        className="w-full p-2 border rounded-md resize-y h-40"
      />
    </div>
  );
};

export default PassageInput;