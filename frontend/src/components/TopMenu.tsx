import React from 'react';

interface TopMenuProps {
  sectionTitle: string;
  questionProgress?: string; // Optional - e.g., "1/10"
  timer?: string; // Optional - e.g., "10:00"
}

const TopMenu: React.FC<TopMenuProps> = ({ sectionTitle, questionProgress, timer }) => {
  return (
    <div className="bg-teal-500 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Section Title */}
        <h1 className="text-xl font-bold">{sectionTitle}</h1>
        
        {/* Progress and Timer Container */}
        <div className="flex items-center space-x-6">
          {/* Question Progress (if provided) */}
          {questionProgress && (
            <div className="flex items-center">
              <span className="text-sm">Question {questionProgress}</span>
            </div>
          )}
          
          {/* Timer (if provided) */}
          {timer && (
            <div className="flex items-center">
              <span className="font-mono text-lg">{timer}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu; 