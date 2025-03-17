import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

const sections = [
  { title: "Reading Section", route: "/reading" },
  { title: "Listening Section", route: "/listening" },
  { title: "Speaking Section", route: "/speaking" },
  { title: "Writing Section", route: "/writing" },
];

const SectionSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu sectionTitle="Choose a Section to Practice" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(section.route)}
              className="bg-white rounded-xl shadow-md p-10 hover:shadow-lg transition-all duration-300 cursor-pointer 
                hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                border border-gray-100 min-h-[150px] flex items-center justify-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {section.title}
              </h2>
            </div>
          ))}
        </div>
      </main>

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

export default SectionSelectionPage;