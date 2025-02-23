import React from 'react';

interface ReadingPassageAreaProps {
  passageTitle: string;
  passageText: string;
}

const ReadingPassageArea: React.FC<ReadingPassageAreaProps> = ({
  passageTitle,
  passageText
}) => {
  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md">
      {/* Passage Title */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {passageTitle}
        </h2>
      </div>

      {/* Passage Body - Scrollable Area */}
      <div 
        className="flex-grow p-6 overflow-y-auto
                   prose prose-gray max-w-none
                   prose-p:text-gray-600 prose-p:leading-relaxed
                   prose-headings:text-gray-800"
      >
        {/* Using dangerouslySetInnerHTML to handle HTML content if needed */}
        <div dangerouslySetInnerHTML={{ __html: passageText }} />
      </div>
    </div>
  );
};

export default ReadingPassageArea; 