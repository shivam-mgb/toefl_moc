import React, { useState, useEffect } from 'react';

interface TextEditorAreaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  minWords?: number;
  maxWords?: number;
}

const TextEditorArea: React.FC<TextEditorAreaProps> = ({
  placeholder = "Write your response here...",
  value,
  onChange,
  minWords = 150,
  maxWords = 225
}) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [value]);

  const getWordCountColor = () => {
    if (wordCount < minWords) return 'text-yellow-600';
    if (wordCount > maxWords) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-grow w-full p-4 border-2 border-gray-200 rounded-lg
                 focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                 resize-none text-gray-700 leading-relaxed min-h-0"
      />
      <div className="mt-2 flex justify-between items-center text-sm flex-shrink-0">
        <div>
          <span className={getWordCountColor()}>
            Word Count: {wordCount}
          </span>
          <span className="text-gray-500 ml-2">
            (Target: {minWords}-{maxWords} words)
          </span>
        </div>
        <div className="text-gray-500">
          {wordCount < minWords && `${minWords - wordCount} words to minimum`}
          {wordCount > maxWords && `${wordCount - maxWords} words over limit`}
        </div>
      </div>
    </div>
  );
};

export default TextEditorArea; 