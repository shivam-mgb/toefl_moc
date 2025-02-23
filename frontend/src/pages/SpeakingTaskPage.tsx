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
  const [isReadingPhase, setIsReadingPhase] = useState(!!taskConfig.readingPassage);
  const [isPreparationPhase, setIsPreparationPhase] = useState(false);
  const [isRecordingPhase, setIsRecordingPhase] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [readingTimeRemaining, setReadingTimeRemaining] = useState(taskConfig.readingTime || 0);
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
    if (isReadingPhase && readingTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setIsReadingPhase(false);
        setIsPreparationPhase(true);
      }, readingTimeRemaining * 1000);

      return () => clearTimeout(timer);
    }
  }, [isReadingPhase, readingTimeRemaining]);

  useEffect(() => {
    if (isPreparationPhase && preparationTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setIsPreparationPhase(false);
        setIsRecordingPhase(true);
      }, preparationTimeRemaining * 1000);

      return () => clearTimeout(timer);
    }
  }, [isPreparationPhase, preparationTimeRemaining]);

  const handleNext = () => {
    if (isReadingPhase) {
      setIsReadingPhase(false);
      setIsPreparationPhase(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu
        sectionTitle="Speaking Section"
        questionProgress={sectionProgress}
        timer={sectionTimer}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {taskConfig.title}
          </h1>

          {isReadingPhase && taskConfig.readingPassage ? (
            <>
              <div className="text-gray-700">
                {taskConfig.readingPassage}
              </div>
              <div className="text-gray-600">
                Time remaining: {readingTimeRemaining} seconds
              </div>
              <button onClick={handleNext}>Next</button>
            </>
          ) : isPreparationPhase ? (
            <>
              <TaskPromptArea promptText={taskConfig.prompt} />
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
              <Navigation
                onNext={onTaskComplete}
                isNextDisabled={!hasRecording}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SpeakingTaskPage;
