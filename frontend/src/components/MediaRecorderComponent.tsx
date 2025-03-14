import React, { useState, useEffect, useRef } from 'react';

interface MediaRecorderComponentProps {
  recordingTime: number;
  taskId: string;
  onRecordingCapture: (recordingBlob: Blob) => void;
}

const MediaRecorderComponent: React.FC<MediaRecorderComponentProps> = ({
  recordingTime,
  taskId,
  onRecordingCapture
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(recordingTime);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Initialize the recorder on component mount
    initializeMediaRecorder();

    // Cleanup function
    return () => {
      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingCapture(audioBlob);
        
        // Stop the countdown timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      // Start recording automatically once initialized
      startRecording();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setErrorMessage("Could not access microphone. Please check your permissions.");
    }
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'recording') return;
    
    audioChunksRef.current = [];
    setTimeRemaining(recordingTime);
    
    // Start the recorder
    mediaRecorderRef.current.start();
    setIsRecording(true);
    
    // Start countdown timer
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Stop the recording when time is up
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Set a timeout to stop recording after the specified time
    timerRef.current = setTimeout(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    }, recordingTime * 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}
      
      {isRecording ? (
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <div className="text-xl font-bold text-red-500">Recording</div>
            <div className="text-2xl font-semibold">{formatTime(timeRemaining)}</div>
          </div>
          
          <div className="relative w-full h-12 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-1000"
              style={{ width: `${(timeRemaining / recordingTime) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={stopRecording}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
            >
              Stop Recording
            </button>
          </div>
        </div>
      ) : audioUrl ? (
        <div className="w-full max-w-md">
          <p className="mb-2 text-center font-medium">Recording Complete</p>
          <audio src={audioUrl} controls className="w-full mb-4" />
          <div className="text-center text-sm text-gray-600">
            Your response has been recorded
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Initializing microphone...</p>
          <div className="animate-pulse flex space-x-4 items-center justify-center">
            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaRecorderComponent;