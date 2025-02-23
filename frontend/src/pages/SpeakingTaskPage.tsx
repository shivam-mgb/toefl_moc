import React, { useState } from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import TaskPromptArea from '../components/TaskPromptArea';
import PreparationTimerArea from '../components/PreparationTimerArea';
import RecordingArea from '../components/RecordingArea';
import { TaskConfig } from '../types/speaking';

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
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);

  // Modify the phase management based on task type
  const phases = taskType === 'integrated' 
    ? ['reading', 'listening', 'preparation', 'recording'] 
    : ['preparation', 'recording'];

  // Placeholder handlers
  const handleNext = () => {
    if (isPreparationPhase) {
      setIsPreparationPhase(false);
      setIsRecording(true);
      return;
    }
    
    if (isRecording) {
      setIsRecording(false);
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
          {taskType === 'integrated' ? (
            // Integrated Task UI
            isPreparationPhase ? (
              <PreparationTimerArea />
            ) : isRecording ? (
              <RecordingArea 
                isRecording={isRecording}
                hasRecording={hasRecording}
              />
            ) : (
              <PreparationTimerArea />
            )
          ) : (
            // Independent Task UI
            <PreparationTimerArea />
          )}
        </div>
      </main>

      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Navigation 
            onNext={handleNext}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeakingTaskPage; 