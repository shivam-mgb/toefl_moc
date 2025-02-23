import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

const ListeningSectionIntroPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/listening-section');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="Listening Section - Introduction" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Listening Section Introduction
          </h1>

          {/* Section Overview Area */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Section Name */}
            <h2 className="text-2xl font-bold text-teal-600 mb-6">
              Listening Section
            </h2>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The Listening section measures your ability to understand spoken English
                in academic settings. You will listen to lectures and conversations
                and answer questions about them.
              </p>
            </div>

            {/* Time and Questions Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Time Limit
                </h3>
                <p className="text-gray-600">
                  Approximately 41 minutes
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Number of Tracks
                </h3>
                <p className="text-gray-600">
                  5 (2 Conversations, 3 Lectures)
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
                  Listen carefully to each conversation and lecture.
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  Answer the questions based on what is stated or implied in the audio.
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  You can take notes while listening, but notes are not graded.
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
              Start Listening Section Test
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

export default ListeningSectionIntroPage;
