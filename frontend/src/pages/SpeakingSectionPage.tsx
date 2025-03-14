import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import SpeakingTaskPage from './SpeakingTaskPage';
import { SpeakingSectionResponse } from '../types/types';
import { getSpeakingSection, submitSpeakingAnswers } from '../api/api';

const SpeakingSectionPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speakingSection, setSpeakingSection] = useState<SpeakingSectionResponse | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(1200);
  const [isPrepTime, setIsPrepTime] = useState(true);
  const [taskRecordings, setTaskRecordings] = useState<Record<string, Blob>>({});
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  useEffect(() => {
    if (!testId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    getSpeakingSection(testId)
      .then((data) => {
        setSpeakingSection(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching speaking section:', err);
        setError('Failed to load speaking section. Please try again.');
        setLoading(false);
      });
  }, [testId]);

  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      if (sectionTimeRemaining <= 0 && !sectionComplete) {
        handleSubmitAllRecordings();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prevTime) => (prevTime <= 1 ? 0 : prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTaskProgress = (): string => `Task ${currentTaskIndex + 1} of 4`;

  const handlePrepTimeEnd = () => setIsPrepTime(false);
  const handleResponseTimeEnd = () => handleTaskComplete();

  const handleTaskComplete = () => {
    if (currentTaskIndex < 3) {
      setCurrentTaskIndex((prev) => prev + 1);
      setIsPrepTime(true);
    } else {
      handleSubmitAllRecordings();
    }
  };

  const handleRecordingCapture = (taskId: string, recordingBlob: Blob) => {
    setTaskRecordings((prev) => ({ ...prev, [taskId]: recordingBlob }));
    console.log(`Recording for task ${taskId} captured`);
  };

  const handleSubmitAllRecordings = async () => {
    if (!testId || !speakingSection) return;

    try {
      const recordings = {
        task1Recording: taskRecordings['task1'] ? new File([taskRecordings['task1']], 'task1.webm', { type: 'audio/webm' }) : null,
        task2Recording: taskRecordings['task2'] ? new File([taskRecordings['task2']], 'task2.webm', { type: 'audio/webm' }) : null,
        task3Recording: taskRecordings['task3'] ? new File([taskRecordings['task3']], 'task3.webm', { type: 'audio/webm' }) : null,
        task4Recording: taskRecordings['task4'] ? new File([taskRecordings['task4']], 'task4.webm', { type: 'audio/webm' }) : null,
      };

      if (!recordings.task1Recording || !recordings.task2Recording || !recordings.task3Recording || !recordings.task4Recording) {
        console.warn('Missing recordings for one or more tasks. Submitting with null values.');
      }

      const result = await submitSpeakingAnswers(testId, recordings as { task1Recording: File; task2Recording: File; task3Recording: File; task4Recording: File; });
      setSubmissionResult(result);
      setSectionComplete(true);
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting recordings:', error);
      setError('Failed to submit recordings. Please try again.');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading speaking section...</div>;
  }

  if (error || !speakingSection) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500 mb-4">{error || 'Speaking section not available'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (sectionComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <TopMenu sectionTitle="Speaking Section" questionProgress="Complete" timer={formatTime(sectionTimeRemaining)} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Speaking Section Completed</h2>
            {submissionResult && (
              <div className="mb-6">
                {submissionResult.score !== undefined && (
                  <p className="text-xl font-semibold text-teal-600">Your Score: {submissionResult.score}</p>
                )}
                {submissionResult.feedback && <p className="text-gray-600 mt-2">{submissionResult.feedback}</p>}
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Return to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Define task-specific props based on currentTaskIndex
  const taskProps = [
    {
      taskType: 1,
      title: 'Task 1: Independent Speaking - Personal Experience/Opinion',
      prepTime: 10,
      responseTime: 5,
      taskId: 'task1',
    },
    {
      taskType: 2,
      title: 'Task 2: Integrated Speaking - Reading & Listening & Speaking',
      prepTime: 11,
      responseTime: 5,
      taskId: 'task2',
    },
    {
      taskType: 3,
      title: 'Task 3: Integrated Speaking - Academic Lecture',
      prepTime: 13,
      responseTime: 6,
      taskId: 'task3',
    },
    {
      taskType: 4,
      title: 'Task 4: Integrated Speaking - Academic Lecture',
      prepTime: 15,
      responseTime: 6,
      taskId: 'task4',
    },
  ];

  const currentTask = taskProps[currentTaskIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu sectionTitle="Speaking Section" questionProgress={getTaskProgress()} timer={formatTime(sectionTimeRemaining)} />
      <SpeakingTaskPage
        taskType={currentTask.taskType}
        speakingContent={speakingSection}
        prepTime={currentTask.prepTime}
        responseTime={currentTask.responseTime}
        onPrepTimeEnd={handlePrepTimeEnd}
        onResponseTimeEnd={handleResponseTimeEnd}
        isInitialPromptPhase={isPrepTime}
        title={currentTask.title}
        onTaskComplete={handleTaskComplete}
        onRecordingCapture={(recordingBlob) => handleRecordingCapture(currentTask.taskId, recordingBlob)}
      />
    </div>
  );
};

export default SpeakingSectionPage;