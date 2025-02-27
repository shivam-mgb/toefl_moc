import React from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import SectionCard from '../components/SectionCard';
import { useSearchParams } from 'react-router-dom';

// Define section data for cleaner JSX
const sections = [
  {
    title: "Reading Section",
    description: "Assesses reading comprehension of academic texts.",
    fullTestLabel: "Take Full Reading Section Test",
    taskOptions: [
      { label: "Single Passage (Task)", onClick: () => console.log("Single Passage clicked") }
    ]
  },
  {
    title: "Listening Section",
    description: "Assesses understanding of spoken English in academic settings.",
    fullTestLabel: "Take Full Listening Section Test",
    taskOptions: [
      { label: "Conversation Task", onClick: () => console.log("Conversation Task clicked") },
      { label: "Lecture Task", onClick: () => console.log("Lecture Task clicked") }
    ]
  },
  {
    title: "Speaking Section",
    description: "Assesses spoken English proficiency in academic and general contexts.",
    fullTestLabel: "Take Full Speaking Section Test",
    taskOptions: [
      { label: "Speaking Task 1", onClick: () => console.log("Speaking Task 1 clicked") },
      { label: "Speaking Task 2", onClick: () => console.log("Speaking Task 2 clicked") },
      { label: "Speaking Task 3", onClick: () => console.log("Speaking Task 3 clicked") },
      { label: "Speaking Task 4", onClick: () => console.log("Speaking Task 4 clicked") }
    ]
  },
  {
    title: "Writing Section",
    description: "Assesses written English proficiency in academic settings.",
    fullTestLabel: "Take Full Writing Section Test",
    taskOptions: [
      { label: "Integrated Writing Task", onClick: () => console.log("Integrated Writing clicked") },
      { label: "Independent Writing Task", onClick: () => console.log("Independent Writing clicked") }
    ]
  }
];

const SectionSelectionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section');

  // Placeholder navigation handler
  const handleNext = () => {
    console.log('Next clicked');
  };

  const filteredSections = section ? sections.filter(s => s.title.toLowerCase().includes(section)) : sections;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu sectionTitle="Choose a Section to Practice" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Page Title and Instructions */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Select a Section to Practice
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a section below to begin practicing. For each section, you can choose 
            to take a full section test or practice specific task types.
          </p>
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredSections.map((section, index) => (
            <SectionCard
              key={index}
              sectionTitle={section.title}
              sectionDescription={section.description}
              fullTestButtonLabel={section.fullTestLabel}
              onFullTestClick={() => console.log(`${section.title} full test clicked`)}
              taskOptions={section.taskOptions}
            />
          ))}
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
        <Navigation onNext={handleNext}>
          Next
        </Navigation>
      </div>
    </div >
  );
};

export default SectionSelectionPage;
