import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import SpeakingTaskPage from './SpeakingTaskPage';
import { TaskConfig } from '../types/speaking';

// Task configurations
const TASK_CONFIGS: TaskConfig[] = [
  {
    id: 'task1',
    type: 'independent',
    title: 'Independent Speaking Task',
    prepTime: 15,
    responseTime: 45,
    prompt: 'Describe a place you enjoy visiting. Explain why it is meaningful to you and provide specific details about what makes it special.'
  },
  {
    id: 'task2',
    type: 'independent',
    title: 'Independent Speaking Task',
    prepTime: 15,
    responseTime: 45,
    prompt: 'Some people prefer to travel alone, while others prefer to travel with companions. Which do you prefer and why?'
  },
  {
    id: 'task3',
    type: 'integrated',
    title: 'Integrated Speaking Task',
    prepTime: 30,
    responseTime: 60,
    prompt: 'Summarize the main points from the reading and listening passages, explaining how they relate to each other.',
    readingPassage: 'Reading passage about university policy change...',
    audioUrl: '/audio/task3-conversation.mp3'
  },
  {
    id: 'task4',
    type: 'integrated',
    title: 'Integrated Speaking Task',
    prepTime: 30,
    responseTime: 60,
    prompt: 'Explain how the example in the lecture illustrates the concept defined in the reading passage.',
    readingPassage: 'Reading passage about scientific concept...',
    audioUrl: '/audio/task4-lecture.mp3'
  }
];

const SpeakingSectionPage: React.FC = () => {
  // Section state
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(1200); // 20 minutes

  const currentTask = TASK_CONFIGS[currentTaskIndex];

  // Timer effect
  useEffect(() => {
    if (sectionTimeRemaining > 0 && !sectionComplete) {
      const timer = setTimeout(() => {
        setSectionTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [sectionTimeRemaining, sectionComplete]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTaskProgress = (): string => {
    const taskNumber = currentTaskIndex + 1;
    const totalTasks = TASK_CONFIGS.length;
    return `Task ${taskNumber} of ${totalTasks}`;
  };

  const handleTaskComplete = () => {
    if (currentTaskIndex < TASK_CONFIGS.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      setSectionComplete(true);
    }
  };

  if (sectionComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <TopMenu 
          sectionTitle="Speaking Section"
          questionProgress="Complete"
          timer={formatTime(sectionTimeRemaining)}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Speaking Section Completed
            </h2>
            <p className="text-gray-600">
              You have completed all speaking tasks. Your responses have been recorded.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* The SpeakingTaskPage component will handle its own TopMenu */}
      <SpeakingTaskPage
        taskType={currentTask.type}
        taskConfig={currentTask}
        sectionProgress={getTaskProgress()}
        sectionTimer={formatTime(sectionTimeRemaining)}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default SpeakingSectionPage;
