import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      { label: "Single Passage (Task)" }
    ]
  },
  {
    title: "Listening Section",
    description: "Assesses understanding of spoken English in academic settings.",
    fullTestLabel: "Take Full Listening Section Test",
    taskOptions: [
      { label: "Conversation Task" },
      { label: "Lecture Task" }
    ]
  },
  {
    title: "Speaking Section",
    description: "Assesses spoken English proficiency in academic and general contexts.",
    fullTestLabel: "Take Full Speaking Section Test",
    taskOptions: [
      { label: "Speaking Task 1" },
      { label: "Speaking Task 2" },
      { label: "Speaking Task 3" },
      { label: "Speaking Task 4" }
    ]
  },
  {
    title: "Writing Section",
    description: "Assesses written English proficiency in academic settings.",
    fullTestLabel: "Take Full Writing Section Test",
    taskOptions: [
      { label: "Integrated Writing Task" },
      { label: "Independent Writing Task" }
    ]
  }
];

const SectionSelectionPage: React.FC = () => {
  const navigate = useNavigate();
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
              onFullTestClick={() => {
                switch (section.title) {
                  case "Reading Section":
                    navigate("/reading-section-intro");
                    break;
                  case "Listening Section":
                    navigate("/listening-section-intro");
                    break;
                  case "Speaking Section":
                    navigate("/speaking-section-intro");
                    break;
                  case "Writing Section":
                    navigate("/writing-section-intro");
                    break;
                  default:
                    console.log("Unknown section:", section.title);
                }
              }}
              taskOptions={section.taskOptions}
              onTaskClick={(taskLabel) => {
                if (section.title === "Reading Section" && taskLabel === "Single Passage (Task)") {
                  navigate("/reading-single-passage-task-list");
                } else {
                  console.log(`Task ${taskLabel} clicked in ${section.title}`);
                }
              }}
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
