import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TaskPromptArea from '../components/TaskPromptArea';
import PreparationTimerArea from '../components/PreparationTimerArea';
import { SpeakingSectionResponse } from '../types/types';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MediaRecorderComponent from '../components/MediaRecorderComponent';

interface SpeakingTaskPageProps {
    taskType: number;
    speakingContent: SpeakingSectionResponse;
    prepTime: number;
    responseTime: number;
    onPrepTimeEnd: () => void;
    onResponseTimeEnd: () => void;
    isInitialPromptPhase: boolean;
    title: string;
    onTaskComplete: () => void;
    onRecordingCapture: (recordingBlob: Blob) => void;
}

const SpeakingTaskPage: React.FC<SpeakingTaskPageProps> = ({
    taskType,
    speakingContent,
    prepTime,
    responseTime,
    onPrepTimeEnd,
    onResponseTimeEnd,
    isInitialPromptPhase,
    title,
    onTaskComplete,
    onRecordingCapture
}) => {
    const [isReadingPhase, setIsReadingPhase] = useState(false);
    const [isAudioPhase, setIsAudioPhase] = useState(false);
    const [isPromptReadingPhase, setIsPromptReadingPhase] = useState(false);
    const [isPreparationPhase, setIsPreparationPhase] = useState(false);
    const [isRecordingPhase, setIsRecordingPhase] = useState(false);
    const [hasRecording, setHasRecording] = useState(false);
    const [readingTimeRemaining, setReadingTimeRemaining] = useState(5);
    const [preparationTimeRemaining, setPreparationTimeRemaining] = useState(prepTime);
    const [recordingTimeRemaining, setRecordingTimeRemaining] = useState(responseTime);
    const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startRecording, setStartRecording] = useState(false);

    // Log props on mount/update
    useEffect(() => {
        console.log("SpeakingTaskPage props:", { taskType, prepTime, responseTime, isInitialPromptPhase });
    }, [taskType, prepTime, responseTime, isInitialPromptPhase]);

    // Extract task-specific properties
    let passage: string | undefined;
    let audioUrl: string | undefined;
    let prompt: string;

    if (taskType === 1) {
        const task1 = speakingContent.task1 as { readingPassage: string; prompt: string };
        passage = task1.readingPassage;
        prompt = task1.prompt;
    } else if (taskType === 2) {
        passage = speakingContent.task2.passage;
        audioUrl = speakingContent.task2.audioUrl;
        prompt = speakingContent.task2.prompt;
    } else if (taskType === 3) {
        passage = speakingContent.task3.passage;
        audioUrl = speakingContent.task3.audioUrl;
        prompt = speakingContent.task3.prompt;
    } else if (taskType === 4) {
        audioUrl = speakingContent.task4.audioUrl;
        prompt = speakingContent.task4.prompt;
    } else {
        throw new Error('Invalid taskType');
    }

    const handleRecordingComplete = (audioUrl: string) => {
        setRecordedAudio(audioUrl);
        setHasRecording(true);
        setIsRecordingPhase(false);
        setIsPlaying(true);
        setStartRecording(false);
        onResponseTimeEnd();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    useEffect(() => {
        console.log("Initial Prompt Phase, isInitialPromptPhase:", isInitialPromptPhase);
        if (isInitialPromptPhase) {
            const timer = setTimeout(() => {
                console.log("Initial prompt timeout fired");
                onPrepTimeEnd();
                if (passage) {
                    setIsReadingPhase(true);
                    console.log("Transition to reading phase");
                } else if (!audioUrl) {
                    setIsPromptReadingPhase(true);
                    console.log("Transition to prompt reading phase");
                } else {
                    setIsAudioPhase(true);
                    console.log("Transition to audio phase");
                }
            }, 5000);
            return () => {
                console.log("Initial prompt cleanup");
                clearTimeout(timer);
            };
        }
    }, [isInitialPromptPhase, passage, audioUrl, onPrepTimeEnd]);

    useEffect(() => {
        if (isReadingPhase && readingTimeRemaining > 0) {
            console.log("Reading Phase active, time remaining:", readingTimeRemaining);
            const timer = setTimeout(() => {
                console.log("Reading timeout fired");
                setIsReadingPhase(false);
                if (audioUrl) {
                    setIsAudioPhase(true);
                    console.log("Transition from reading to audio phase");
                } else {
                    setIsPromptReadingPhase(true);
                    console.log("Transition from reading to prompt reading phase");
                }
            }, readingTimeRemaining * 1000);
            return () => {
                console.log("Reading cleanup");
                clearTimeout(timer);
            };
        }
    }, [isReadingPhase, readingTimeRemaining, audioUrl]);

    useEffect(() => {
        if (isAudioPhase && audioUrl) {
            console.log("Audio Phase active");
        }
    }, [isAudioPhase, audioUrl]);

    useEffect(() => {
        if (isPromptReadingPhase) {
            console.log("Prompt Reading Phase active");
            const timer = setTimeout(() => {
                console.log("Prompt reading timeout fired");
                setIsPromptReadingPhase(false);
                setIsPreparationPhase(true);
                console.log("Transition to preparation phase");
            }, 5000);
            return () => {
                console.log("Prompt reading cleanup");
                clearTimeout(timer);
            };
        }
    }, [isPromptReadingPhase]);

    useEffect(() => {
        console.log("Preparation Phase check, isPreparationPhase:", isPreparationPhase, "prepTime:", preparationTimeRemaining);
        if (isPreparationPhase) {
            console.log("Preparation Phase started");
            const timer = setTimeout(() => {
                console.log("Preparation timeout fired");
                setIsPreparationPhase(false);
                setIsRecordingPhase(true);
                setStartRecording(true);
                console.log("startRecording set to true");
            }, preparationTimeRemaining * 1000);
            return () => {
                console.log("Preparation cleanup");
                clearTimeout(timer);
            };
        }
    }, [isPreparationPhase, preparationTimeRemaining]);

    const handleAudioEnd = () => {
        setIsAudioPhase(false);
        setIsPromptReadingPhase(true);
        console.log("Audio ended, transitioning to prompt reading phase");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        {title}
                    </h1>
                    {isInitialPromptPhase ? (
                        <TaskPromptArea promptText="Here the task intro should be. Maybe the constant message on the task number? Yeah prob." />
                    ) : isReadingPhase && passage ? (
                        <>
                            <div className="text-gray-700">{passage}</div>
                            <p>Time remaining: {readingTimeRemaining} seconds</p>
                        </>
                    ) : isAudioPhase && audioUrl ? (
                        <AudioPlayerComponent
                            audioSrc={audioUrl}
                            isPlaying={true}
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onEnded={handleAudioEnd}
                        />
                    ) : isPromptReadingPhase ? (
                        <>
                            <TaskPromptArea promptText={prompt} />
                            <p>Time remaining: 5 seconds</p>
                        </>
                    ) : isPreparationPhase ? (
                        <>
                            <TaskPromptArea promptText={prompt} />
                            <PreparationTimerArea timeRemaining={preparationTimeRemaining} />
                        </>
                    ) : isRecordingPhase ? (
                        <MediaRecorderComponent
                            recordingTime={recordingTimeRemaining}
                            onRecordingComplete={handleRecordingComplete}
                            startRecording={startRecording}
                            onRecordingCapture={onRecordingCapture}
                        />
                    ) : (
                        <>
                            {recordedAudio && (
                                <AudioPlayerComponent
                                    audioSrc={recordedAudio}
                                    isPlaying={isPlaying}
                                    onPlay={handlePlay}
                                    onPause={handlePause}
                                    onEnded={() => console.log('just logging')}
                                />
                            )}
                            <Navigation
                                onNext={onTaskComplete}
                                isNextDisabled={!hasRecording}
                            >
                                Next
                            </Navigation>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SpeakingTaskPage;