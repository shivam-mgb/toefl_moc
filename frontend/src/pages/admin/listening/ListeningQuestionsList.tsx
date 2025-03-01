
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListeningQuestionsList: React.FC = () => {
  // Mock data for initial development
  const [questions, setQuestions] = useState([
    {
      id: 1,
      stem: "What is the main purpose of the professor's lecture?",
      audioFile: "Lecture on Climate Change",
      type: "Multiple Choice"
    },
    {
      id: 2,
      stem: "According to the conversation, what problem is the student facing?",
      audioFile: "Student Advising Conversation",
      type: "Table Completion"
    }
  ]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Listening Questions</h1>
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
              <li className="text-gray-700">Questions</li>
            </ol>
          </nav>
        </div>
        <Link 
          to="/admin/listening/questions/add" 
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
        >
          + Add New Question
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Audio File</label>
            <select 
              className="block w-full border border-gray-300 rounded-md p-2"
              defaultValue=""
            >
              <option value="">All Audio Files</option>
              <option value="1">Lecture on Climate Change</option>
              <option value="2">Student Advising Conversation</option>
            </select>
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question Stem
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audio File
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <tr key={question.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.stem}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <Link to={`/admin/listening/audio/${question.id}`}>
                      {question.audioFile}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {question.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/admin/listening/questions/${question.id}/edit`}
                      className="text-teal-600 hover:text-teal-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this question?")) {
                          setQuestions(questions.filter(q => q.id !== question.id));
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
          <p className="text-gray-500">No listening questions created yet.</p>
          <Link 
            to="/admin/listening/questions/add" 
            className="mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Create your first question
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListeningQuestionsList;
