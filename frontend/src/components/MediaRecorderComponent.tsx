import React, { useState, useEffect, useRef } from 'react';

interface MediaRecorderComponentProps {
    recordingTime: number;
    onRecordingComplete: (audioUrl: string) => void;
    startRecording: boolean;
}

const MediaRecorderComponent: React.FC<MediaRecorderComponentProps> = ({ recordingTime, onRecordingComplete, startRecording }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioChunks = useRef<Blob[]>([]); // useRef to hold audio chunks across renders
    const recorderRef = useRef<MediaRecorder | null>(null); // useRef to hold recorder for timer access
    const isInitialized = useRef(false); // To ensure initialization runs only once
    let timer: any = useRef<ReturnType<typeof setTimeout> | null>(null).current; // Use useRef for timer

    useEffect(() => {
        let recorder: MediaRecorder | null = null;

        const initializeMediaRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                recorderRef.current = recorder; // Store in ref for timer access
                audioChunks.current = []; // Initialize audioChunks array for each recording session

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunks.current.push(event.data);
                    }
                };

                recorder.onstop = () => {
                    console.log("recorder.onstop event triggered"); // Debug log
                    setIsRecording(false);
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioUrl(url);
                    onRecordingComplete(url);
                    stream.getTracks().forEach(track => track.stop()); // Stop stream here as well for cleanup
                };

                recorder.onstart = () => {
                    console.log("recorder.onstart event triggered"); // Debug log
                    setIsRecording(true);
                    timer = setTimeout(() => {
                        console.log("Timeout in onstart triggered - stopping recorder"); // Debug log
                        if (recorder && recorder.state === 'recording') {
                            recorder.stop();
                            console.log("recorder.stop() called programmatically by timer"); // Debug log
                        } else {
                            console.log("Recorder not in 'recording' state or recorder is null when timer expired.");
                        }
                    }, recordingTime * 1000);
                };

                console.log("MediaRecorder initialized");

            } catch (error) {
                console.error("Error accessing microphone:", error);
                // Handle error appropriately, maybe set an error state and display a message
            }
        };

        if (!isInitialized.current) {
            initializeMediaRecorder();
            isInitialized.current = true;
        }

        return () => {
            if (recorder) {
                recorder.stream?.getTracks().forEach(track => track.stop());
            }
            if (timer) { // Clear timer only if it's set (to avoid potential issues on unmount)
                clearTimeout(timer);
                timer = null; // Reset timer ref
            }
        };
    }, [recordingTime, onRecordingComplete]); // Removed startRecording from dependency array


    useEffect(() => {
        if (startRecording && mediaRecorder && !isRecording && mediaRecorder.state !== 'recording') {
            console.log("Start recording triggered by startRecording prop"); // Debug log
            mediaRecorder.start();
        } else if (!startRecording && isRecording && mediaRecorder && mediaRecorder.state === 'recording') {
            console.log("Stop recording triggered by !startRecording prop"); // Debug log
            mediaRecorder.stop();
        }
    }, [startRecording, mediaRecorder, isRecording]);


    return (
        <div>
            {isRecording ? (
                <p className='text-blue-600'>Recording in progress...</p>
            ) : audioUrl ? (
                <audio src={audioUrl} controls />
            ) : (
                <p>Ready to record</p>
            )}
        </div>
    );
};

export default MediaRecorderComponent;