import React, { useEffect, useState } from 'react';
import TimerComponent from './TimerComponent';

interface PreparationTimerAreaProps {
  timeRemaining: number;
  onTimeComplete: () => void;
}

const PreparationTimerArea: React.FC<PreparationTimerAreaProps> = ({ timeRemaining, onTimeComplete }) => {
  const [remaining, setRemaining] = useState(timeRemaining);

  useEffect(() => {
    if (!timeRemaining) return;

    if (remaining > 0) {
      const timer = setTimeout(() => {
        setRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    onTimeComplete();
  }, [remaining, timeRemaining]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center space-y-4">
        <TimerComponent 
          time={remaining} 
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
