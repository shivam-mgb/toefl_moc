
import React, { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import Breadcrumb from './Breadcrumb';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbItems: { label: string; path: string }[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  breadcrumbItems 
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
