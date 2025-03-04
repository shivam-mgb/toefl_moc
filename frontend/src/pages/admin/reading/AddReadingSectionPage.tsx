import React, { useState } from 'react';
import PassageInput from '../components/admin/PassageInput';
import QuestionInput from '../components/admin/QuestionInput';
import { Question } from '../types/types';


const AddReadingSectionPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [sectionTitle, setSectionTitle] = useState<string>('');
  const [passages, setPassages] = useState<{ title: string; text: string }[]>([
    { title: '', text: '' },
    { title: '', text: '' },
  ]);
  const [questions, setQuestions] = useState<Question[][]>([
    Array(10).fill({} as Question),
    Array(10).fill({} as Question),
  ]);

  const updatePassage = (index: number, field: 'title' | 'text', value: string) => {
    const newPassages = [...passages];
    newPassages[index][field] = value;
    setPassages(newPassages);
  };

  const updateQuestion = (passageIndex: number, questionIndex: number, questionData: Question) => {
    const newQuestions = [...questions];
    newQuestions[passageIndex][questionIndex] = questionData;
    setQuestions(newQuestions);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sectionData = {
      title: sectionTitle,
      passages: passages.map((passage, index) => ({
        title: passage.title,
        text: passage.text,
        questions: questions[index],
      })),
    };
    console.log('Submitting:', sectionData);
    // TODO: Send to backend
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Step 1: Section Title</h3>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Enter section title"
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Step 2: Passage 1</h3>
            <PassageInput
              title={passages[0].title}
              text={passages[0].text}
              onTitleChange={(value) => updatePassage(0, 'title', value)}
              onTextChange={(value) => updatePassage(0, 'text', value)}
            />
            <h4 className="text-lg font-semibold mb-4">Questions</h4>
            {[...Array(10)].map((_, questionIndex) => (
              <QuestionInput
                key={questionIndex}
                onChange={(data) => updateQuestion(0, questionIndex, data)}
              />
            ))}
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Step 3: Passage 2</h3>
            <PassageInput
              title={passages[1].title}
              text={passages[1].text}
              onTitleChange={(value) => updatePassage(1, 'title', value)}
              onTextChange={(value) => updatePassage(1, 'text', value)}
            />
            <h4 className="text-lg font-semibold mb-4">Questions</h4>
            {[...Array(10)].map((_, questionIndex) => (
              <QuestionInput
                key={questionIndex}
                onChange={(data) => updateQuestion(1, questionIndex, data)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Reading Section</h2>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Previous
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Save Section
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReadingSectionPage;