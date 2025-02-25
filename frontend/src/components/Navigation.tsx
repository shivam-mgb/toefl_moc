import React from 'react';

interface NavigationProps {
  onNext: () => void;
  isNextDisabled?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onNext, isNextDisabled = false }) => {
  return (
    <div className="flex justify-end py-4 px-6">
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`
          px-6 py-2 rounded-md
          font-semibold
          transition-colors duration-200
          ${isNextDisabled
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
