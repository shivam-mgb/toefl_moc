import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const TestResultsList: React.FC = () => {
  // Mock data for test results
  const testResults = [
    { id: 1, username: 'student1', testDate: '2023-10-12', score: 85, duration: '1:45:32' },
    { id: 2, username: 'student2', testDate: '2023-10-11', score: 92, duration: '1:30:15' },
    { id: 3, username: 'student3', testDate: '2023-10-10', score: 78, duration: '1:55:47' },
    { id: 4, username: 'student4', testDate: '2023-10-09', score: 88, duration: '1:40:22' },
    { id: 5, username: 'student5', testDate: '2023-10-08', score: 73, duration: '1:58:10' },
  ];

  return (
    <AdminLayout
      title="Test Results"
      breadcrumbItems={[
        { label: 'Admin Dashboard', path: '/admin' },
        { label: 'Test Results', path: '/admin/test-results' }
      ]}
    >
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Test Submissions</h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage test attempt results from all users.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.testDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.score >= 90 ? 'bg-green-100 text-green-800' :
                      result.score >= 80 ? 'bg-blue-100 text-blue-800' :
                      result.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">12</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-teal-50 text-sm font-medium text-teal-600 hover:bg-teal-100">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TestResultsList;