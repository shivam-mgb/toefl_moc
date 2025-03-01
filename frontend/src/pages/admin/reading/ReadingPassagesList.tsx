
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import ActionButton from '../../../components/admin/ActionButton';
import DataTable from '../../../components/admin/DataTable';

// Mock data - would be replaced with API calls in a real implementation
const mockPassages = [
  { 
    id: '1', 
    title: 'The Origins of Agriculture', 
    wordCount: 720, 
    questionCount: 10, 
    createdDate: '2024-07-28' 
  },
  { 
    id: '2', 
    title: 'Urbanization in the Modern World', 
    wordCount: 685, 
    questionCount: 8, 
    createdDate: '2024-07-27' 
  },
  { 
    id: '3', 
    title: 'Climate Change Effects on Biodiversity', 
    wordCount: 750, 
    questionCount: 12, 
    createdDate: '2024-07-26' 
  },
];

const ReadingPassagesList: React.FC = () => {
  // State for sorting
  const [sortColumn, setSortColumn] = useState('createdDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Handler for sorting
  const handleSort = (accessor: string) => {
    if (sortColumn === accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(accessor);
      setSortDirection('asc');
    }
  };
  
  // Sort the data
  const sortedData = [...mockPassages].sort((a, b) => {
    if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Table columns configuration
  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      sortable: true,
      cell: (value: string, row: any) => (
        <Link to={`/admin/reading/passages/${row.id}`} className="text-teal-600 hover:underline">
          {value}
        </Link>
      ),
    },
    {
      header: 'Word Count',
      accessor: 'wordCount',
      sortable: true,
    },
    {
      header: 'Question Count',
      accessor: 'questionCount',
      sortable: true,
    },
    {
      header: 'Created Date',
      accessor: 'createdDate',
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value: string) => (
        <div className="flex space-x-2">
          <Link 
            to={`/admin/reading/passages/${value}/edit`} 
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </Link>
          <button 
            onClick={() => alert(`Delete passage ${value} - to be implemented`)} 
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
      title="Reading Passages" 
      breadcrumbItems={[
        { label: 'Admin', path: '/admin' },
        { label: 'Reading', path: '/admin/reading' },
        { label: 'Passages', path: '/admin/reading/passages' },
      ]}
    >
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <ActionButton to="/admin/reading/passages/add">
            + Add New Passage
          </ActionButton>
          <ActionButton variant="secondary" onClick={() => alert('Filters not implemented yet')}>
            Filters
          </ActionButton>
        </div>
        
        {/* Search Bar (future) */}
        {/* <div className="w-64">
          <input
            type="text"
            placeholder="Search passages..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
          />
        </div> */}
      </div>
      
      <DataTable
        columns={columns}
        data={sortedData}
        emptyMessage="No reading passages created yet."
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </AdminLayout>
  );
};

export default ReadingPassagesList;
