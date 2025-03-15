import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import WritingTaskPage from './WritingTaskPage';
import { WritingSectionResponse } from '../types/types';
import { getWritingSection, submitWritingAnswers } from '../api/api';

interface Answers {
  task1: string;
  task2: string;
}

interface WritingTask {
  type: 'integrated' | 'independent';
  passage: string;
  audioUrl?: string;
  prompt: string;
}

const WritingSectionPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [writingSection, setWritingSection] = useState<WritingSectionResponse | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(1800); // 30 minutes
  const [taskResponses, setTaskResponses] = useState<Answers>({task1: '', task2: ''});
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  // Fetch section data
  useEffect(() => {
    if (!testId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    getWritingSection(testId)
      .then((data) => {
        setWritingSection(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching writing section:', err);
        setError('Failed to load writing section. Please try again.');
        setLoading(false);
      });
  }, [testId]);

  // Section timer
  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      if (sectionTimeRemaining <= 0 && !sectionComplete) {
        handleSubmitAllResponses();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle task completion
  const handleTaskComplete = (taskId: string, essayText: string) => {
    setTaskResponses((prev) => ({ ...prev, [taskId]: essayText }));
    if (currentTaskIndex < 1) { // Only two tasks: task1 and task2
      setCurrentTaskIndex((prev) => prev + 1);
    } else {
      handleSubmitAllResponses();
    }
  };

  // Submit all responses
  const handleSubmitAllResponses = async () => {
    if (!testId || !writingSection) return;

    try {
      const result = await submitWritingAnswers(testId, taskResponses);
      setSubmissionResult(result);
      setSectionComplete(true);
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting responses:', error);
      setError('Failed to submit responses. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading writing section...</div>;
  }

  // Error state
  if (error || !writingSection) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500 mb-4">{error || 'Writing section not available'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Completion state
  if (sectionComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <TopMenu sectionTitle="Writing Section" questionProgress="Complete" timer={formatTime(0)} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Writing Section Completed</h2>
            {submissionResult && submissionResult.score !== undefined && (
              <p className="text-xl font-semibold text-teal-600">Your Score: {submissionResult.score}</p>
            )}
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Return to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Map tasks to a consistent format
  const tasks: WritingTask[] = [
    { type: 'integrated', passage: writingSection.task1.passage, audioUrl: writingSection.task1.audio_url, prompt: writingSection.task1.prompt },
    { type: 'independent', passage: writingSection.task2.passage, audioUrl: undefined, prompt: writingSection.task2.prompt },
  ];
  const currentTask = tasks[currentTaskIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu
        sectionTitle="Writing Section"
        questionProgress={`Task ${currentTaskIndex + 1} of 2`}
        timer={formatTime(sectionTimeRemaining)}
      />
      <WritingTaskPage
        task={currentTask}
        taskId={`task${currentTaskIndex + 1}`}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default WritingSectionPage;