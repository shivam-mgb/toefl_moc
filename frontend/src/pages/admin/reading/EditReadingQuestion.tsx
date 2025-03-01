
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import FormField from '../../../components/admin/FormField';
import ActionButton from '../../../components/admin/ActionButton';

interface Passage {
  id: string;
  title: string;
}

interface Question {
  id: string;
  passageId: string;
  questionText: string;
  questionType: 'multiple-choice' | 'multiple-select' | 'insert-text';
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
}

const EditReadingQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [passages, setPassages] = useState<Passage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<Question>({
    id: '',
    passageId: '',
    questionText: '',
    questionType: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  useEffect(() => {
    // Mock API calls to fetch question and passages
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock passages data
        setPassages([
          { id: '1', title: 'The History of Science' },
          { id: '2', title: 'Climate Change and Its Effects' },
          { id: '3', title: 'Modern Architecture' }
        ]);
        
        // Mock question data
        setQuestion({
          id: id || '1',
          passageId: '2',
          questionText: 'What is the main cause of climate change according to the passage?',
          questionType: 'multiple-choice',
          options: [
            'Natural climate cycles',
            'Human-induced greenhouse gas emissions',
            'Solar activity',
            'Volcanic eruptions'
          ],
          correctAnswer: 'B',
          explanation: 'The passage clearly states that human-induced greenhouse gas emissions are the primary driver of modern climate change.'
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const addOption = () => {
    setQuestion({ ...question, options: [...question.options, ''] });
  };

  const removeOption = (index: number) => {
    if (question.options.length <= 2) return;
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would be an API call to update the question
      console.log('Updating question:', question);
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/admin/reading/questions');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <AdminLayout
      title="Edit Reading Question"
      breadcrumbItems={[
        { label: 'Admin Dashboard', path: '/admin' },
        { label: 'Reading Questions', path: '/admin/reading/questions' },
        { label: 'Edit Question', path: `/admin/reading/questions/${id}/edit` }
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
              <div className="form-group">
                <label htmlFor="passageId" className="block text-sm font-medium text-gray-700 mb-1">
                  Reading Passage
                </label>
                <select
                  id="passageId"
                  name="passageId"
                  value={question.passageId}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select a passage</option>
                  {passages.map(passage => (
                    <option key={passage.id} value={passage.id}>
                      {passage.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <textarea
                  id="questionText"
                  name="questionText"
                  rows={3}
                  value={question.questionText}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  id="questionType"
                  name="questionType"
                  value={question.questionType}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="multiple-select">Multiple Select</option>
                  <option value="insert-text">Insert Text</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Answer Options
                </label>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm text-teal-600 hover:text-teal-800"
                >
                  + Add Option
                </button>
              </div>

              <FormField
                label="Correct Answer"
                id="correctAnswer"
                name="correctAnswer"
                type="text"
                value={question.correctAnswer as string}
                onChange={handleChange}
                required
                helperText="For multiple choice, enter the letter (A, B, C, etc.). For multiple select, enter letters separated by commas."
              />

              <div className="form-group">
                <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation
                </label>
                <textarea
                  id="explanation"
                  name="explanation"
                  rows={3}
                  value={question.explanation}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <ActionButton
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/admin/reading/questions')}
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

export default EditReadingQuestion;
