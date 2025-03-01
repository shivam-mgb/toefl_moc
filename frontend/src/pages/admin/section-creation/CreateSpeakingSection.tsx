
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "../../../layouts/AdminLayout";
import StepIndicator from '../../../components/admin/StepIndicator';

const CreateSpeakingSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Task Setup', 'Instructions', 'Review'];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All progress will be lost.")) {
      navigate("/admin/section-creation");
    }
  };

  return (
    <AdminLayout
      title="Create Speaking Section"
      breadcrumbItems={[
        { label: "Admin Dashboard", path: "/admin" },
        { label: "Section Creation", path: "/admin/section-creation" },
        { label: "Create Speaking Section", path: "/admin/section-creation/speaking" }
      ]}
    >
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Speaking Section Creation</h2>
        
        {/* Step content will go here */}
        <div className="min-h-[300px]">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Task Setup</h3>
              {/* Form fields for task setup */}
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Instructions</h3>
              {/* Form fields for instructions */}
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Review</h3>
              {/* Review content */}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 border border-gray-300 rounded-md ${
            currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous Step
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
        >
          Cancel Section Creation
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-4 py-2 border border-transparent rounded-md bg-teal-600 text-white hover:bg-teal-700"
          >
            Next Step
          </button>
        ) : (
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md bg-teal-600 text-white hover:bg-teal-700"
          >
            Create Section
          </button>
        )}
      </div>
    </AdminLayout>
  );
};

export default CreateSpeakingSection;
