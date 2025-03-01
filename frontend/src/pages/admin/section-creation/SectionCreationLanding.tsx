import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from "../../../layouts/AdminLayout";

const SectionCreationLanding: React.FC = () => {
  return (
    <AdminLayout
      title="Section Creation"
      breadcrumbItems={[
        { label: "Admin Dashboard", path: "/admin" },
        { label: "Section Creation", path: "/admin/section-creation" }
      ]}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Test Sections</h2>
          <p className="text-gray-600 mb-8">
            Choose a section type below to start creating a complete test section with a guided workflow.
            Each section type has specific configuration steps tailored to its requirements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionTypeCard 
              title="Reading Section"
              description="Create a complete reading section with passages and questions"
              path="/admin/section-creation/reading"
              icon="📚"
            />
            
            <SectionTypeCard 
              title="Listening Section"
              description="Create a complete listening section with audio and questions"
              path="/admin/section-creation/listening"
              icon="🎧"
            />
            
            <SectionTypeCard 
              title="Speaking Section"
              description="Create a complete speaking section with tasks"
              path="/admin/section-creation/speaking"
              icon="🗣️"
            />
            
            <SectionTypeCard 
              title="Writing Section"
              description="Create a complete writing section with tasks"
              path="/admin/section-creation/writing"
              icon="✍️"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Link
            to="/admin"
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

interface SectionTypeCardProps {
  title: string;
  description: string;
  path: string;
  icon: string;
}

const SectionTypeCard: React.FC<SectionTypeCardProps> = ({ title, description, path, icon }) => {
  return (
    <Link 
      to={path} 
      className="block bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-5 transition-colors"
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-3 text-sm text-teal-600">Start creation →</div>
        </div>
      </div>
    </Link>
  );
};

export default SectionCreationLanding;