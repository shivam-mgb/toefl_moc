import React from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import TaskCard from '../components/TaskCard';

// Placeholder task numbers
const tasks = ['51', '52', '53', '54', '55'];

const ReadingSinglePassageTaskListPage: React.FC = () => {
  // Placeholder handlers
  const handleTaskClick = (taskNumber: string) => {
    console.log(`Task ${taskNumber} clicked`);
  };

  const handleBackClick = () => {
    console.log('Back to Section Selection clicked');
  };

  const handleNext = () => {
    console.log('Next clicked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="Reading Section - Single Passage Tasks" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page Title and Instructions */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Choose a Single Passage Task
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a task number below to begin practicing.
          </p>
        </div>

        {/* Task Cards */}
        <div className="max-w-2xl mx-auto space-y-4">
          {tasks.map((taskNumber) => (
            <TaskCard
              key={taskNumber}
              taskNumber={taskNumber}
              onClick={() => handleTaskClick(taskNumber)}
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="max-w-2xl mx-auto mt-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center px-6 py-3 
                     text-gray-700 bg-white rounded-md shadow-sm
                     border border-gray-200
                     hover:bg-gray-50 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Section Selection
          </button>
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

export default ReadingSinglePassageTaskListPage; 