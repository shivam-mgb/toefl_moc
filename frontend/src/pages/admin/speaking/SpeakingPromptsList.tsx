
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SpeakingPrompt {
  id: string;
  taskType: string;
  title: string;
  createdAt: string;
  promptText: string;
}

const SpeakingPromptsList: React.FC = () => {
  const [prompts, setPrompts] = useState<SpeakingPrompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Mock data - replace with actual API call in production
    const mockPrompts: SpeakingPrompt[] = [
      {
        id: '1',
        taskType: 'independent',
        title: 'Favorite Hobby',
        createdAt: '2023-06-15',
        promptText: 'Describe your favorite hobby and explain why you enjoy it.'
      },
      {
        id: '2',
        taskType: 'campus',
        title: 'Library Policy Change',
        createdAt: '2023-06-18',
        promptText: 'A new library policy has been proposed. After reading about the policy, you will hear two students discussing it.'
      },
      {
        id: '3',
        taskType: 'academic',
        title: 'Photosynthesis Process',
        createdAt: '2023-06-20',
        promptText: 'Read about the process of photosynthesis, then listen to a professor explain a related concept.'
      }
    ];
    
    setPrompts(mockPrompts);
    setLoading(false);
  }, []);

  const getTaskTypeLabel = (type: string): string => {
    switch (type) {
      case 'independent': return 'Task 1: Independent Speaking';
      case 'campus': return 'Task 2: Campus Situation';
      case 'academic': return 'Task 3: Academic Course';
      case 'lecture': return 'Task 4: Lecture Summary';
      default: return type;
    }
  };

  const filteredPrompts = filter === 'all' 
    ? prompts
    : prompts.filter(prompt => prompt.taskType === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Speaking Prompts</h1>
        <div className="flex gap-2">
          <select 
            className="border rounded px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="independent">Task 1: Independent</option>
            <option value="campus">Task 2: Campus Situation</option>
            <option value="academic">Task 3: Academic Course</option>
            <option value="lecture">Task 4: Lecture Summary</option>
          </select>
          <div className="dropdown">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Add New Prompt
            </button>
            <div className="dropdown-menu hidden absolute bg-white shadow-md rounded-md p-2 border mt-1">
              <Link to="/admin/speaking/prompts/add/independent" className="block py-1 px-3 hover:bg-gray-100 rounded">Task 1: Independent</Link>
              <Link to="/admin/speaking/prompts/add/campus" className="block py-1 px-3 hover:bg-gray-100 rounded">Task 2: Campus Situation</Link>
              <Link to="/admin/speaking/prompts/add/academic" className="block py-1 px-3 hover:bg-gray-100 rounded">Task 3: Academic Course</Link>
              <Link to="/admin/speaking/prompts/add/lecture" className="block py-1 px-3 hover:bg-gray-100 rounded">Task 4: Lecture Summary</Link>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading prompts...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrompts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No prompts found.
                  </td>
                </tr>
              ) : (
                filteredPrompts.map((prompt) => (
                  <tr key={prompt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{prompt.title}</div>
                      <div className="text-sm text-gray-500">{prompt.promptText.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {getTaskTypeLabel(prompt.taskType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prompt.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/admin/speaking/prompts/${prompt.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpeakingPromptsList;
