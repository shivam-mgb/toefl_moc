
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import FormField from '../../../components/admin/FormField';
import ActionButton from '../../../components/admin/ActionButton';

interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: string;
}

const EditReadingPassage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [passage, setPassage] = useState<ReadingPassage>({
    id: '',
    title: '',
    content: '',
    category: '',
    difficulty: 'medium'
  });

  useEffect(() => {
    // Mock API call to fetch passage data
    const fetchPassage = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        setPassage({
          id: id || '1',
          title: 'Sample Reading Passage',
          content: 'This is a sample reading passage content...',
          category: 'Science',
          difficulty: 'medium'
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching passage:', error);
        setIsLoading(false);
      }
    };

    fetchPassage();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPassage({ ...passage, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would be an API call to update the passage
      console.log('Updating passage:', passage);
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/admin/reading/passages');
    } catch (error) {
      console.error('Error updating passage:', error);
    }
  };

  return (
    <AdminLayout
      title="Edit Reading Passage"
      breadcrumbItems={[
        { label: 'Admin Dashboard', path: '/admin' },
        { label: 'Reading Passages', path: '/admin/reading/passages' },
        { label: 'Edit Passage', path: `/admin/reading/passages/${id}/edit` }
      ]}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <FormField
                label="Title"
                id="title"
                name="title"
                type="text"
                value={passage.title}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Category"
                  id="category"
                  name="category"
                  type="text"
                  value={passage.category}
                  onChange={handleChange}
                  required
                />

                <div className="form-group">
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={passage.difficulty}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Passage Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  value={passage.content}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <ActionButton
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/admin/reading/passages')}
                  label="Cancel"
                />
                <ActionButton
                  type="submit"
                  variant="primary"
                  label="Save Changes"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditReadingPassage;
