import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import ListeningQuestionPage from './ListeningQuestionPage';
import { ListeningSectionResponse, AudioResponse } from '../types/types';
import { getListeningSection, submitListeningAnswers } from '../api/api';

const ListeningSectionPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listeningSection, setListeningSection] = useState<ListeningSectionResponse | null>(null);

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(600); // 10 minutes in seconds
  const [audioAnswers, setAudioAnswers] = useState<Record<string, any>>({});
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  
  // A key to force remount of the ListeningQuestionPage component
  const [questionPageKey, setQuestionPageKey] = useState(0);

  // Fetch listening section data
  useEffect(() => {
    if (!testId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    getListeningSection(testId)
      .then((data) => {
        setListeningSection(data);
        console.log(data);
        
        setSectionTimeRemaining(100); // Adjust as needed
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching listening section:', err);
        setError('Failed to load listening section. Please try again.');
        setLoading(false);
      });
  }, [testId]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle audio completion
  const handleAudioComplete = (audioId: string, answers: any) => {
    setAudioAnswers((prevAnswers) => ({
      ...prevAnswers,
      [audioId]: answers,
    }));

    if (listeningSection && currentAudioIndex < listeningSection.audios.length - 1) {
      // Move to next audio and force remount of the question page component
      setCurrentAudioIndex((prev) => prev + 1);
      setQuestionPageKey(prev => prev + 1); // Increment key to force remount
    } else {
      handleSubmitAllAnswers();
    }
  };

  // Submit all answers
  const handleSubmitAllAnswers = async () => {
    if (!testId || !listeningSection) return;

    try {
      const result = await submitListeningAnswers(testId, audioAnswers);
      setSubmissionResult(result);
      setSectionComplete(true);
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Failed to submit answers. Please try again.');
    }
  };

  // Timer logic
  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      if (sectionTimeRemaining <= 0 && !sectionComplete) {
        handleSubmitAllAnswers();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading listening section...</div>;
  }

  // Error state
  if (error || !listeningSection) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500 mb-4">{error || 'Listening section not available'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Completion screen
  if (sectionComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <TopMenu sectionTitle="Listening Section" questionProgress="Complete" timer={formatTime(sectionTimeRemaining)} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Listening Section Completed</h2>
            {submissionResult && submissionResult.score !== undefined && (
              <div className="mb-6">
                <p className="text-xl font-semibold text-teal-600">Your Score: {submissionResult.score}</p>
                {submissionResult.feedback && <p className="text-gray-600 mt-2">{submissionResult.feedback}</p>}
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Return to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  const currentAudio: AudioResponse = listeningSection.audios[currentAudioIndex];

  // Main render
  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu
        sectionTitle="Listening Section"
        questionProgress={`${currentAudioIndex + 1}/${listeningSection.audios.length}`}
        timer={formatTime(sectionTimeRemaining)}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ListeningQuestionPage 
          key={questionPageKey} // Add key to force remount when it changes
          audio={currentAudio} 
          currentAudioIndex={currentAudioIndex} 
          onAudioComplete={handleAudioComplete} 
        />
      </main>
    </div>
  );
};

export default ListeningSectionPage;