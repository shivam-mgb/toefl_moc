import React from 'react';

interface TimerComponentProps {
  time: number;
  label?: string;
  isWarning?: boolean;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
  time,
  label,
  isWarning = false
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={`text-2xl font-mono font-bold
                    ${isWarning ? 'text-red-500' : 'text-gray-700'}`}>
        {formatTime(time)}
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
