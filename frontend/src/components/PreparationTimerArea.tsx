import React from 'react';
import TimerComponent from './TimerComponent';

const PreparationTimerArea: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center space-y-4">
        <TimerComponent 
          time="00:15" 
          label="Preparation Time"
        />
        <p className="text-gray-600 font-medium">
          Prepare your response
        </p>
      </div>
    </div>
  );
};

export default PreparationTimerArea; 