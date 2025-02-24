import React, { useState, useEffect } from 'react';

interface SpeakingSectionTimerProps {
  prepTime: number;
  responseTime: number;
  onPrepTimeEnd: () => void;
  onResponseTimeEnd: () => void;
}

const SpeakingSectionTimer: React.FC<SpeakingSectionTimerProps> = ({
  prepTime,
  responseTime,
  onPrepTimeEnd,
  onResponseTimeEnd,
}) => {
  const [timer, setTimer] = useState(prepTime);
  const [isPrepTime, setIsPrepTime] = useState(true);

  useEffect(() => {
    setTimer(prepTime);
    setIsPrepTime(true);
  }, [prepTime, responseTime]);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | undefined = undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval as any);
      if (isPrepTime) {
        setIsPrepTime(false);
        setTimer(responseTime);
        onPrepTimeEnd();
      } else {
        onResponseTimeEnd();
      }
    }

    return () => clearInterval(interval as any);
  }, [timer, isPrepTime, prepTime, responseTime, onPrepTimeEnd, onResponseTimeEnd]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      border: '1px solid #008080',
      borderRadius: '5px',
      marginBottom: '20px',
      fontFamily: 'Open Sans, sans-serif',
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#475569',
      }}>{isPrepTime ? 'Preparation Time' : 'Recording Time'}</h2>
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333333',
      }}>{formatTime(timer)}</p>
    </div>
  );
};

export default SpeakingSectionTimer;
