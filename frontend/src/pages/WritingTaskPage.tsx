import React, { useState, useEffect, useRef } from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import WritingReadingPhase from '../components/WritingReadingPhase';
import ListeningArea from '../components/ListeningArea';
import WritingPhaseArea from '../components/WritingPhaseArea';
import { TaskConfig } from './../types/writing';

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

// Placeholder audio URL - Replace with your actual audio URL
const PLACEHOLDER_AUDIO_URL = "/src/assets/prompt_audio.mp3";


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
  onTaskComplete,
}) => {
  // Phase states
  const [currentPhase, setCurrentPhase] = useState<'reading' | 'listening' | 'writing'>('reading');
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes for reading
  const [isPlaying, setIsPlaying] = useState(false);

  // Content states
  const [essayText, setEssayText] = useState('');

  useEffect(() => {
    // Automatically start listening phase after reading
    if (currentPhase === 'reading' && timeRemaining <= 0) {
      setCurrentPhase('listening');
      setTimeRemaining(5); // Use config for listening time
      setIsPlaying(true); // Start playing audio automatically.
    }

    //Automatically go to writing phase after listening
    if (currentPhase === 'listening' && timeRemaining <= 0) {
        setCurrentPhase('writing');
        setTimeRemaining(1200); // Use config for writing time
        setIsPlaying(false);
    }


    // Timer for each phase
    if (timeRemaining > 0 && (
      currentPhase === 'reading' || 
      currentPhase === 'listening' || 
      currentPhase === 'writing')
    ) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

  }, [currentPhase, timeRemaining, taskConfig]);


  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };


  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your response?')) {
      onTaskComplete(); // Call onTaskComplete after submission
      console.log('Essay submitted:', essayText);
    }
  };

  const handleSkip = () => {
    if (currentPhase === 'reading') {
      setCurrentPhase('listening');
      setTimeRemaining(5); // Adjust listening time as needed
      setIsPlaying(true);
    } else if (currentPhase === 'listening') {
      setCurrentPhase('writing');
      setTimeRemaining(5); // Adjust writing time as needed
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentPhase === 'reading') {
        handleSkip(); //Skip reading phase
    } else if (currentPhase === 'listening') {
        handleSkip(); //Skip listening phase
    } else if (currentPhase === 'writing') {
      handleSubmit();
    }
  };

  const handleWritingTimeout = () => {
    //Do things that need to be done at the end of writing phase
    console.log('Writing phase timed out!');
    console.log('Essay submitted:', essayText);
    onTaskComplete();
    setTimeRemaining(5);
  };


  const getNextButtonText = () => {
      if (currentPhase === 'writing') return 'Submit';
      return 'Next';
  };

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
            currentPhase === 'reading' ? (
              <WritingReadingPhase
                passageTitle={PLACEHOLDER_PASSAGE.title}
                passageText={PLACEHOLDER_PASSAGE.text}
                timeRemaining={timeRemaining}
              />
            ) : currentPhase === 'listening' ? (
              <ListeningArea
                audioUrl={PLACEHOLDER_AUDIO_URL}
                timeRemaining={timeRemaining}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onAudioEnd={handleNext}
              />
            ) : (
              <WritingPhaseArea
                passageTitle={PLACEHOLDER_PASSAGE.title}
                passageText={PLACEHOLDER_PASSAGE.text}
                essayText={essayText}
                onEssayChange={setEssayText}
                timeRemaining={timeRemaining}
                onTimeout={handleWritingTimeout}
              />
            )
          ) : (
            // Independent task UI - just the writing phase
            <WritingPhaseArea
              passageTitle={taskConfig.title}
              passageText={taskConfig.prompt}
              essayText={essayText}
              onEssayChange={setEssayText}
              timeRemaining={timeRemaining}
              onTimeout={handleWritingTimeout}
            />
          )}
        </div>
      </main>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Navigation
            onNext={handleNext}
            isNextDisabled={false}
          >
            {getNextButtonText()}
          </Navigation>
        </div>
      </div>
    </div >
  );
};

export default WritingTaskPage;
