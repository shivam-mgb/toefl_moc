// JsonDisplay.tsx
import React, { useState, useEffect } from 'react';
import { getReadingSection } from '../api/api';

// Define the prop type (optional, if passing data externally)
interface JsonDisplayProps {
  section: string; // Optional URL to fetch data from
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ section }) => {
  // State to hold fetched data and loading status
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        getReadingSection(section)
        .then(data => {
            const result = data
            setData(result);
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section]); // Re-fetch if the URL changes

  // Conditional rendering based on state
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-red-100 rounded-lg shadow-md text-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">JSON Data</h2>
      <pre className="bg-white p-4 rounded-md border border-gray-200 text-sm text-gray-700 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default JsonDisplay;