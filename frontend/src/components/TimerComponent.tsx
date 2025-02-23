import React from 'react';

interface TimerComponentProps {
  time: string;
  label?: string;
  isWarning?: boolean;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
  time,
  label,
  isWarning = false
}) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={`text-2xl font-mono font-bold
                    ${isWarning ? 'text-red-500' : 'text-gray-700'}`}>
        {time}
      </div>
      {label && (
        <div className="text-sm text-gray-500">
          {label}
        </div>
      )}
    </div>
  );
};

export default TimerComponent; 