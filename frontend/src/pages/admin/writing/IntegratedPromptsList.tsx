
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

interface IntegratedPrompt {
  id: string;
  title: string;
  readingPassage: {
    title: string;
    text: string;
  };
  listeningPassage: {
    title: string;
    audioUrl: string;
  };
  instructions: string;
  createdAt: string;
}

const IntegratedPromptsList: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [prompts, setPrompts] = useState<IntegratedPrompt[]>([
    {
      id: '1',
      title: 'Academic Integrity in Research',
      readingPassage: {
        title: 'The Importance of Academic Integrity',
        text: 'Academic integrity refers to the ethical policy or moral code of academia...'
      },
      listeningPassage: {
        title: 'Lecture on Academic Integrity',
        audioUrl: '/audio/academic-integrity.mp3'
      },
      instructions: 'Summarize the points made in the lecture, being sure to explain how they challenge specific points made in the reading passage.',
      createdAt: '2023-10-15'
    },
    {
      id: '2',
      title: 'Remote Work and Productivity',
      readingPassage: {
        title: 'The Benefits of Remote Work',
        text: 'Remote work has been shown to increase productivity in various studies...'
      },
      listeningPassage: {
        title: 'Lecture on Remote Work Challenges',
        audioUrl: '/audio/remote-work.mp3'
      },
      instructions: 'Summarize the points made in the lecture, being sure to explain how they cast doubt on points made in the reading passage.',
      createdAt: '2023-11-02'
    }
  ]);

  const handleDelete = (id: string) => {
    // In a real app, this would make an API call to delete the prompt
    setPrompts(prompts.filter(prompt => prompt.id !== id));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Integrated Writing Prompts</h1>
            <p className="text-gray-600">Manage integrated writing prompts for the test.</p>
          </div>
          <Link 
            to="/admin/writing/integrated/add" 
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            Add New Prompt
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reading Passage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prompts.map((prompt) => (
                <tr key={prompt.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{prompt.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{prompt.readingPassage.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{prompt.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link to={`/admin/writing/integrated/${prompt.id}/edit`} className="text-teal-600 hover:text-teal-900">Edit</Link>
                      <button 
                        onClick={() => handleDelete(prompt.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default IntegratedPromptsList;
