import React, { useState, useEffect, useRef } from 'react';

interface MediaRecorderComponentProps {
    recordingTime: number;
    onRecordingComplete: (audioUrl: string) => void;
    startRecording: boolean;
    onRecordingCapture: (recordingBlob: Blob) => void;
}

const MediaRecorderComponent: React.FC<MediaRecorderComponentProps> = ({
    recordingTime,
    onRecordingComplete,
    startRecording,
    onRecordingCapture
}) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false); // Track initialization
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const initializeMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                mediaRecorderRef.current = recorder;
                audioChunksRef.current = [];

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                recorder.onstop = () => {
                    console.log("recorder.onstop event triggered");
                    setIsRecording(false);
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioUrl(url);
                    onRecordingComplete(url);
                    onRecordingCapture(audioBlob);
                    stream.getTracks().forEach(track => track.stop());
                };

                recorder.onstart = () => {
                    console.log("recorder.onstart event triggered");
                    setIsRecording(true);
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }
                    timerRef.current = setTimeout(() => {
                        console.log("Timeout triggered - stopping recorder");
                        if (recorder.state === 'recording') {
                            recorder.stop();
                            console.log("recorder.stop() called programmatically by timer");
                        }
                    }, recordingTime * 1000);
                };

                console.log("MediaRecorder initialized");
                setIsInitialized(true); // Mark as initialized
            } catch (error) {
                console.error("Error accessing microphone:", error);
                setIsInitialized(false); // Handle error case
            }
        };

        initializeMediaRecorder();

        return () => {
            if (mediaRecorderRef.current) {
                if (mediaRecorderRef.current.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
                mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [recordingTime, onRecordingComplete]); // Keep dependencies

    useEffect(() => {
        const recorder = mediaRecorderRef.current;
        if (startRecording && recorder && !isRecording && recorder.state !== 'recording' && isInitialized) {
            console.log("Start recording triggered by startRecording prop");
            recorder.start();
        } else if (!startRecording && isRecording && recorder && recorder.state === 'recording') {
            console.log("Stop recording triggered by !startRecording prop");
            recorder.stop();
        } else if (startRecording && !isInitialized) {
            console.log("Waiting for MediaRecorder to initialize...");
        }
    }, [startRecording, isRecording, isInitialized]);

    return (
        <div>
            {isRecording ? (
                <p className="text-blue-600">Recording in progress...</p>
            ) : audioUrl ? (
                <audio src={audioUrl} controls />
            ) : (
                <p>Ready to record</p>
            )}
        </div>
    );
};

export default MediaRecorderComponent;