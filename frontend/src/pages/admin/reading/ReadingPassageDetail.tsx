
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import ActionButton from '../../../components/admin/ActionButton';
import DataTable from '../../../components/admin/DataTable';

// Mock data - would be replaced with API calls
const mockPassage = {
  id: '1',
  title: 'The Origins of Agriculture',
  text: `Agriculture, the cultivation of plants and animals for food and other products, marks a pivotal shift in human history. About 10,000 years ago, humans began domesticating plants and animals, leading to the establishment of permanent settlements. This Neolithic Revolution, as it is called, occurred independently in several regions across the globe.
    
The earliest evidence of plant domestication comes from the Fertile Crescent, a region spanning parts of modern-day Iraq, Syria, Lebanon, Israel, and Jordan. Here, around 9500 BCE, humans began cultivating wild grains such as wheat and barley. This transition was not immediate but occurred gradually over thousands of years as humans selected plants with desirable traits, such as larger seeds or non-shattering seed heads.
    
In East Asia, rice cultivation began along the Yangtze River in China around 8000 BCE. Mesoamericans domesticated maize (corn) from a wild grass called teosinte beginning around 7000 BCE, a process that significantly altered the plant's morphology. In the Andean region of South America, people domesticated potatoes, while inhabitants of the Amazon Basin cultivated manioc.
    
Animal domestication occurred alongside plant domestication. Dogs were the first animals to be domesticated, likely from wolves, for hunting and protection. Later, humans domesticated sheep, goats, cattle, and pigs for meat, milk, and hides.
    
The shift to agriculture had profound implications for human societies. It allowed for population growth, as farming could support more people per unit of land than hunting and gathering. It led to food surpluses, which enabled some individuals to specialize in crafts, religion, or governance rather than food production. This division of labor contributed to the development of more complex societies.
    
Agriculture also had environmental impacts. Farmers cleared forests for fields, leading to habitat loss. Irrigation systems could cause soil salinization. Monoculture—the cultivation of a single crop over a large area—increased susceptibility to pests and diseases. Despite these challenges, agriculture remains the foundation of human subsistence, though modern methods differ greatly from those of early farmers.`,
  wordCount: 320,
  createdDate: '2024-07-28'
};

// Mock questions for this passage
const mockQuestions = [
  {
    id: '101',
    questionStem: 'According to the passage, which of the following was the earliest plant domestication site?',
    questionType: 'Multiple Choice (Single Answer)',
  },
  {
    id: '102',
    questionStem: 'The passage suggests that the development of agriculture led to which of the following social changes?',
    questionType: 'Multiple Choice (Single Answer)',
  },
  {
    id: '103',
    questionStem: 'In paragraph 4, the author implies that the primary reason for animal domestication was:',
    questionType: 'Multiple Choice (Multiple Answers)',
  },
  {
    id: '104',
    questionStem: 'Insert the following sentence in the appropriate location: "This ability to store food also provided a buffer against years of poor harvests."',
    questionType: 'Insert Text',
  },
];

const ReadingPassageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real implementation, you would fetch the passage data using the id
  
  // Table columns for questions
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
      title={`${mockPassage.title} - View and Manage Questions`} 
      breadcrumbItems={[
        { label: 'Admin', path: '/admin' },
        { label: 'Reading', path: '/admin/reading' },
        { label: 'Passages', path: '/admin/reading/passages' },
        { label: mockPassage.title, path: `/admin/reading/passages/${id}` },
      ]}
    >
      {/* Passage Details Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{mockPassage.title}</h2>
            <ActionButton 
              to={`/admin/reading/passages/${id}/edit`}
              variant="secondary"
            >
              Edit Passage
            </ActionButton>
          </div>
          <div className="bg-gray-50 p-4 rounded-md max-h-64 overflow-y-auto">
            <p className="whitespace-pre-line">{mockPassage.text}</p>
          </div>
        </div>
      </div>
      
      {/* Questions Management Section */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Questions for this Passage</h3>
          <ActionButton 
            to={`/admin/reading/questions/add?passageId=${id}`}
          >
            + Add New Question
          </ActionButton>
        </div>
        
        <div className="p-6">
          {mockQuestions.length > 0 ? (
            <DataTable
              columns={columns}
              data={mockQuestions}
              emptyMessage="No questions created for this passage yet."
            />
          ) : (
            <div className="text-center p-4 text-gray-500">
              No questions created for this passage yet.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReadingPassageDetail;
