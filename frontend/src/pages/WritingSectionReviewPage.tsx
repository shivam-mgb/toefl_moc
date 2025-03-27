// WritingSectionReviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWritingSectionResponse } from '../api/api';
import { WritingSectionReview } from '../types/types';

const WritingSectionReviewPage: React.FC = () => {
  const { secId } = useParams<{ secId: string }>();
  const [response, setResponse] = useState<WritingSectionReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetchWritingSectionResponse(secId!);
        setResponse(res);
      } catch (error) {
        console.error('Error fetching response:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponse();
  }, [secId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!response) {
    return <div className="min-h-screen bg-gray-100 p-6">No response data found.</div>;
  }

  const totalScore = response.reduce((acc, task) => acc + (task.score || 0), 0);
  const maxPossibleScore = response.length * 10; // Assuming each task is scored out of 10
  const overallScore = (totalScore / maxPossibleScore) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Writing Section Review</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Overall Score</h2>
          <p className="text-2xl text-blue-600">{overallScore.toFixed(2)}%</p>
        </section>

        {response.map((task) => (
          <div key={task.task_id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Task {task.task_number}</h3>

            <section className="mb-4">
              <h4 className="text-md font-semibold mb-2">Prompt</h4>
              <div className="p-4 bg-gray-50 rounded border">
                <p className="text-gray-700 whitespace-pre-wrap">{task.prompt}</p>
              </div>
            </section>

            <section className="mb-4">
              <h4 className="text-md font-semibold mb-2">Your Response</h4>
              <div className="p-4 bg-gray-50 rounded border">
                <p className="text-gray-700 whitespace-pre-wrap">{task.response_text}</p>
              </div>
            </section>

            <section className="mb-4">
              <h4 className="text-md font-semibold mb-2">Score</h4>
              <p className="text-xl text-green-600">
                {task.score !== null ? `${task.score}/10` : 'Not available'}
              </p>
            </section>

            <section>
              <h4 className="text-md font-semibold mb-2">Feedback</h4>
              <p className="text-gray-700 whitespace-pre-wrap">
                {task.feedback || 'No feedback provided.'}
              </p>
            </section>
          </div>
        ))}
      </main>

      <footer className="mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
      </footer>
    </div>
  );
};

export default WritingSectionReviewPage;