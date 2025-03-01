
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout 
      title="TOEFL iBT Test Simulator Admin Panel" 
      breadcrumbItems={[{ label: 'Admin Dashboard', path: '/admin' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SectionCard
          title="Reading"
          description="Manage reading passages and questions"
          links={[
            { label: 'Manage Passages', path: '/admin/reading/passages' },
            { label: 'Manage Questions', path: '/admin/reading/questions' }
          ]}
        />
        <SectionCard
          title="Listening"
          description="Manage listening audio files and questions"
          links={[
            { label: 'Manage Audio Files', path: '/admin/listening/audio' },
            { label: 'Manage Questions', path: '/admin/listening/questions' }
          ]}
        />
        <SectionCard
          title="Speaking"
          description="Manage speaking tasks and prompts"
          links={[
            { label: 'Task Overview', path: '/admin/speaking/overview' },
            { label: 'Manage Prompts', path: '/admin/speaking/prompts' }
          ]}
        />
        <SectionCard
          title="Writing"
          description="Manage writing tasks and prompts"
          links={[
            { label: 'Task Overview', path: '/admin/writing/overview' },
            { label: 'Integrated Prompts', path: '/admin/writing/integrated' },
            { label: 'Independent Prompts', path: '/admin/writing/independent' }
          ]}
        />
        <SectionCard
          title="Section Creation"
          description="Create full test sections with guided workflows"
          links={[
            { label: 'Start Section Creation', path: '/admin/section-creation' }
          ]}
        />
        <SectionCard
          title="Test Results"
          description="View and manage test attempt results"
          links={[
            { label: 'View Test Results', path: '/admin/test-results' }
          ]}
        />
      </div>
    </AdminLayout>
  );
};

interface SectionCardProps {
  title: string;
  description: string;
  links: { label: string; path: string }[];
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, links }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="space-y-2">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-sm text-teal-600 hover:text-teal-800 block"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
