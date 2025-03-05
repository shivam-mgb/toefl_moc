import React, { useState, useEffect } from 'react';
import { AudioQuestion } from '../../types/types';

interface AudioQuestionInputProps {
  onChange: (data: Omit<AudioQuestion, 'type'>) => void;
}

const AudioQuestionInput: React.FC<AudioQuestionInputProps> = ({ onChange }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [snippetFile, setSnippetFile] = useState<File | null>(null); // Stores the audio snippet blob
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  // Update an option value
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Toggle an option as a correct answer
  const toggleCorrectAnswer = (option: string) => {
    setCorrectAnswers((prev) =>
      prev.includes(option)
        ? prev.filter((ans) => ans !== option)
        : [...prev, option]
    );
  };

  // Notify parent of changes
  useEffect(() => {
    onChange({
      prompt,
      snippetFile, // Pass the blob instead of a URL
      options,
      correct_answers: correctAnswers,
    });
  }, [prompt, snippetFile, options, correctAnswers, onChange]);

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter question prompt"
        className="w-full p-2 border rounded-md mb-4"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio Snippet</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setSnippetFile(file);
          }}
          className="w-full"
        />
        {snippetFile && (
          <p className="mt-1 text-sm text-gray-600">Selected: {snippetFile.name}</p>
        )}
      </div>
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

export default AudioQuestionInput;