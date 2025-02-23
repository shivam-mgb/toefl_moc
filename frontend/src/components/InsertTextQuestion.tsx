import React from 'react';

interface InsertTextQuestionProps {
  questionText: string;
  passageText: string;
  insertionPoints: number[];
}

const InsertTextQuestion: React.FC<InsertTextQuestionProps> = ({
  questionText,
  passageText,
  insertionPoints
}) => {
  const segments = passageText.split(/\[\d+\]/g);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{questionText}</h2>
        <p className="text-gray-600">Click on a numbered box [■] to indicate where the following sentence should be placed.</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              {segment}
              {index < segments.length - 1 && (
                <span className="inline-flex items-center justify-center mx-1 px-2 py-1 border-2 border-teal-500 text-teal-600 font-bold rounded cursor-pointer hover:bg-teal-50">
                  [{insertionPoints[index]}]
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsertTextQuestion;