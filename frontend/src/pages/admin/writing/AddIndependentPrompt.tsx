
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

const AddIndependentPrompt: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    promptText: '',
    instructions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Form submitted:', formData);
    
    // Navigate back to the list
    navigate('/admin/writing/independent');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Add Independent Writing Prompt</h1>
          <p className="text-gray-600">Create a new independent writing prompt for the test.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Prompt Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Prompt Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">A descriptive title for internal reference (not shown to test-takers)</p>
            </div>

            {/* Prompt Text */}
            <div className="mb-6">
              <label htmlFor="promptText" className="block text-sm font-medium text-gray-700 mb-1">Prompt Text</label>
              <textarea
                id="promptText"
                name="promptText"
                value={formData.promptText}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">The writing prompt question that will be shown to test-takers</p>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Task Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">Additional instructions for how to approach the writing task</p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/writing/independent')}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Save Prompt
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddIndependentPrompt;
