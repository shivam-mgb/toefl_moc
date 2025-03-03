// components/admin/StepIndicator.tsx
import React, { FC } from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: FC<StepIndicatorProps> = ({ currentStep, steps }) => {
    return (
        <div className="step-indicator">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${index + 1 === currentStep ? 'active' : ''} ${
                        index + 1 < currentStep ? 'completed' : ''
                    }`}
                >
                    {step}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;