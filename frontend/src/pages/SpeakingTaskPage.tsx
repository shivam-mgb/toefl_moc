import React, { useState, useEffect, useRef } from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import TaskPromptArea from '../components/TaskPromptArea';
import PreparationTimerArea from '../components/PreparationTimerArea';
import { TaskConfig } from '../types/speaking';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MediaRecorderComponent from '../components/MediaRecorderComponent';

interface SpeakingTaskPageProps {
  taskType: 'independent' | 'integrated';
  taskConfig: TaskConfig;
  sectionProgress: string;
  sectionTimer: string;
  onTaskComplete: () => void;
}

const SpeakingTaskPage: React.FC<SpeakingTaskPageProps> = ({
  taskType,
  taskConfig,
  sectionProgress,
  sectionTimer,
  onTaskComplete
}) => {
  const [isPreparationPhase, setIsPreparationPhase] = useState(true);
  const [isRecordingPhase, setIsRecordingPhase] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [readingTimeRemaining, setReadingTimeRemaining] = useState(10);
  const [preparationTimeRemaining, setPreparationTimeRemaining] = useState(taskConfig.prepTime);
  const [recordingTimeRemaining, setRecordingTimeRemaining] = useState(5);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRecordingComplete = (audioUrl: string) => {
    setRecordedAudio(audioUrl);
    setHasRecording(true);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPreparationPhase && preparationTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setIsPreparationPhase(false);
        setIsRecordingPhase(true);
      }, preparationTimeRemaining * 1000);

      return () => clearTimeout(timer);
    }
  }, [isPreparationPhase, preparationTimeRemaining]);

  const handleStartRecording = () => {
    setIsRecordingPhase(true);
  };

  const handleStopRecording = () => {
    setIsRecordingPhase(false);
    setHasRecording(true);
  };

  // Placeholder handlers
  const handleNext = () => {
    if (isPreparationPhase) {
      setIsPreparationPhase(false);
      setIsRecordingPhase(true);
      return;
    }

    if (isRecordingPhase) {
      setIsRecordingPhase(false);
      setHasRecording(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Menu */}
      <TopMenu
        sectionTitle="Speaking Section"
        questionProgress={sectionProgress}
        timer={sectionTimer}
      />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Task Title */}
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {taskConfig.title}
          </h1>

          {/* Task Content */}
          <TaskPromptArea promptText={taskConfig.prompt} />
          {isPreparationPhase ? (
            <>
              <PreparationTimerArea timeRemaining={preparationTimeRemaining} />
            </>
          ) : isRecordingPhase ? (
            <MediaRecorderComponent
              recordingTime={recordingTimeRemaining}
              onRecordingComplete={handleRecordingComplete}
            />
          ) : (
            <>
              {recordedAudio && (
                <AudioPlayerComponent
                  audioSrc={recordedAudio}
                  isPlaying={isPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
              )}
              <button onClick={handleNext}>Next</button>
            </>
          )}
        </div>
      </main>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Navigation
            onNext={handleNext}
            isNextDisabled={!hasRecording}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeakingTaskPage;
