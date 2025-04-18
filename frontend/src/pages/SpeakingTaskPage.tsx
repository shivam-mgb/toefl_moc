import React from 'react';
import TaskPromptArea from '../components/TaskPromptArea';
import PreparationTimerArea from '../components/PreparationTimerArea';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MediaRecorderComponent from '../components/MediaRecorderComponent';

interface SpeakingTaskPageProps {
    taskType: number;
    title: string;
    currentPhase: 'intro' | 'reading' | 'audio' | 'prompt' | 'preparation' | 'recording' | 'review';
    phaseTimeRemaining: number;
    passage?: string;
    audioUrl?: string;
    prompt: string;
    recordingTime: number;
    taskId: string;
    onPhaseComplete: () => void;
    onAudioComplete: () => void;
    onRecordingCapture: (blob: Blob) => void;
    onNextTask: () => void;
    hasRecording: boolean;
    recordedAudio: string | null;
  }

const SpeakingTaskPage: React.FC<SpeakingTaskPageProps> = ({
  taskType,
  title,
  currentPhase,
  phaseTimeRemaining,
  passage,
  audioUrl,
  prompt,
  recordingTime,
  taskId,
  onPhaseComplete,
  onAudioComplete,
  onRecordingCapture,
  onNextTask,
  hasRecording,
  recordedAudio
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Render different UI based on current phase
  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 'intro':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="mb-4">
              {taskType === 1 && "You will be asked to speak about a personal experience or opinion."}
              {taskType === 2 && "You will read a short passage, listen to an audio, and then respond to a question."}
              {taskType === 3 && "You will read a short passage, listen to an academic lecture, and then speak about how they relate."}
              {taskType === 4 && "You will listen to an academic lecture and then speak about the main points."}
            </p>
            <p className="mb-4">Get ready to begin this task. The task will start in {phaseTimeRemaining} seconds.</p>
            <button
              onClick={onPhaseComplete}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Now
            </button>
          </div>
        );

      case 'reading':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Reading Passage</h3>
              <div className="text-teal-600 font-medium">Time remaining: {formatTime(phaseTimeRemaining)}</div>
            </div>
            <div className="border p-4 bg-gray-50 rounded-md mb-4 max-h-80 overflow-y-auto">
              <p>{passage}</p>
            </div>
            <button
              onClick={onPhaseComplete}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue
            </button>
          </div>
        );

      case 'audio':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Listen to Audio</h3>
            <p className="mb-4">
              {taskType === 2 && "Listen carefully to the following audio related to the reading passage."}
              {taskType === 3 && "Listen carefully to the academic lecture related to the reading passage."}
              {taskType === 4 && "Listen carefully to the academic lecture."}
            </p>
            <AudioPlayerComponent
              audioSrc={audioUrl || ''} 
              onEnded={onAudioComplete} 
              isPlaying={true}
              onPause={() => {}}
              onPlay={() => {}}
            />
            <button
              onClick={onPhaseComplete}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Skip Audio
            </button>
          </div>
        );

      case 'prompt':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Speaking Prompt</h3>
              <div className="text-teal-600 font-medium">Time remaining: {formatTime(phaseTimeRemaining)}</div>
            </div>
            <TaskPromptArea promptText={prompt} />
            <button
              onClick={onPhaseComplete}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Skip
            </button>
          </div>
        );

      case 'preparation':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Preparation Time</h3>
              <div className="text-teal-600 font-medium">Time remaining: {formatTime(phaseTimeRemaining)}</div>
            </div>
            <TaskPromptArea promptText={prompt} />
            <PreparationTimerArea
              timeRemaining={phaseTimeRemaining}
              onTimeComplete={onPhaseComplete}
            />
            <button
              onClick={onPhaseComplete}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Skip Preparation
            </button>
          </div>
        );

      case 'recording':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Record Your Response</h3>
              <div className="text-teal-600 font-medium">Time remaining: {formatTime(phaseTimeRemaining)}</div>
            </div>
            <TaskPromptArea promptText={prompt} />
            <MediaRecorderComponent
              recordingTime={recordingTime}
              onRecordingCapture={onRecordingCapture}
            />
          </div>
        );

      case 'review':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Review Your Response</h3>
            <TaskPromptArea promptText={prompt} />
            {hasRecording && (
              <div className="mt-4">
                <p className="mb-2">Your recorded response:</p>
                <audio
                  controls
                  src={recordedAudio!}
                  className="w-full mb-4"
                ></audio>
              </div>
            )}
            <button
              onClick={onNextTask}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Continue to Next Task
            </button>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <p>Unknown phase: {currentPhase}</p>
          </div>
        );
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {renderPhaseContent()}
    </main>
  );
};

export default SpeakingTaskPage;