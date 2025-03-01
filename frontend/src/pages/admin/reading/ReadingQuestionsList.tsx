
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import ActionButton from '../../../components/admin/ActionButton';
import DataTable from '../../../components/admin/DataTable';

// Mock data for passages (would come from API)
const mockPassages = [
  { id: '1', title: 'The Origins of Agriculture' },
  { id: '2', title: 'Urbanization in the Modern World' },
  { id: '3', title: 'Climate Change Effects on Biodiversity' },
];

// Mock data for questions (would come from API)
const mockQuestions = [
  {
    id: '101',
    questionStem: 'According to the passage, which of the following was the earliest plant domestication site?',
    passageId: '1',
    passageTitle: 'The Origins of Agriculture',
    questionType: 'Multiple Choice (Single Answer)',
  },
  {
    id: '102',
    questionStem: 'The passage suggests that the development of agriculture led to which of the following social changes?',
    passageId: '1',
    passageTitle: 'The Origins of Agriculture',
    questionType: 'Multiple Choice (Single Answer)',
  },
  {
    id: '103',
    questionStem: 'Based on the information in paragraph 3, which of the following is NOT mentioned as a consequence of urbanization?',
    passageId: '2',
    passageTitle: 'Urbanization in the Modern World',
    questionType: 'Multiple Choice (Multiple Answers)',
  },
  {
    id: '104',
    questionStem: 'Insert the following sentence in the appropriate location: "This ability to store food also provided a buffer against years of poor harvests."',
    passageId: '1',
    passageTitle: 'The Origins of Agriculture',
    questionType: 'Insert Text',
  },
];

const ReadingQuestionsList: React.FC = () => {
  // State for filtering
  const [selectedPassage, setSelectedPassage] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sort the data
  const filteredQuestions = selectedPassage 
    ? mockQuestions.filter(q => q.passageId === selectedPassage) 
    : mockQuestions;
  
  // Table columns configuration
  const columns = [
    {
      header: 'Question Stem',
      accessor: 'questionStem',
      cell: (value: string, row: any) => (
        <div className="truncate max-w-lg">
          <Link to={`/admin/reading/questions/${row.id}/edit`} className="text-teal-600 hover:underline">
            {value}
          </Link>
        </div>
      ),
    },
    {
      header: 'Passage',
      accessor: 'passageTitle',
      cell: (value: string, row: any) => (
        <Link to={`/admin/reading/passages/${row.passageId}`} className="text-teal-600 hover:underline">
          {value}
        </Link>
      ),
    },
    {
      header: 'Question Type',
      accessor: 'questionType',
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value: string) => (
        <div className="flex space-x-2">
          <Link 
            to={`/admin/reading/questions/${value}/edit`} 
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
          <button 
            onClick={() => alert(`Delete question ${value} - to be implemented`)} 
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  
  return (
    <AdminLayout 
      title="Reading Questions" 
      breadcrumbItems={[
        { label: 'Admin', path: '/admin' },
        { label: 'Reading', path: '/admin/reading' },
        { label: 'Questions', path: '/admin/reading/questions' },
      ]}
    >
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <ActionButton to="/admin/reading/questions/add">
            + Add New Question
          </ActionButton>
          <ActionButton 
            variant="secondary" 
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </ActionButton>
        </div>
      </div>
      
      {/* Filters Area */}
      {showFilters && (
        <div className="bg-white p-4 shadow rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="passageFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Passage
              </label>
              <select
                id="passageFilter"
                value={selectedPassage}
                onChange={(e) => setSelectedPassage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option value="">All Passages</option>
                {mockPassages.map((passage) => (
                  <option key={passage.id} value={passage.id}>
                    {passage.title}
                  </option>
                ))}
              </select>
            </div>
            {/* Additional filters can be added here */}
          </div>
        </div>
      )}
      
      <DataTable
        columns={columns}
        data={filteredQuestions}
        emptyMessage="No reading questions created yet."
      />
    </AdminLayout>
  );
};

export default ReadingQuestionsList;
