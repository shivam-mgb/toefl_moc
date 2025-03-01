
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-xl">Admin Panel</div>
        <nav className="mt-6">
          <a href="/admin" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/admin/section-creation" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            Section Creation
          </a>
          <a href="/admin/test-results" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
            Test Results
          </a>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Panel
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
