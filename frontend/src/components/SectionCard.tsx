import React from 'react';

interface TaskOption {
  label: string;
  onClick?: () => void;
}

interface SectionCardProps {
  sectionTitle: string;
  sectionDescription: string;
  fullTestButtonLabel: string;
  onFullTestClick: () => void;
  taskOptions: TaskOption[];
  onTaskClick: (taskLabel: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  sectionTitle,
  sectionDescription,
  fullTestButtonLabel,
  onFullTestClick,
  taskOptions,
  onTaskClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {sectionTitle}
      </h2>
      
      {/* Section Description */}
      <p className="text-gray-500 mb-4">
        {sectionDescription}
      </p>
      
      {/* Full Test Button */}
      <button
        onClick={onFullTestClick}
        className="w-full bg-teal-500 text-white py-2 px-4 rounded-md 
                 font-semibold mb-4 hover:bg-teal-600 
                 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
      >
        {fullTestButtonLabel}
      </button>
      
      {/* Task Options */}
      <div className="space-y-2">
        {taskOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => onTaskClick(option.label)}
            className="w-full text-left px-4 py-2 text-gray-700 
                     hover:bg-gray-100 rounded-md transition-colors duration-200
                     focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionCard;
