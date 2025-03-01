
import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';

interface PromptFormData {
  title: string;
  readingTitle: string;
  readingPassage: string;
  listeningTitle: string;
  audioFile: File | null;
  audioUrl: string;
  promptText: string;
}

const EditIntegratedPrompt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PromptFormData>({
    title: '',
    readingTitle: '',
    readingPassage: '',
    listeningTitle: '',
    audioFile: null,
    audioUrl: '',
    promptText: '',
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        setFormData({
          title: 'Ocean Acidification Effects',
          readingTitle: 'The Impact of Ocean Acidification on Marine Life',
          readingPassage: 'Ocean acidification is the ongoing decrease in the pH of the Earth\'s oceans, caused by the uptake of carbon dioxide from the atmosphere. Seawater is slightly basic (meaning pH > 7), and ocean acidification involves a shift towards pH-neutral conditions rather than a transition to acidic conditions (pH < 7). Ocean acidification is threatening the survival of coral reefs and shellfish populations...',
          listeningTitle: 'Lecture on Effects of Ocean Acidification',
          audioFile: null,
          audioUrl: 'lecture_oceanacidification.mp3',
          promptText: 'Summarize the points made in the lecture, being sure to explain how they challenge specific points made in the reading passage.',
        });
      } catch (error) {
        console.error('Error fetching prompt:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrompt();
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        audioFile: e.target.files[0],
        audioUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically upload the file to storage and then
      // update the prompt data in your database
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      alert('Integrated prompt updated successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error updating the prompt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout
        title="Edit Integrated Writing Prompt"
        breadcrumbItems={[
          { label: "Dashboard", path: "/admin" },
          { label: "Writing Tasks", path: "/admin/writing" },
          { label: "Edit Integrated Prompt", path: `/admin/writing/edit-integrated-prompt/${id}` }
        ]}
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout
      title="Edit Integrated Writing Prompt"
      breadcrumbItems={[
        { label: "Dashboard", path: "/admin" },
        { label: "Writing Tasks", path: "/admin/writing" },
        { label: "Edit Integrated Prompt", path: `/admin/writing/edit-integrated-prompt/${id}` }
      ]}
    >
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Edit Integrated Writing Prompt</h2>
        
        <form onSubmit={handleSubmit}>
          {/* General Info */}
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
            <p className="text-xs text-gray-500 mt-1">Internal title for administration purposes</p>
          </div>
          
          {/* Reading Passage Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Reading Passage</h2>
            
            <div className="mb-4">
              <label htmlFor="readingTitle" className="block text-sm font-medium text-gray-700 mb-1">Reading Passage Title</label>
              <input
                type="text"
                id="readingTitle"
                name="readingTitle"
                value={formData.readingTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="readingPassage" className="block text-sm font-medium text-gray-700 mb-1">Reading Passage Text</label>
              <textarea
                id="readingPassage"
                name="readingPassage"
                value={formData.readingPassage}
                onChange={handleChange}
                rows={8}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
            </div>
          </div>
          
          {/* Listening Passage Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Listening Passage</h2>
            
            <div className="mb-4">
              <label htmlFor="listeningTitle" className="block text-sm font-medium text-gray-700 mb-1">Listening Lecture Title</label>
              <input
                type="text"
                id="listeningTitle"
                name="listeningTitle"
                value={formData.listeningTitle}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            
            <div className="mb-2">
              <p className="text-sm text-gray-600">Current audio file: {formData.audioUrl}</p>
            </div>
            
            <div>
              <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-1">Replace Audio File (optional)</label>
              <input
                type="file"
                id="audioFile"
                name="audioFile"
                accept="audio/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          
          {/* Writing Prompt Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Writing Prompt</h2>
            
            <div>
              <label htmlFor="promptText" className="block text-sm font-medium text-gray-700 mb-1">Prompt Instructions</label>
              <textarea
                id="promptText"
                name="promptText"
                value={formData.promptText}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                required
              ></textarea>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditIntegratedPrompt;
