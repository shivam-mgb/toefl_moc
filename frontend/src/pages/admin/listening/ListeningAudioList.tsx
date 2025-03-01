
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListeningAudioList: React.FC = () => {
  // Mock data for initial development
  const [audioFiles, setAudioFiles] = useState([
    {
      id: 1,
      title: "Lecture on Climate Change",
      type: "Lecture",
      duration: "5:30",
      questionsCount: 3
    },
    {
      id: 2,
      title: "Student Advising Conversation",
      type: "Conversation",
      duration: "3:15",
      questionsCount: 2
    }
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Listening Audio Files</h1>
          <nav className="text-sm text-gray-500">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/admin" className="hover:text-teal-600">Dashboard</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/admin/listening" className="hover:text-teal-600">Listening</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-700">Audio Files</li>
            </ol>
          </nav>
        </div>
        <Link 
          to="/admin/listening/audio/add" 
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
        >
          + Add New Audio
        </Link>
      </div>

      {audioFiles.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {audioFiles.map((audio) => (
                <tr key={audio.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800">
                    <Link to={`/admin/listening/audio/${audio.id}`}>
                      {audio.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {audio.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {audio.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {audio.questionsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/admin/listening/audio/${audio.id}`}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      View
                    </Link>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this audio file? This will also delete all associated questions.")) {
                          setAudioFiles(audioFiles.filter(a => a.id !== audio.id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">No listening audio files created yet.</p>
          <Link 
            to="/admin/listening/audio/add" 
            className="mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Upload your first audio file
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListeningAudioList;
