import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import SpeakingTaskPage from './SpeakingTaskPage';
import { SpeakingSectionResponse } from '../types/types';
import { getSpeakingSection, submitSpeakingAnswers } from '../api/api';

const SpeakingSectionPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  // Page state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speakingSection, setSpeakingSection] = useState<SpeakingSectionResponse | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(1200);
  const [taskRecordings, setTaskRecordings] = useState<Record<string, Blob>>({});
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  // Task flow states
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'reading' | 'audio' | 'prompt' | 'preparation' | 'recording' | 'review'>('intro');
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(0);
  
  // Define task-specific props
  const taskProps = [
    {
      taskType: 1,
      title: 'Task 1: Independent Speaking - Personal Experience/Opinion',
      prepTime: 10,
      responseTime: 5,
      taskId: 'task1',
      readingTime: 0,
    },
    {
      taskType: 2,
      title: 'Task 2: Integrated Speaking - Reading & Listening & Speaking',
      prepTime: 11,
      responseTime: 5,
      taskId: 'task2',
      readingTime: 5,
    },
    {
      taskType: 3,
      title: 'Task 3: Integrated Speaking - Academic Lecture',
      prepTime: 13,
      responseTime: 6,
      taskId: 'task3',
      readingTime: 5,
    },
    {
      taskType: 4,
      title: 'Task 4: Integrated Speaking - Academic Lecture',
      prepTime: 15,
      responseTime: 6,
      taskId: 'task4',
      readingTime: 0,
    },
  ];

  // Fetch the speaking section data
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
        // Initialize the first task
        resetTaskFlow(0);
      })
      .catch((err) => {
        console.error('Error fetching speaking section:', err);
        setError('Failed to load speaking section. Please try again.');
        setLoading(false);
      });
  }, [testId]);

  // Global section timer
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

  // Phase timer effect
  useEffect(() => {
    if (phaseTimeRemaining <= 0 || currentPhase === 'audio' || currentPhase === 'review') {
      return; // Don't run timer for audio (handled by audio component) or review phase
    }

    const timer = setInterval(() => {
      setPhaseTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          handlePhaseComplete();
        }
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhase, phaseTimeRemaining]);

  // Handler for phase completion
  const handlePhaseComplete = () => {
    const currentTask = taskProps[currentTaskIndex];
    
    switch (currentPhase) {
      case 'intro':
        // After intro, go to reading if there's passage, otherwise audio or prompt
        if (hasPassage()) {
          setCurrentPhase('reading');
          setPhaseTimeRemaining(currentTask.readingTime);
        } else if (hasAudio()) {
          setCurrentPhase('audio');
        } else {
          setCurrentPhase('prompt');
          setPhaseTimeRemaining(5); // 5 seconds to read prompt
        }
        break;
        
      case 'reading':
        // After reading, go to audio if there's audio, otherwise prompt
        if (hasAudio()) {
          setCurrentPhase('audio');
        } else {
          setCurrentPhase('prompt');
          setPhaseTimeRemaining(5);
        }
        break;
        
      case 'audio':
        // After audio, go to prompt
        setCurrentPhase('prompt');
        setPhaseTimeRemaining(5);
        break;
        
      case 'prompt':
        // After prompt, go to preparation
        setCurrentPhase('preparation');
        setPhaseTimeRemaining(currentTask.prepTime);
        break;
        
      case 'preparation':
        // After preparation, go to recording
        setCurrentPhase('recording');
        setPhaseTimeRemaining(currentTask.responseTime);
        break;
        
      case 'recording':
        // After recording, go to review
        setCurrentPhase('review');
        break;
        
      case 'review':
        // After review, go to next task or complete
        if (currentTaskIndex < 3) {
          setCurrentTaskIndex((prev) => prev + 1);
          resetTaskFlow(currentTaskIndex + 1);
        } else {
          handleSubmitAllRecordings();
        }
        break;
    }
  };

  // Reset the task flow for a new task
  const resetTaskFlow = (taskIndex: number) => {
    setCurrentPhase('intro');
    setPhaseTimeRemaining(5); // 5 seconds for intro
  };

  // Handle audio completion
  const handleAudioComplete = () => {
    handlePhaseComplete(); // Move to the next phase
  };

  // Handle recording capture
  const handleRecordingCapture = (taskId: string, recordingBlob: Blob) => {
    setTaskRecordings((prev) => ({ ...prev, [taskId]: recordingBlob }));
    console.log(`Recording for task ${taskId} captured`);
    handlePhaseComplete(); // Move to review phase
  };

  // Handle next task button click
  const handleNextTask = () => {
    handlePhaseComplete();
  };

  // Submit all recordings
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

      const result = await submitSpeakingAnswers(testId, recordings as { 
        task1Recording: File; 
        task2Recording: File; 
        task3Recording: File; 
        task4Recording: File; 
      });
      
      setSubmissionResult(result);
      setSectionComplete(true);
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting recordings:', error);
      setError('Failed to submit recordings. Please try again.');
    }
  };

  // Helper functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTaskProgress = (): string => `Task ${currentTaskIndex + 1} of 4`;

  // Helper functions to check content availability
  const hasPassage = (): boolean => {
    if (!speakingSection) return false;
    
    switch (currentTaskIndex) {
      case 0: return false; // Task 1 has no passage
      case 1: return !!speakingSection.task2.passage;
      case 2: return !!speakingSection.task3.passage;
      case 3: return false; // Task 4 has no passage
      default: return false;
    }
  };

  const hasAudio = (): boolean => {
    if (!speakingSection) return false;
    
    switch (currentTaskIndex) {
      case 0: return false; // Task 1 has no audio
      case 1: return !!speakingSection.task2.audioUrl;
      case 2: return !!speakingSection.task3.audioUrl;
      case 3: return !!speakingSection.task4.audioUrl;
      default: return false;
    }
  };

  const getPassage = (): string => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 1: return speakingSection.task2.passage;
      case 2: return speakingSection.task3.passage;
      default: return '';
    }
  };

  const getAudioUrl = (): string => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 1: return speakingSection.task2.audioUrl;
      case 2: return speakingSection.task3.audioUrl;
      case 3: return speakingSection.task4.audioUrl;
      default: return '';
    }
  };

  const getPrompt = (): string => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 0: return (speakingSection.task1 as { prompt: string }).prompt;
      case 1: return speakingSection.task2.prompt;
      case 2: return speakingSection.task3.prompt;
      case 3: return speakingSection.task4.prompt;
      default: return '';
    }
  };

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading speaking section...</div>;
  }

  // Error state
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

  // Completion state
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

  const currentTask = taskProps[currentTaskIndex];
  
  // Main render for the task in progress
  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu 
        sectionTitle="Speaking Section" 
        questionProgress={getTaskProgress()} 
        timer={formatTime(sectionTimeRemaining)} 
      />
      <SpeakingTaskPage
        taskType={currentTask.taskType}
        title={currentTask.title}
        currentPhase={currentPhase}
        phaseTimeRemaining={phaseTimeRemaining}
        passage={getPassage()}
        audioUrl={getAudioUrl()}
        prompt={getPrompt()}
        recordingTime={currentTask.responseTime}
        taskId={currentTask.taskId}
        onPhaseComplete={handlePhaseComplete}
        onAudioComplete={handleAudioComplete}
        onRecordingCapture={(blob) => handleRecordingCapture(currentTask.taskId, blob)}
        onNextTask={handleNextTask}
        hasRecording={!!taskRecordings[currentTask.taskId]}
        recordedAudio={taskRecordings[currentTask.taskId] ? URL.createObjectURL(taskRecordings[currentTask.taskId]) : null}
      />
    </div>
  );
};

export default SpeakingSectionPage;