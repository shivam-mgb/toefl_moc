// components/SpeakingReview.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpeakingSectionResponse  } from '../api/api';
import { SpeakingSectionReview as SpeakingResponse } from '../types/types';


const SpeakingSectionReview: React.FC = () => {
  const { secId } = useParams<{ secId: string }>();
  const [response, setResponse] = useState<SpeakingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetchSpeakingSectionResponse(secId!);
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Speaking Response Review</h1>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Score Section */}
        <section className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Score</h2>
          <p className="text-2xl text-blue-600">
            {response?.score}/100
          </p>
        </section>

        {/* Audio Playback Section */}
        <section className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Audio Responses</h2>
          <div className="space-y-4">
            {response?.response_urls.map((url, index) => (
              <div key={index} className="flex items-center gap-4">
                <audio controls src={url} className="flex-1">
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={url}
                  download
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Feedback</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {response?.feedback}
          </p>
        </section>
      </main>

      <footer className="mt-6">
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

export default SpeakingSectionReview;