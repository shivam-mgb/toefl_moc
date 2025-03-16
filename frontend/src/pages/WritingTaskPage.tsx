import React, { useState, useEffect } from 'react';
import WritingReadingPhase from '../components/WritingReadingPhase';
import ListeningArea from '../components/ListeningArea';
import WritingPhaseArea from '../components/WritingPhaseArea';
import Navigation from '../components/Navigation';

interface WritingTask {
  type: 'integrated' | 'independent';
  passage: string;
  audioUrl?: string;
  prompt: string;
}

interface WritingTaskPageProps {
  task: WritingTask;
  taskId: string;
  onTaskComplete: (taskId: string, essayText: string) => void;
}

// Task configurations
const TASK_CONFIGS = {
  integrated: { readingTime: 180, listeningTime: 120, writingTime: 1200 }, // 3 min, 2 min, 20 min
  independent: { readingTime: 0, listeningTime: 0, writingTime: 600 }, // 10 min
};

const WritingTaskPage: React.FC<WritingTaskPageProps> = ({ task, taskId, onTaskComplete }) => {
  const taskConfig = TASK_CONFIGS[task.type];

  // State management
  const [currentPhase, setCurrentPhase] = useState<'reading' | 'listening' | 'writing'>(
    task.type === 'integrated' ? 'reading' : 'writing'
  );
  const [timeRemaining, setTimeRemaining] = useState(
    task.type === 'integrated' ? taskConfig.readingTime : taskConfig.writingTime
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [essayText, setEssayText] = useState('');

  // Phase transitions and timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      if (task.type === 'integrated') {
        if (currentPhase === 'reading') {
          setCurrentPhase('listening');
          setTimeRemaining(taskConfig.listeningTime);
          setIsPlaying(true);
        } else if (currentPhase === 'listening') {
          setCurrentPhase('writing');
          setTimeRemaining(taskConfig.writingTime);
          setIsPlaying(false);
        } else if (currentPhase === 'writing') {
          setTimeRemaining(TASK_CONFIGS.independent.writingTime);
          onTaskComplete(taskId, essayText);
          console.log('does it run after on task complete?');
          setEssayText('');
        }
      } else if (currentPhase === 'writing') {
        onTaskComplete(taskId, essayText);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhase, timeRemaining, task.type, taskConfig, taskId, essayText, onTaskComplete]);

  // Audio controls
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // Navigation actions
  const handleNext = () => {
    if (task.type === 'integrated') {
      if (currentPhase === 'reading') {
        setCurrentPhase('listening');
        setTimeRemaining(taskConfig.listeningTime);
        setIsPlaying(true);
      } else if (currentPhase === 'listening') {
        setCurrentPhase('writing');
        setTimeRemaining(taskConfig.writingTime);
        setIsPlaying(false);
      } else if (currentPhase === 'writing' && window.confirm('Submit your response?')) {
        setTimeRemaining(TASK_CONFIGS.independent.writingTime);
        onTaskComplete(taskId, essayText);
        console.log('does it run after on task complete?');
        setEssayText('');
      }
    } else if (currentPhase === 'writing' && window.confirm('Submit your response?')) {
      console.log('this is the text: ', essayText);
      
      onTaskComplete(taskId, essayText);
    }
  };

  // Render phase content
  const renderPhaseContent = () => {
    if (task.type === 'integrated') {
      if (currentPhase === 'reading') {
        return (
          <WritingReadingPhase
            passageTitle="Integrated Task Passage" // Title could come from API if added
            passageText={task.passage}
            timeRemaining={timeRemaining}
          />
        );
      } else if (currentPhase === 'listening') {
        return (
          <ListeningArea
            audioUrl={task.audioUrl || ''}
            timeRemaining={timeRemaining}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onAudioEnd={handleNext}
          />
        );
      }
    }
    return (
      <WritingPhaseArea
        passageTitle={task.type === 'integrated' ? 'Integrated Task Response' : 'Independent Task'}
        passageText={task.passage}
        essayText={essayText}
        prompt={task.prompt}
        onEssayChange={setEssayText}
        timeRemaining={timeRemaining}
        onTimeout={() => onTaskComplete(taskId, essayText)}
      />
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">{renderPhaseContent()}</div>
      <div className="border-t border-gray-200 bg-white mt-4">
        <div className="container mx-auto px-4">
          <Navigation onNext={handleNext} isNextDisabled={false}>
            {currentPhase === 'writing' ? 'Submit' : 'Next'}
          </Navigation>
        </div>
      </div>
    </main>
  );
};

export default WritingTaskPage;