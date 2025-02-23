import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import WritingReadingPhase from '../components/WritingReadingPhase';
import ListeningArea from '../components/ListeningArea';
import WritingPhaseArea from '../components/WritingPhaseArea';
import { TaskConfig } from '../types/writing';

// Placeholder content
const PLACEHOLDER_PASSAGE = {
  title: "The Impact of Remote Work on Urban Development",
  text: `
    <p>The rise of remote work has fundamentally altered how cities function and 
    develop. This shift, accelerated by recent global events, has challenged 
    traditional urban planning assumptions and created new patterns of city life.</p>

    <p>Historically, cities grew around central business districts, with residential 
    areas expanding outward in concentric circles. This pattern was based on the need 
    for workers to commute to centralized workplaces. The resulting urban structure 
    influenced everything from transportation systems to housing prices.</p>

    <p>However, the widespread adoption of remote work has begun to reshape these 
    established patterns. Many workers no longer need to live within commuting 
    distance of their workplace, leading to several significant changes in urban 
    development:</p>

    <p>First, there has been a noticeable decline in demand for traditional office 
    space in city centers. Some buildings are being converted to residential use or 
    mixed-use developments, while others are being redesigned to accommodate hybrid 
    work models.</p>

    <p>Second, suburban and rural areas are experiencing increased population growth 
    as workers prioritize living space and natural amenities over proximity to urban 
    job centers. This has led to the development of "satellite communities" that 
    offer urban amenities without the density of traditional cities.</p>

    <p>Third, cities are adapting their infrastructure to support remote work. This 
    includes expanding digital infrastructure and creating more public spaces that 
    can serve as informal work areas. Some cities are developing "neighborhood work 
    centers" that provide professional facilities closer to residential areas.</p>
  `
};

interface WritingTaskPageProps {
  taskType: 'integrated' | 'independent';
  taskConfig: TaskConfig;
  sectionProgress: string;
  sectionTimer: string;
  onTaskComplete: () => void;
}

const WritingTaskPage: React.FC<WritingTaskPageProps> = ({
  taskType,
  taskConfig,
  sectionProgress,
  sectionTimer,
  onTaskComplete
}) => {
  // Phase states
  const [currentPhase, setCurrentPhase] = useState<'reading' | 'listening' | 'writing'>('reading');
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes for reading
  
  // Content states
  const [essayText, setEssayText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      handlePhaseComplete();
    }
  }, [timeRemaining]);

  const handlePhaseComplete = () => {
    if (currentPhase === 'reading') {
      setCurrentPhase('listening');
      setTimeRemaining(120); // 2 minutes for listening
    } else if (currentPhase === 'listening') {
      setCurrentPhase('writing');
      setTimeRemaining(1200); // 20 minutes for writing
      setIsPlaying(false);
    }
  };

  const handleSkip = () => {
    if (window.confirm('Are you sure you want to skip the reading phase? You won\'t be able to return to this passage.')) {
      handlePhaseComplete();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate lecture completion after 2 minutes
    setTimeout(() => {
      setIsPlaying(false);
    }, 120000);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your response?')) {
      console.log('Essay submitted:', essayText);
    }
  };

  const handleNext = () => {
    if (currentPhase === 'reading') {
      if (window.confirm('Are you sure you want to proceed? You won\'t be able to return to this passage.')) {
        handlePhaseComplete();
      }
    } else if (currentPhase === 'listening') {
      if (window.confirm('Are you sure you want to proceed to the writing phase?')) {
        handlePhaseComplete();
      }
    } else {
      handleSubmit();
    }
  };

  const getNextButtonText = () => {
    switch (currentPhase) {
      case 'reading':
        return 'Next: Listening';
      case 'listening':
        return 'Next: Writing';
      case 'writing':
        return 'Submit';
      default:
        return 'Next';
    }
  };

  // Modify the phase management for independent task
  const phases = taskType === 'integrated' 
    ? ['reading', 'listening', 'writing'] 
    : ['writing'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu 
        sectionTitle="Writing Section"
        questionProgress={sectionProgress}
        timer={sectionTimer}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {taskType === 'integrated' ? (
            // Existing integrated task UI
            currentPhase === 'reading' ? (
              <WritingReadingPhase
                passageTitle={PLACEHOLDER_PASSAGE.title}
                passageText={PLACEHOLDER_PASSAGE.text}
                onSkip={handleSkip}
              />
            ) : currentPhase === 'listening' ? (
              <ListeningArea
                timeRemaining={formatTime(timeRemaining)}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            ) : (
              <WritingPhaseArea
                passageTitle={PLACEHOLDER_PASSAGE.title}
                passageText={PLACEHOLDER_PASSAGE.text}
                essayText={essayText}
                onEssayChange={setEssayText}
                timeRemaining={formatTime(timeRemaining)}
              />
            )
          ) : (
            // Independent task UI - just the writing phase
            <WritingPhaseArea
              taskTitle={taskConfig.title}
              prompt={taskConfig.prompt}
              essayText={essayText}
              onEssayChange={setEssayText}
              timeRemaining={formatTime(timeRemaining)}
            />
          )}
        </div>
      </main>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Navigation 
            onNext={handleNext}
            nextText={getNextButtonText()}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default WritingTaskPage; 