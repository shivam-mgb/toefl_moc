
import React from 'react';
import { Link } from 'react-router-dom';

const SpeakingTasksOverview: React.FC = () => {
  const speakingTasks = [
    {
      id: 1,
      title: 'Speaking Task 1: Independent Speaking',
      description: 'In this task, students speak about a familiar topic based on their own ideas and experiences.',
      route: '/admin/speaking/prompts/add/independent'
    },
    {
      id: 2,
      title: 'Speaking Task 2: Integrated - Campus Situation',
      description: 'Students read a short passage about a campus situation and then listen to a conversation on the same topic before speaking.',
      route: '/admin/speaking/prompts/add/campus'
    },
    {
      id: 3,
      title: 'Speaking Task 3: Integrated - Academic Course Topic',
      description: 'Students read a short academic passage and then listen to a lecture segment on the same topic before speaking.',
      route: '/admin/speaking/prompts/add/academic'
    },
    {
      id: 4,
      title: 'Speaking Task 4: Integrated - Lecture Summary',
      description: 'Students listen to a short lecture and then summarize the important points and provide details.',
      route: '/admin/speaking/prompts/add/lecture'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Speaking Section Management</h1>
        <Link 
          to="/admin/speaking/prompts" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          View All Prompts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {speakingTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <Link 
              to={task.route} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
            >
              Manage Task {task.id} Prompts
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakingTasksOverview;
