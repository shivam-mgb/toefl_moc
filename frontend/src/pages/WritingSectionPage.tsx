import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import WritingTaskPage from './WritingTaskPage';

// Task type definitions
type WritingTaskType = 'integrated' | 'independent';

interface TaskConfig {
  type: WritingTaskType;
  title: string;
  readingTime: number;  // in seconds
  listeningTime: number;
  writingTime: number;
  prompt: string;
}

// Task configurations
const TASK_CONFIGS: Record<WritingTaskType, TaskConfig> = {
  integrated: {
    type: 'integrated',
    title: 'Integrated Writing Task',
    readingTime: 5,  // 3 minutes
    listeningTime: 120, // 2 minutes
    writingTime: 1200, // 20 minutes
    prompt: 'Summarize the points made in the lecture, explaining how they cast doubt on points made in the reading passage.'
  },
  independent: {
    type: 'independent',
    title: 'Independent Writing Task',
    readingTime: 0,
    listeningTime: 0,
    writingTime: 600, // 10 minutes
    prompt: 'Do you agree or disagree with the following statement? Technology has made it easier for people to maintain relationships with family and friends. Use specific reasons and examples to support your answer.'
  }
};

const WritingSectionPage: React.FC = () => {
  // Section state
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(1300); // 30 minutes

  // Task sequence
  const taskSequence: WritingTaskType[] = ['integrated', 'independent'];
  const currentTask = taskSequence[currentTaskIndex];

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

  const handleTaskComplete = () => {
    console.log("Current Task Index BEFORE update:", currentTaskIndex);
    if (currentTaskIndex < taskSequence.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      setSectionComplete(true);
    }
    console.log("Current Task Index AFTER update:", currentTaskIndex);
  };

  if (sectionComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <TopMenu 
          sectionTitle="Writing Section"
          questionProgress="Complete"
          timer={formatTime(sectionTimeRemaining)}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Writing Section Completed
            </h2>
            <p className="text-gray-600">
              You have completed both writing tasks. Your responses have been saved.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* The WritingTaskPage component will handle its own TopMenu */}
      <WritingTaskPage
        taskType={currentTask}
        taskConfig={TASK_CONFIGS[currentTask]}
        sectionProgress={`Task ${currentTaskIndex + 1} of ${taskSequence.length}`}
        sectionTimer={formatTime(sectionTimeRemaining)}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default WritingSectionPage; 