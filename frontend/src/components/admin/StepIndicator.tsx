
import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="relative flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                  index + 1 === currentStep
                    ? 'bg-teal-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-teal-200 text-teal-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs mt-1 text-center">{step}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index + 1 < currentStep ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
