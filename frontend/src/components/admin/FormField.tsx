
import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  id, 
  error, 
  required = false,
  children 
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
