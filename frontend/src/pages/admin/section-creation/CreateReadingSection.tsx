// CreateReadingSection.tsx (Modified to work with the above AdminLayout)
import React, { useState, FC, ChangeEvent, FormEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep using react-router-dom
import AdminLayout from '../../../layouts/AdminLayout'; // Correct path
import StepIndicator from '../../../components/admin/StepIndicator'; // Correct path
import { Plus, Save, Trash2 } from 'lucide-react';

// --- Type Definitions ---

type QuestionType =
  | 'reading_multiple_choice_single'
  | 'reading_multiple_choice_multiple'
  | 'reading_insert_text'
  | 'reading_summary';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: Option[]; // Options are relevant for multiple-choice
}

interface Passage {
  id: number; // Add an ID to each passage
  title: string;
  topic: string; // Add a topic field
  text: string;
  order: number;
  questions: Question[];
}

interface SectionSet {
  id: number;
  title: string;
  description: string;
  passages: Passage[];
}

// --- Component ---

const CreateReadingSection: FC = () => {
  const navigate = useNavigate();
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const [sectionDescription, setSectionDescription] = useState<string>('');
  const [passages, setPassages] = useState<Passage[]>([
    { id: Date.now(), title: '', topic: '', text: '', order: 1, questions: [] },
  ]);

  const [currentPassageIndex, setCurrentPassageIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    'Section Details',
    ...passages.flatMap((_, index) => [
      `Passage ${index + 1} Details`,
      `Passage ${index + 1} Questions`,
    ]),
    'Review Section',
  ];

  // --- Passage Handlers ---

  const handlePassageChange = (
    index: number,
    field: keyof Omit<Passage, 'id' | 'questions' | 'order'>,
    value: string
  ) => {
    const updatedPassages = [...passages];
    updatedPassages[index] = {
      ...updatedPassages[index],
      [field]: value,
    };
    setPassages(updatedPassages);
  };

  const addPassage = () => {
    const newPassageId = Date.now();
    setPassages([
      ...passages,
      {
        id: newPassageId,
        title: '',
        topic: '',
        text: '',
        order: passages.length + 1,
        questions: [],
      },
    ]);
    setCurrentStep(currentStep + 1);
  };

  const removePassage = (index: number) => {
    if (passages.length <= 1) return;

    const removedPassageId = passages[index].id;

    const updatedPassages = passages
      .filter((_, i) => i !== index)
      .map((passage, i) => ({
        ...passage,
        order: i + 1,
      }));
    setPassages(updatedPassages);

    if (index === currentPassageIndex) {
      setCurrentPassageIndex(Math.max(0, index - 1));
      setCurrentStep(Math.max(1, currentStep - 2));
    } else if (index < currentPassageIndex) {
      setCurrentPassageIndex(currentPassageIndex - 1);
    }
  };

  // --- Question Handlers ---

  const handleQuestionChange = (
    passageIndex: number,
    questionIndex: number,
    field: keyof Omit<Question, 'id' | 'options'>,
    value: string | QuestionType
  ) => {
    const updatedPassages = [...passages];
    updatedPassages[passageIndex].questions[questionIndex] = {
      ...updatedPassages[passageIndex].questions[questionIndex],
      [field]: value,
    };
    setPassages(updatedPassages);
  };

  const handleOptionChange = (
    passageIndex: number,
    questionIndex: number,
    optionIndex: number,
    field: keyof Option,
    value: string | boolean
  ) => {
    const updatedPassages = [...passages];
    const question = updatedPassages[passageIndex].questions[questionIndex];

    if (!question.options) {
      question.options = [];
    }

    question.options[optionIndex] = {
      ...question.options[optionIndex],
      [field]: value,
    };
    setPassages(updatedPassages);
  };

  const handleCorrectChange = (
    passageIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedPassages = [...passages];
    const question = updatedPassages[passageIndex].questions[questionIndex];
    if (!question.options) {
      question.options = [];
    }
    const newOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect:
        question.type === 'reading_multiple_choice_single'
          ? i === optionIndex
          : i === optionIndex
          ? !option.isCorrect
          : option.isCorrect,
    }));

    question.options = newOptions;
    setPassages(updatedPassages);
  };

  const addQuestion = (passageIndex: number) => {
    const updatedPassages = [...passages];
    updatedPassages[passageIndex].questions.push({
      id: Date.now(),
      text: '',
      type: 'reading_multiple_choice_single',
      options: [
        { id: Date.now() + 1, text: '', isCorrect: false },
        { id: Date.now() + 2, text: '', isCorrect: false },
        { id: Date.now() + 3, text: '', isCorrect: false },
        { id: Date.now() + 4, text: '', isCorrect: false },
      ],
    });
    setPassages(updatedPassages);
  };

  const removeQuestion = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...passages];
    updatedPassages[passageIndex].questions.splice(questionIndex, 1);
    setPassages(updatedPassages);
  };

  const addOption = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...passages];
    const question = updatedPassages[passageIndex].questions[questionIndex];

    if (!question.options) {
      question.options = [];
    }

    question.options.push({
      id: Date.now(),
      text: '',
      isCorrect: false,
    });
    setPassages(updatedPassages);
  };

  const removeOption = (
    passageIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedPassages = [...passages];
    const question = updatedPassages[passageIndex].questions[questionIndex];

    if (question.options && question.options.length > 2) {
      question.options.splice(optionIndex, 1);
      setPassages(updatedPassages);
    }
  };

  // --- Navigation Handlers ---

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);

      const stepType = getStepType(currentStep + 1);
      if (stepType === 'passageDetails') {
        setCurrentPassageIndex(currentPassageIndex + 1);
      }
    } else {
      handleSubmit();
    }
  };

  const getStepType = (step: number) => {
    if (step === 1) {
      return 'sectionDetails';
    } else if (step === steps.length) {
      return 'review';
    } else if ((step - 1) % 2 === 1) {
      return 'passageDetails';
    } else {
      return 'questionDetails';
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);

      const stepType = getStepType(currentStep - 1);

      if (stepType === 'questionDetails') {
        setCurrentPassageIndex(currentPassageIndex);
      } else if (stepType === 'passageDetails') {
        setCurrentPassageIndex(currentPassageIndex - 1);
      }
    }
  };

  const handleCancel = () => {
    if (
      window.confirm('Are you sure you want to cancel? All progress will be lost.')
    ) {
      navigate('/admin/section-creation');
    }
  };

  const handleSubmit = () => {
    const sectionData: SectionSet = {
      id: Date.now(),
      title: sectionTitle,
      description: sectionDescription,
      passages: passages,
    };
    console.log('Submitting reading section:', sectionData);
    alert('Reading section created successfully!');
    navigate('/admin/section-creation');
  };

  return (
    <AdminLayout
      title="Create Reading Section"
      breadcrumbItems={[
        { label: 'Admin Dashboard', path: '/admin' },
        { label: 'Section Creation', path: '/admin/section-creation' },
        { label: 'Create Reading Section', path: '/admin/section-creation/reading' },
      ]}
    >
      <StepIndicator currentStep={currentStep} steps={steps} />

      {/* Section Details Form (Step 1) */}
      {currentStep === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Section Details</h2>
          <p className="text-gray-600 mb-4">
            Enter the title and description for the entire reading section.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title*
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter section title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              value={sectionDescription}
              onChange={(e) => setSectionDescription(e.target.value)}
              rows={4}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter section description..."
            />
          </div>
          <button
            type="button"
            onClick={addPassage}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            + Add Passage
          </button>
        </div>
      )}

      {/* Passage Details Form (odd steps except first and last) */}
      {getStepType(currentStep) === 'passageDetails' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            Passage {currentPassageIndex + 1} Details
          </h2>
          <p className="text-gray-600 mb-4">
            Enter the details for Reading Passage {currentPassageIndex + 1}.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passage Title*
            </label>
            <input
              type="text"
              value={passages[currentPassageIndex].title}
              onChange={(e) =>
                handlePassageChange(currentPassageIndex, 'title', e.target.value)
              }
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passage Topic*
            </label>
            <input
              type="text"
              value={passages[currentPassageIndex].topic}
              onChange={(e) =>
                handlePassageChange(currentPassageIndex, 'topic', e.target.value)
              }
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage topic..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passage Text*
            </label>
            <textarea
              value={passages[currentPassageIndex].text}
              onChange={(e) =>
                handlePassageChange(currentPassageIndex, 'text', e.target.value)
              }
              rows={12}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage text..."
            />
          </div>
          <button
            type="button"
            onClick={() => removePassage(currentPassageIndex)}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-red-600 hover:bg-red-50"
            disabled={passages.length <= 1}
          >
            - Remove Passage
          </button>
        </div>
      )}

      {/* Questions Form (even steps except last) */}
      {getStepType(currentStep) === 'questionDetails' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            Passage {currentPassageIndex + 1} Questions
          </h2>
          <p className="text-gray-600 mb-4">
            Add questions for Reading Passage {currentPassageIndex + 1}:{' '}
            "{passages[currentPassageIndex].title}"
          </p>

          {passages[currentPassageIndex].questions.map((question, questionIndex) => (
            <div key={question.id} className="mb-8 p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-start">
                <h3 className="font-medium mb-2">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(currentPassageIndex, questionIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Stem*
                </label>
                <textarea
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(
                      currentPassageIndex,
                      questionIndex,
                      'text',
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Enter the question text..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type*
                </label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(
                      currentPassageIndex,
                      questionIndex,
                      'type',
                      e.target.value as QuestionType
                    )
                  }
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="reading_multiple_choice_single">
                    Multiple Choice (Single Answer)
                  </option>
                  <option value="reading_multiple_choice_multiple">
                    Multiple Choice (Multiple Answers)
                  </option>
                  {/* Add other question types here later */}
                </select>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">Answer Options*</h4>
              </div>
              {question.options &&
                question.options.map((option, optionIndex) => (
                  <div key={option.id} className="flex items-center mb-2">
                    <input
                      type={
                        question.type === 'reading_multiple_choice_single'
                          ? 'radio'
                          : 'checkbox'
                      }
                      name={`question-${questionIndex}-correct`}
                      checked={option.isCorrect}
                      onChange={() =>
                        handleCorrectChange(
                          currentPassageIndex,
                          questionIndex,
                          optionIndex
                        )
                      }
                      className="mr-2 focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300"
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(
                          currentPassageIndex,
                          questionIndex,
                          optionIndex,
                          'text',
                          e.target.value
                        )
                      }
                      className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeOption(currentPassageIndex, questionIndex, optionIndex)
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                      disabled={question.options!.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              <button
                type="button"
                onClick={() => addOption(currentPassageIndex, questionIndex)}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                + Add Option
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addQuestion(currentPassageIndex)}
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
          <div className="mb-4">
            <h3 className="font-medium">Section Details</h3>
            <p className="text-sm mt-1">Title: {sectionTitle || 'No title entered'}</p>
            <p className="text-sm mt-1">
              Description: {sectionDescription || 'No description entered'}
            </p>
          </div>

          <div className="space-y-4">
            {passages.map((passage, index) => (
              <div key={passage.id} className="border-b pb-3">
                <h3 className="font-medium">Passage {index + 1}</h3>
                <p className="text-sm mt-1">
                  Title: {passage.title || 'No title entered'}
                </p>
                <p className="text-sm mt-1">
                  Topic: {passage.topic || 'No topic entered'}
                </p>
                <p className="text-sm mt-1">
                  Text:{' '}
                  {passage.text
                    ? `${passage.text.substring(0, 50)}...`
                    : 'No text entered'}
                </p>
                <p className="text-sm mt-1">
                  Questions: {passage.questions.length || 0} added
                </p>
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
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
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

        {currentStep < steps.length && (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-4 py-2 border border-transparent rounded-md bg-teal-600 text-white hover:bg-teal-700"
          >
            Next Step
          </button>
        )}
      </div>
    </AdminLayout>
  );
};

export default CreateReadingSection;