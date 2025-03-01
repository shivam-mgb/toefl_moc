
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  children?: { to: string; label: string }[];
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, children, active }) => {
  const [expanded, setExpanded] = useState(active);
  
  return (
    <div className="mb-2">
      <div 
        className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
          active ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-teal-50'
        }`}
        onClick={() => children && setExpanded(!expanded)}
      >
        <Link to={to} className="w-full">{label}</Link>
        {children && (
          <svg 
            className={`w-5 h-5 transition-transform ${expanded ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      
      {children && expanded && (
        <div className="ml-4 mt-1 space-y-1">
          {children.map((child, index) => (
            <Link 
              key={index} 
              to={child.to} 
              className={`block px-4 py-2 text-sm rounded-md ${
                location.pathname === child.to
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-600 hover:bg-teal-50'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-bold text-teal-600">Admin Panel</h2>
        <p className="text-xs text-gray-500">TOEFL iBT Test Simulator</p>
      </div>
      
      <nav className="mt-6 px-2">
        <NavItem 
          to="/admin/reading" 
          label="Reading" 
          active={isActive('/admin/reading')}
          children={[
            { to: '/admin/reading/passages', label: 'Passages' },
            { to: '/admin/reading/questions', label: 'Questions' },
          ]}
        />
        
        <NavItem 
          to="/admin/listening" 
          label="Listening" 
          active={isActive('/admin/listening')}
          children={[
            { to: '/admin/listening/audio', label: 'Audio' },
            { to: '/admin/listening/questions', label: 'Questions' },
          ]}
        />
        
        <NavItem 
          to="/admin/speaking" 
          label="Speaking" 
          active={isActive('/admin/speaking')}
          children={[
            { to: '/admin/speaking/overview', label: 'Tasks Overview' },
            { to: '/admin/speaking/prompts', label: 'All Prompts' },
          ]}
        />
        
        <NavItem 
          to="/admin/writing" 
          label="Writing" 
          active={isActive('/admin/writing')}
          children={[
            { to: '/admin/writing/overview', label: 'Tasks Overview' },
            { to: '/admin/writing/integrated', label: 'Integrated Prompts' },
            { to: '/admin/writing/independent', label: 'Independent Prompts' },
          ]}
        />
        
        <NavItem 
          to="/admin/section-creation" 
          label="Section Creation" 
          active={isActive('/admin/section-creation')}
        />
        
        <NavItem 
          to="/admin/test-results" 
          label="Test Results" 
          active={isActive('/admin/test-results')}
        />
      </nav>
    </aside>
  );
};

export default AdminSidebar;
