import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "../../../layouts/AdminLayout";
import StepIndicator from '../../../components/admin/StepIndicator';

interface PassageDetails {
  title: string;
  text: string;
  questions: {
    questionStem: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const CreateReadingSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [section, setSection] = useState<PassageDetails[]>([
    {
      title: '',
      text: '',
      questions: []
    },
    {
      title: '',
      text: '',
      questions: []
    },
    {
      title: '',
      text: '',
      questions: []
    }
  ]);

  // Define steps dynamically based on the number of passages
  const steps = section.flatMap((_, index) => [
    `Passage ${index + 1} Details`,
    `Passage ${index + 1} Questions`
  ]).concat(['Review Section']);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      if (currentStep % 2 === 0) {
        setCurrentPassageIndex(currentPassageIndex + 1);
      }
    } else {
      handleSubmit();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep % 2 === 1 && currentStep > 1) {
        setCurrentPassageIndex(currentPassageIndex - 1);
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All progress will be lost.")) {
      navigate("/admin/section-creation");
    }
  };

  const handleSubmit = () => {
    // Here you would submit the full section data to your API
    console.log("Submitting reading section:", section);
    alert("Reading section created successfully!");
    navigate("/admin/section-creation");
  };

  const updatePassageDetails = (field: keyof PassageDetails, value: string) => {
    const updatedSection = [...section];
    updatedSection[currentPassageIndex] = {
      ...updatedSection[currentPassageIndex],
      [field]: value
    };
    setSection(updatedSection);
  };

  const addQuestion = () => {
    const updatedSection = [...section];
    updatedSection[currentPassageIndex].questions.push({
      questionStem: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
    setSection(updatedSection);
  };

  const updateQuestionStem = (questionIndex: number, value: string) => {
    const updatedSection = [...section];
    updatedSection[currentPassageIndex].questions[questionIndex].questionStem = value;
    setSection(updatedSection);
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedSection = [...section];
    updatedSection[currentPassageIndex].questions[questionIndex].options[optionIndex] = value;
    setSection(updatedSection);
  };

  const updateCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedSection = [...section];
    updatedSection[currentPassageIndex].questions[questionIndex].correctAnswer = optionIndex;
    setSection(updatedSection);
  };

  return (
    <AdminLayout
      title="Create Reading Section"
      breadcrumbItems={[
        { label: "Admin Dashboard", path: "/admin" },
        { label: "Section Creation", path: "/admin/section-creation" },
        { label: "Create Reading Section", path: "/admin/section-creation/reading" }
      ]}
    >
      <StepIndicator currentStep={currentStep} steps={steps} />

      {/* Passage Details Form (odd steps except last) */}
      {currentStep % 2 === 1 && currentStep < steps.length - 1 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Passage {currentPassageIndex + 1} Details</h2>
          <p className="text-gray-600 mb-4">
            Enter the details for Reading Passage {currentPassageIndex + 1}.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passage Title*
            </label>
            <input
              type="text"
              value={section[currentPassageIndex].title}
              onChange={(e) => updatePassageDetails('title', e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passage Text*
            </label>
            <textarea
              value={section[currentPassageIndex].text}
              onChange={(e) => updatePassageDetails('text', e.target.value)}
              rows={12}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage text..."
            />
          </div>
        </div>
      )}

      {/* Questions Form (even steps except last) */}
      {currentStep % 2 === 0 && currentStep < steps.length - 1 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Passage {currentPassageIndex + 1} Questions</h2>
          <p className="text-gray-600 mb-4">
            Add questions for Reading Passage {currentPassageIndex + 1}: "{section[currentPassageIndex].title}"
          </p>

          {section[currentPassageIndex].questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-8 p-4 border border-gray-200 rounded-md">
              <h3 className="font-medium mb-2">Question {questionIndex + 1}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Stem*
                </label>
                <textarea
                  value={question.questionStem}
                  onChange={(e) => updateQuestionStem(questionIndex, e.target.value)}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Enter the question text..."
                />
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">Answer Options*</h4>
              </div>

              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${questionIndex}-correct`}
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => updateCorrectAnswer(questionIndex, optionIndex)}
                    className="mr-2 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateQuestionOption(questionIndex, optionIndex, e.target.value)}
                    className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            + Add Question
          </button>
        </div>
      )}

      {/* Review Section (last step) */}
      {currentStep === steps.length && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Review Reading Section</h2>
          <p className="text-gray-600 mb-4">
            Review the details of your Reading section before finalizing.
          </p>

          <div className="space-y-4">
            {section.map((passage, index) => (
              <div key={index} className="border-b pb-3">
                <h3 className="font-medium">Passage {index + 1}</h3>
                <p className="text-sm mt-1">Title: {passage.title || 'No title entered'}</p>
                <p className="text-sm mt-1">Text: {passage.text ? `${passage.text.substring(0, 50)}...` : 'No text entered'}</p>
                <p className="text-sm mt-1">Questions: {passage.questions.length || 0} added</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              Create Reading Section
            </button>
          </div>
        </div>
      )}

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
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default CreateReadingSection;