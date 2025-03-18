import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import SpeakingTaskPage from './SpeakingTaskPage';
import { SpeakingSectionResponse } from '../types/types';
import { getSpeakingSection, submitSpeakingAnswers } from '../api/api';

const SpeakingSectionPage: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Core states
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
  
  // Task configurations
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

  const currentTask = taskProps[currentTaskIndex];
  const recordedAudio = useMemo(() => {
    const recordingBlob = currentTask?.taskId ? taskRecordings[currentTask.taskId] : null;
    return recordingBlob ? URL.createObjectURL(recordingBlob) : null;
  }, [taskRecordings, currentTaskIndex]); 

  // Fetch data on load
  useEffect(() => {
    if (!testId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    getSpeakingSection(testId)
      .then((data) => {
        setSpeakingSection(data);
        setLoading(false);
        resetTaskFlow(0);
      })
      .catch((err) => {
        setError('Failed to load speaking section:'+err);
        setLoading(false);
      });
  }, [testId]);

  // Section timer
  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      if (sectionTimeRemaining <= 0 && !sectionComplete) {
        handleSubmitAllRecordings();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

  // Phase timer
  useEffect(() => {
    if (phaseTimeRemaining <= 0 || currentPhase === 'audio' || currentPhase === 'review' || currentPhase === 'recording') {
      return;
    }

    const timer = setInterval(() => {
      setPhaseTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          handlePhaseComplete();
        }
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhase, phaseTimeRemaining]);

  // Handle phase transitions
  const handlePhaseComplete = () => {
    const currentTask = taskProps[currentTaskIndex];
    
    switch (currentPhase) {
      case 'intro':
        if (hasPassage()) {
          setCurrentPhase('reading');
          setPhaseTimeRemaining(currentTask.readingTime);
        } else if (hasAudio()) {
          setCurrentPhase('audio');
        } else {
          setCurrentPhase('prompt');
          setPhaseTimeRemaining(5);
        }
        break;
        
      case 'reading':
        if (hasAudio()) {
          setCurrentPhase('audio');
        } else {
          setCurrentPhase('prompt');
          setPhaseTimeRemaining(5);
        }
        break;
        
      case 'audio':
        setCurrentPhase('prompt');
        setPhaseTimeRemaining(5);
        break;
        
      case 'prompt':
        setCurrentPhase('preparation');
        setPhaseTimeRemaining(currentTask.prepTime);
        break;
        
      case 'preparation':
        setCurrentPhase('recording');
        setPhaseTimeRemaining(currentTask.responseTime);
        break;
        
      case 'recording':
        setCurrentPhase('review');
        break;
        
      case 'review':
        if (currentTaskIndex < 3) {
          setCurrentTaskIndex((prev) => prev + 1);
          resetTaskFlow(currentTaskIndex + 1);
        } else {
          handleSubmitAllRecordings();
        }
        break;
    }
  };

  // Reset to beginning of task flow
  const resetTaskFlow = (taskIndex: number) => {
    console.log(taskIndex);
    
    setCurrentPhase('intro');
    setPhaseTimeRemaining(5);
  };

  // Handle recording capture
  const handleRecordingCapture = (taskId: string, recordingBlob: Blob) => {
    setTaskRecordings((prev) => ({ ...prev, [taskId]: recordingBlob }));
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
      // instead of putting the task types put the actual ids, that might be more useful for relations
      const result = await submitSpeakingAnswers(testId, recordings as { 
        task1Recording: File; 
        task2Recording: File; 
        task3Recording: File; 
        task4Recording: File; 
      });
      
      setSubmissionResult(result);
      setSectionComplete(true);
    } catch (error) {
      setError('Failed to submit recordings');
    }
  };

  // Helper functions
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTaskProgress = () => `Task ${currentTaskIndex + 1} of 4`;

  // Content availability checks
  const hasPassage = () => {
    if (!speakingSection) return false;
    
    switch (currentTaskIndex) {
      case 1: return !!speakingSection.task2.passage;
      case 2: return !!speakingSection.task3.passage;
      default: return false;
    }
  };

  const hasAudio = () => {
    if (!speakingSection) return false;
    
    switch (currentTaskIndex) {
      case 1: return !!speakingSection.task2.audio_url;
      case 2: return !!speakingSection.task3.audio_url;
      case 3: return !!speakingSection.task4.audio_url;
      default: return false;
    }
  };

  const getPassage = () => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 1: return speakingSection.task2.passage;
      case 2: return speakingSection.task3.passage;
      default: return '';
    }
  };

  const getAudioUrl = () => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 1: return speakingSection.task2.audio_url;
      case 2: return speakingSection.task3.audio_url;
      case 3: return speakingSection.task4.audio_url;
      default: return '';
    }
  };

  const getPrompt = () => {
    if (!speakingSection) return '';
    
    switch (currentTaskIndex) {
      case 0: return speakingSection.task1.prompt;
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
            {submissionResult && submissionResult.score !== undefined && (
              <p className="text-xl font-semibold text-teal-600">Your Score: {submissionResult.score}</p>
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

  // Main task view
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
        onAudioComplete={handlePhaseComplete}
        onRecordingCapture={(blob: Blob) => handleRecordingCapture(currentTask.taskId, blob)}
        onNextTask={handlePhaseComplete}
        hasRecording={!!taskRecordings[currentTask.taskId]}
        recordedAudio={recordedAudio}
      />
    </div>
  );
};

export default SpeakingSectionPage;