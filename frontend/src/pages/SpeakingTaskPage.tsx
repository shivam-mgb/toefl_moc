import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import TaskPromptArea from '../components/TaskPromptArea';
import PreparationTimerArea from '../components/PreparationTimerArea';
import { TaskConfig } from '../types/speaking';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MediaRecorderComponent from '../components/MediaRecorderComponent';
import SpeakingSectionTimer from '../components/SpeakingSectionTimer';

interface SpeakingTaskPageProps {
  taskType: 'independent' | 'integrated';
  taskConfig: TaskConfig;
  prepTime: number;
  responseTime: number;
  onPrepTimeEnd: () => void;
  onResponseTimeEnd: () => void;
  isPrepTime: boolean;
  title: string;
  onTaskComplete: () => void;
  onRecordingPhaseEnd: () => void;
}

const SpeakingTaskPage: React.FC<SpeakingTaskPageProps> = ({
  taskType,
  taskConfig,
  prepTime,
  responseTime,
  onPrepTimeEnd,
  onResponseTimeEnd,
  isPrepTime,
  title,
  onTaskComplete,
  onRecordingPhaseEnd
}) => {
  const [isReadingPhase, setIsReadingPhase] = useState(!!taskConfig.readingPassage);
  const [isPreparationPhase, setIsPreparationPhase] = useState(!taskConfig.readingPassage);
  const [isRecordingPhase, setIsRecordingPhase] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [readingTimeRemaining, setReadingTimeRemaining] = useState(taskConfig.readingTime || 0);
  const [preparationTimeRemaining, setPreparationTimeRemaining] = useState(prepTime);
  const [recordingTimeRemaining, setRecordingTimeRemaining] = useState(5);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startRecording, setStartRecording] = useState(false);

  const handleRecordingComplete = (audioUrl: string) => {
    setRecordedAudio(audioUrl);
    setHasRecording(true);
    setIsRecordingPhase(false); // End recording phase after recording is complete
    onRecordingPhaseEnd();
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
        setStartRecording(true); // Start recording after preparation
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

  console.log("SpeakingTaskPage rendered");
  console.log("isReadingPhase:", isReadingPhase);
  console.log("isPreparationPhase:", isPreparationPhase);
  console.log("isRecordingPhase:", isRecordingPhase);
  console.log("hasRecording:", hasRecording);
  console.log("recordedAudio:", recordedAudio);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {title}
          </h1>
          {isPrepTime && (
            <SpeakingSectionTimer
              prepTime={prepTime}
              responseTime={responseTime}
              onPrepTimeEnd={onPrepTimeEnd}
              onResponseTimeEnd={onResponseTimeEnd}
            />
          )}
          {isReadingPhase && taskConfig.readingPassage ? (
            <>
              {console.log("Rendering Reading Phase")}
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
              {console.log("Rendering Preparation Phase")}
              <TaskPromptArea promptText={taskConfig.prompt} />
              <PreparationTimerArea timeRemaining={preparationTimeRemaining} />
            </>
          ) : isRecordingPhase ? (
            <>
              {console.log("Rendering Recording Phase")}
              <MediaRecorderComponent
                recordingTime={recordingTimeRemaining}
                onRecordingComplete={handleRecordingComplete}
                startRecording={startRecording}
                onRecordingPhaseEnd={onRecordingPhaseEnd}
              />
            </>
          ) : recordedAudio && (
            <>
              {console.log("Rendering Audio Playback/Navigation")}
              {console.log("recordedAudio is:", recordedAudio)}
              {console.log("hasRecording is:", hasRecording)}
              <AudioPlayerComponent
                audioSrc={recordedAudio}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
              />
              <Navigation
                key={recordedAudio}
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
