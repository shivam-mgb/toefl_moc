// SpeakingFeedbackPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayerSimple from '../../../components/AudioPlayerSimple';
import { fetchSpeakingSectionResponse, createSpeakingSectionFeedback } from '../../../api/api';
import { SpeakingSectionReview as SpeakingResponse, SpeakingFeedback, returnUrlOfAudio } from '../../../types/types';

const SpeakingFeedbackPage: React.FC = () => {
  const { secId, studentId } = useParams<{ secId: string; studentId: string }>();
  const [response, setResponse] = useState<SpeakingResponse | null>(null);
  const [reviews, setReviews] = useState<Array<SpeakingFeedback>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetchSpeakingSectionResponse(secId!, studentId!);
        setResponse(res);
        // Initialize reviews with existing data or empty values
        setReviews(res.tasks.map(task => ({
          response_id: task.response_id,
          task_id: task.task_id,
          score: task.score || null,
          feedback: task.feedback || ''
        })));
      } catch (error) {
        console.error('Error fetching response:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [secId, studentId]);

  const handleScoreChange = (taskId: number, value: string) => {
    const numValue = value === '' ? null : Number(value);
    setReviews(prev => prev.map(review => 
      review.task_id === taskId 
        ? { ...review, score: numValue }
        : review
    ));
  };

  const handleFeedbackChange = (taskId: number, value: string) => {
    setReviews(prev => prev.map(review => 
      review.task_id === taskId 
        ? { ...review, feedback: value }
        : review
    ));
  };

  const handleSubmit = async () => {
    try {
      const submitData = reviews.map(review => ({
        response_id: review.response_id,
        task_id: review.task_id,
        score: review.score,
        feedback: review.feedback
      }));

      const res = await createSpeakingSectionFeedback(secId!, submitData);

      console.log('the submission was successfull: ', res);
      alert('Reviews submitted successfully!');      

      // Update the response state with submitted values
      // setResponse(prev => {
      //   if (!prev) return prev;
      //   return {
      //     ...prev,
      //     tasks: prev.tasks.map(task => {
      //       const review = reviews.find(r => r.task_id === task.task_id);
      //       return {
      //         ...task,
      //         score: review?.score ?? task.score,
      //         feedback: review?.feedback ?? task.feedback
      //       };
      //     })
      //   };
      // });

      alert('Reviews submitted successfully!');
    } catch (error) {
      console.error('Error submitting reviews:', error);
      alert(`Failed to submit reviews: ${error}`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!response) {
    return <div className="min-h-screen bg-gray-100 p-6">No response data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Speaking Section Feedback</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {response.tasks.map((task, index) => (
          <div key={task.task_id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Task {task.task_number}</h3>

            <AudioPlayerSimple src={returnUrlOfAudio(task.audio_url)} />
            
            {/* Score Input */}
            <section className="mb-4">
              <label className="block text-md font-semibold mb-2">Score (0-10)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={reviews[index]?.score ?? ''}
                onChange={(e) => handleScoreChange(task.task_id, e.target.value)}
                className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0-10"
              />
            </section>

            {/* Feedback Input */}
            <section>
              <label className="block text-md font-semibold mb-2">Feedback</label>
              <textarea
                value={reviews[index]?.feedback || ''}
                onChange={(e) => handleFeedbackChange(task.task_id, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your feedback here..."
              />
            </section>
          </div>
        ))}
      </main>

      <footer className="mt-8 flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={reviews.some(r => 
            r.score === null || 
            r.score < 0 || 
            r.score > 10 || 
            !r.feedback.trim()
          )}
        >
          Submit Reviews
        </button>
      </footer>
    </div>
  );
};

export default SpeakingFeedbackPage;