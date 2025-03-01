
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: {
    label: string;
    path: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-4">
      <ol className="flex text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="mx-2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-600">{item.label}</span>
            ) : (
              <Link to={item.path} className="text-teal-600 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
