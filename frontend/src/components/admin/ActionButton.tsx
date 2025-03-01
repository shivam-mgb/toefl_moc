
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  to,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles
  const variantStyles = {
    primary: 'border-transparent text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
    secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-teal-500',
    danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };
  
  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${disabled ? disabledStyles : ''} 
    ${className}
  `;
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonStyles}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  // Otherwise, render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
