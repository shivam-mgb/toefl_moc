import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
}

const SECTION_SCORES: SectionScore[] = [
  { name: 'Reading', score: 25, maxScore: 30 },
  { name: 'Listening', score: 26, maxScore: 30 },
  { name: 'Speaking', score: 24, maxScore: 30 },
  { name: 'Writing', score: 25, maxScore: 30 }
];

const ReviewPage: React.FC = () => {
  const totalScore = SECTION_SCORES.reduce((sum, section) => sum + section.score, 0);
  const maxTotalScore = SECTION_SCORES.reduce((sum, section) => sum + section.maxScore, 0);
  const navigate = useNavigate();

  const handleGoToSections = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu 
        sectionTitle="Test Results"
        timer={null}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overall Score */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Overall Estimated Score
            </h2>
            <div className="text-4xl font-bold text-teal-600">
              {totalScore} <span className="text-gray-500">/ {maxTotalScore}</span>
            </div>
          </div>

          {/* Section Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTION_SCORES.map((section) => (
              <div 
                key={section.name}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {section.name} Section
                </h3>
                
                {/* Section Score */}
                <div className="text-2xl font-bold text-teal-600 mb-4">
                  {section.score} <span className="text-gray-500">/ {section.maxScore}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleGoToSections}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg
                       hover:bg-teal-700 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Go to Sections Page
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewPage;