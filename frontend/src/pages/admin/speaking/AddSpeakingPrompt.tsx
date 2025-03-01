
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddSpeakingPrompt: React.FC = () => {
  const { taskType } = useParams<{ taskType: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    promptText: '',
    prepTime: 15,
    responseTime: 45,
    audioUrl: '',
    readingPassage: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getTaskTypeName = () => {
    switch (taskType) {
      case 'independent': return 'Independent Speaking';
      case 'campus': return 'Integrated - Campus Situation';
      case 'academic': return 'Integrated - Academic Course Topic';
      case 'lecture': return 'Integrated - Lecture Summary';
      default: return 'Unknown Task Type';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prepTime' || name === 'responseTime' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend API
      console.log('Submitting form data:', { ...formData, taskType });
      
      // Mock successful submission
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin/speaking/prompts');
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/admin/speaking/prompts');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Speaking Prompt</h1>
        <p className="text-gray-600">Task Type: {getTaskTypeName()}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Prompt Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="promptText">
            Prompt Text
          </label>
          <textarea
            id="promptText"
            name="promptText"
            value={formData.promptText}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>
        
        {(taskType === 'campus' || taskType === 'academic') && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="readingPassage">
              Reading Passage
            </label>
            <textarea
              id="readingPassage"
              name="readingPassage"
              value={formData.readingPassage}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            />
          </div>
        )}
        
        {taskType !== 'independent' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="audioUrl">
              Audio File URL
            </label>
            <input
              type="text"
              id="audioUrl"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prepTime">
              Preparation Time (seconds)
            </label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responseTime">
              Response Time (seconds)
            </label>
            <input
              type="number"
              id="responseTime"
              name="responseTime"
              value={formData.responseTime}
              onChange={handleChange}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Prompt'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpeakingPrompt;
