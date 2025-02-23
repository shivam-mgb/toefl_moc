import React from 'react';

interface TaskCardProps {
  taskNumber: string;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskNumber, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg shadow-md p-6
                 border border-gray-200 hover:border-teal-500
                 transition-all duration-200 
                 group
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
    >
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold text-gray-700 group-hover:text-teal-600">
          Task #{taskNumber}
        </span>
        <svg 
          className="w-6 h-6 text-gray-400 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-transform"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );
};

export default TaskCard; 