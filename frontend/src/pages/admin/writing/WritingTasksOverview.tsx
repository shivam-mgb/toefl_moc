
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

const WritingTasksOverview: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Writing Section Management</h1>
          <p className="text-gray-600">Manage writing tasks and prompts for the test.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Integrated Writing Task Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-teal-600 mb-3">Integrated Writing Task</h2>
            <p className="text-gray-600 mb-4">
              Manage integrated writing tasks that require students to read a passage, 
              listen to a lecture, and write a response that integrates both sources.
            </p>
            <div className="flex space-x-3">
              <Link 
                to="/admin/writing/integrated" 
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Manage Prompts
              </Link>
              <Link 
                to="/admin/writing/integrated/add" 
                className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors"
              >
                Add New Prompt
              </Link>
            </div>
          </div>

          {/* Independent Writing Task Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-teal-600 mb-3">Independent Writing Task</h2>
            <p className="text-gray-600 mb-4">
              Manage independent writing tasks that require students to write an essay 
              based on their knowledge and experience.
            </p>
            <div className="flex space-x-3">
              <Link 
                to="/admin/writing/independent" 
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Manage Prompts
              </Link>
              <Link 
                to="/admin/writing/independent/add" 
                className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors"
              >
                Add New Prompt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WritingTasksOverview;
