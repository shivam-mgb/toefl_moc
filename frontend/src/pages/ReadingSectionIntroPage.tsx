import React from 'react';
import { useNavigate } from 'react-router-dom'
import TopMenu from '../components/TopMenu';


const ReadingSectionIntroPage: React.FC = () => {
  const navigate = useNavigate();

  // Placeholder handlers
  const handleStartTest = () => {
    navigate('/reading');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="Reading Section - Introduction" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Reading Section Introduction
          </h1>

          {/* Section Overview Area */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Section Name */}
            <h2 className="text-2xl font-bold text-teal-600 mb-6">
              Reading Section
            </h2>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The Reading section measures your ability to understand academic 
                passages written in English. You will read passages and answer 
                questions about them. The questions will assess your comprehension 
                of main ideas, important details, implications, relationships 
                between ideas, rhetorical devices, and overall organization.
              </p>
            </div>

            {/* Time and Questions Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Time Limit
                </h3>
                <p className="text-gray-600">
                  54-72 minutes
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Number of Questions
                </h3>
                <p className="text-gray-600">
                  30-40 questions
                </p>
              </div>
            </div>

            {/* General Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                General Instructions
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Read each passage carefully and answer all questions within the time limit.
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  You can navigate between questions using the 'Next' button.
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Each passage is followed by questions about its content and organization.
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Some questions will require you to select multiple answers.
                </li>
              </ul>
            </div>

            {/* Start Test Button */}
            <button
              onClick={handleStartTest}
              className="w-full bg-teal-500 text-white py-4 px-6 rounded-md
                       font-semibold text-lg shadow-md
                       hover:bg-teal-600 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Start Reading Section Test
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
    </div>
  );
};

export default ReadingSectionIntroPage; 