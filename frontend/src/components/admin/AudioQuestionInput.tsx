import React, { useState } from 'react';
import { AudioQuestion } from '../../types/types';

interface AudioQuestionInputProps {
  onChange: (data: Omit<AudioQuestion, 'type'>) => void;
}

const AudioQuestionInput: React.FC<AudioQuestionInputProps> = ({ onChange }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [snippetFile, setSnippetFile] = useState<File | null>(null); // Stores the audio snippet blob
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleChange = (prompt: string, snippetFile: File | null, options: string[], correctAnswer: string) => {
    onChange({ 
      prompt: prompt,
      snippetFile: snippetFile, 
      options: options, 
      correct_answer: correctAnswer
    });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value)
          handleChange(e.target.value, snippetFile, options, correctAnswer);
        }}
        placeholder="Enter question prompt"
        className="w-full p-2 border rounded-md mb-4"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio Snippet</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const fl = e.target.files?.[0] || null;
            setSnippetFile(fl);
            handleChange(prompt, snippetFile, options, correctAnswer);
          }}
          className="w-full"
        />
        {snippetFile && (
          <p className="mt-1 text-sm text-gray-600">Selected: {snippetFile.name}</p>
        )}
      </div>
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
          handleChange( prompt, snippetFile, options, correctAnswer );
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

export default AudioQuestionInput;