
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import FormField from '../../../components/admin/FormField';
import ActionButton from '../../../components/admin/ActionButton';

interface FormData {
  title: string;
  text: string;
}

interface FormErrors {
  title?: string;
  text?: string;
}

const AddReadingPassage: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    text: '',
  });
  
  // Form errors state
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Passage title is required';
    }
    
    if (!formData.text.trim()) {
      newErrors.text = 'Passage text is required';
    } else if (formData.text.trim().split(/\s+/).length < 100) {
      newErrors.text = 'Passage text should be at least 100 words';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here would be API call to save the passage
      console.log('Submitting passage:', formData);
      
      // Mock success
      alert('Passage created successfully!');
      navigate('/admin/reading/passages');
    }
  };
  
  return (
    <AdminLayout 
      title="Add New Reading Passage" 
      breadcrumbItems={[
        { label: 'Admin', path: '/admin' },
        { label: 'Reading', path: '/admin/reading' },
        { label: 'Passages', path: '/admin/reading/passages' },
        { label: 'Add New Passage', path: '/admin/reading/passages/add' },
      ]}
    >
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <FormField
            label="Passage Title"
            id="title"
            required
            error={errors.title}
          >
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage title"
            />
          </FormField>
          
          <FormField
            label="Passage Text"
            id="text"
            required
            error={errors.text}
          >
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={12}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="Enter passage text content"
            />
          </FormField>
          
          <div className="mt-6 flex space-x-3">
            <ActionButton type="submit">Save Passage</ActionButton>
            <ActionButton 
              variant="secondary" 
              onClick={() => navigate('/admin/reading/passages')}
            >
              Cancel
            </ActionButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddReadingPassage;
