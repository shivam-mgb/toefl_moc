import React, { useState, useEffect, useRef } from 'react';

interface MediaRecorderComponentProps {
  recordingTime: number;
  onRecordingComplete: (audioUrl: string) => void;
}

const MediaRecorderComponent: React.FC<MediaRecorderComponentProps> = ({ recordingTime, onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    let timer: any;
    let recorder: MediaRecorder | null = null;

    const initializeMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks: Blob[] = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks);
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          onRecordingComplete(url);
        };

        recorder.onstart = () => {
          setIsRecording(true);
          timer = setTimeout(() => {
            setIsRecording(false);
            recorder?.stop();
          }, recordingTime * 1000);
        };

        recorder.start();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    if (!isInitialized.current) {
      initializeMediaRecorder();
      isInitialized.current = true;
    }

    return () => {
      recorder?.stream?.getTracks().forEach(track => track.stop());
      clearTimeout(timer);
    };
  }, [recordingTime, onRecordingComplete]);

  return (
    <div>
      {isRecording ? (
        <p>Recording...</p>
      ) : audioUrl ? (
        <audio src={audioUrl} controls />
      ) : (
        <p>Recording Finished</p>
      )}
    </div>
  );
};

export default MediaRecorderComponent;
