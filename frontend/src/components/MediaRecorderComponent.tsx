import React, { useState, useEffect, useRef } from 'react';

interface MediaRecorderComponentProps {
  recordingTime: number;
  onRecordingComplete: (audioUrl: string) => void;
  startRecording: boolean;
  onRecordingPhaseEnd: () => void;
}

const MediaRecorderComponent: React.FC<MediaRecorderComponentProps> = ({ recordingTime, onRecordingComplete, startRecording, onRecordingPhaseEnd }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const isInitialized = useRef(false);
  let timer: any;

  useEffect(() => {
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
          onRecordingPhaseEnd();
        };

        recorder.onstart = () => {
          setIsRecording(true);
          timer = setTimeout(() => {
            setIsRecording(false);
            recorder?.stop();
          }, recordingTime * 1000);
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    return () => {
      recorder?.stream?.getTracks().forEach(track => track.stop());
      clearTimeout(timer);
    };
  }, [recordingTime, onRecordingComplete]);

  useEffect(() => {
    let recorder: MediaRecorder | null = null;
    if (startRecording && !isInitialized.current) {

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
          isInitialized.current = true;

        } catch (error) {
          console.error("Error accessing microphone:", error);
        }
      };
      initializeMediaRecorder();
    }
  }, [startRecording, recordingTime, onRecordingComplete, isInitialized, isRecording]);

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
