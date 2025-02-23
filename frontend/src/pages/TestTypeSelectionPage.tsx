import React from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';

const TestTypeSelectionPage: React.FC = () => {
  // Placeholder navigation handler
  const handleNext = () => {
    console.log('Next clicked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="TOEFL iBT Test Simulator" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Logo Area */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-16 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-500 font-semibold">LOGO</span>
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Choose Test Type
        </h1>

        {/* Introductory Text */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-gray-600 text-center leading-relaxed">
            Welcome to the TOEFL iBT Test Simulator. Choose between taking a full MOOC test 
            that simulates the entire TOEFL iBT experience, or practice specific sections 
            of the test individually.
          </p>
        </div>

        {/* Test Type Buttons */}
        <div className="max-w-md mx-auto space-y-4">
          <button 
            className="w-full bg-teal-500 text-white py-4 px-6 rounded-lg
                     font-semibold text-lg shadow-md
                     hover:bg-teal-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            onClick={() => console.log('Full MOOC Test clicked')}
          >
            Take Full MOOC Test (All Sections)
          </button>

          <button 
            className="w-full bg-white text-gray-700 py-4 px-6 rounded-lg
                     font-semibold text-lg shadow-md border border-gray-200
                     hover:bg-gray-50 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            onClick={() => console.log('Practice by Section clicked')}
          >
            Practice by Section
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

export default TestTypeSelectionPage; 