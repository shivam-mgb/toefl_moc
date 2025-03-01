
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

interface IndependentPrompt {
  id: string;
  title: string;
  promptText: string;
  instructions: string;
  createdAt: string;
}

const IndependentPromptsList: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [prompts, setPrompts] = useState<IndependentPrompt[]>([
    {
      id: '1',
      title: 'Technology and Education',
      promptText: 'Do you agree or disagree with the following statement? Technology has made education more accessible and effective for students around the world.',
      instructions: 'Write an essay in which you state your position clearly and explain your reasons with specific examples and relevant details.',
      createdAt: '2023-10-12'
    },
    {
      id: '2',
      title: 'Success Factors',
      promptText: 'What do you consider to be the most important factor that contributes to success in life? Why?',
      instructions: 'Write an essay in which you develop your point of view on this issue. Support your position with reasoning and examples taken from your reading, studies, experience, or observations.',
      createdAt: '2023-11-05'
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Independent Writing Prompts</h1>
            <p className="text-gray-600">Manage independent writing prompts for the test.</p>
          </div>
          <Link 
            to="/admin/writing/independent/add" 
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prompt Text</th>
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
                    <div className="text-sm text-gray-900 truncate max-w-xs">{prompt.promptText}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{prompt.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <Link to={`/admin/writing/independent/${prompt.id}/edit`} className="text-teal-600 hover:text-teal-900">Edit</Link>
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

export default IndependentPromptsList;
