import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { fetchSpeakingSections } from '../api/api';
import { GetSections } from '../types/types';

const SpeakingSectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<GetSections['sections']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const data = await fetchSpeakingSections();
        setSections(data.sections);
      } catch (err) {
        setError('Error loading speaking sections');
      } finally {
        setLoading(false);
      }
    };
    loadSections();
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/speaking-intro/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-gray-600">Loading...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100"><p className="text-red-600">{error}</p></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu sectionTitle="Speaking Sections" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleCardClick(section.id)}
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

export default SpeakingSectionsPage;