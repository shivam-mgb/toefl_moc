import React from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';

const ReadingSinglePassageTaskIntroPage: React.FC = () => {
  // Placeholder handlers
  const handleStartTask = () => {
    console.log('Start Single Passage Task clicked');
  };

  const handleNext = () => {
    console.log('Next clicked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="Reading Section - Single Passage Task Introduction" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Single Passage Task - Introduction
          </h1>

          {/* Task Overview Area */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Task Name/Type */}
            <h2 className="text-2xl font-bold text-teal-600 mb-6">
              Single Passage Task
            </h2>

            {/* Task Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Task Description
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                In this task, you will read an academic passage and answer questions 
                about its content. The passage will be about an academic topic, and 
                the questions will test your understanding of the main ideas, 
                supporting details, and the author's purpose.
              </p>
            </div>

            {/* Specific Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Task Instructions
              </h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">1.</span>
                  <span>
                    Read the passage carefully. You can refer back to the passage 
                    while answering questions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">2.</span>
                  <span>
                    Answer all questions based on what is stated or implied in 
                    the passage.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">3.</span>
                  <span>
                    Some questions may ask you to select multiple correct answers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">4.</span>
                  <span>
                    Use the "Next" button to move between questions. You can return 
                    to previous questions within the same passage.
                  </span>
                </li>
              </ul>
            </div>

            {/* Question Types */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Question Types You Will See
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Multiple choice with single answer
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Multiple choice with multiple answers
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Insert text questions
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Prose summary questions
                </li>
              </ul>
            </div>

            {/* Time Information Box */}
            <div className="bg-gray-50 p-6 rounded-md mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Time Information
              </h3>
              <p className="text-gray-600">
                You will have approximately 20 minutes to read the passage and 
                answer all questions. A timer will be displayed to help you manage 
                your time.
              </p>
            </div>

            {/* Start Task Button */}
            <button
              onClick={handleStartTask}
              className="w-full bg-teal-500 text-white py-4 px-6 rounded-md
                       font-semibold text-lg shadow-md
                       hover:bg-teal-600 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Start Single Passage Task
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2024 TOEFL iBT Test Simulator. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Navigation - Hidden on this page but included for consistency */}
      <div className="hidden">
        <Navigation onNext={handleNext} />
      </div>
    </div>
  );
};

export default ReadingSinglePassageTaskIntroPage; 