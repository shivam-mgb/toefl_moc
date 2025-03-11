import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import ReadingQuestionPage from './ReadingQuestionPage';
import { ReadingSectionResponse, Passage } from '../types/types';
import { getReadingSection, submitReadingAnswers } from '../api/api'; // Import API functions

const ReadingSectionPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingSection, setReadingSection] = useState<ReadingSectionResponse | null>(null);
  
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(600); // 10 minutes in seconds
  const [passageAnswers, setPassageAnswers] = useState<Record<string, any>>({});
  // const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  // Fetch the reading section data
  useEffect(() => {
    if (!testId) {
      setError('No test ID provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    getReadingSection(testId)
      .then(data => {
        setReadingSection(data);
        // Set timer based on section info if available
        // if (data.timeLimit) {
        //   setSectionTimeRemaining(data.timeLimit);
        // }
        setSectionTimeRemaining(100);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reading section:', err);
        setError('Failed to load reading section. Please try again.');
        setLoading(false);
      });
  }, [testId]);

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle passage completion
  const handlePassageComplete = (passageId: string, answers: any) => {
    setPassageAnswers((prevAnswers) => ({ 
      ...prevAnswers, 
      [passageId]: answers 
    }));
    
    if (readingSection && currentPassageIndex < readingSection.passages.length - 1) {
      setCurrentPassageIndex((prev) => prev + 1);
    } else {
      // Submit all answers when the last passage is completed
      handleSubmitAllAnswers();
    }
  };

  // Handle final submission
  const handleSubmitAllAnswers = async () => {
    if (!testId || !readingSection) return;
    
    // setSubmitting(true);
    try {
      const result = await submitReadingAnswers(testId, passageAnswers);
      setSubmissionResult(result);
      setSectionComplete(true);
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Failed to submit answers. Please try again.');
    } finally {
      // setSubmitting(false);
    }
  };

  // Timer logic
  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      if (sectionTimeRemaining <= 0 && !sectionComplete) {
        // Auto-submit when time runs out
        handleSubmitAllAnswers();
      }
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading reading section...</div>;
  }

  // Error state
  if (error || !readingSection) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <p className="text-red-500 mb-4">{error || 'Reading section not available'}</p>
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
        <TopMenu
          sectionTitle="Reading Section"
          questionProgress="Complete"
          timer={formatTime(sectionTimeRemaining)}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Reading Section Completed
            </h2>
            {submissionResult && submissionResult.score !== undefined && (
              <div className="mb-6">
                <p className="text-xl font-semibold text-teal-600">
                  Your Score: {submissionResult.score}
                </p>
                {submissionResult.feedback && (
                  <p className="text-gray-600 mt-2">{submissionResult.feedback}</p>
                )}
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

  // Get current passage
  const currentPassage: Passage = readingSection.passages[currentPassageIndex];

  // Main render
  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu
        sectionTitle="Reading Section"
        questionProgress={`${currentPassageIndex + 1}/${readingSection.passages.length}`}
        timer={formatTime(sectionTimeRemaining)}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ReadingQuestionPage
          passage={currentPassage}
          onPassageComplete={handlePassageComplete}
        />
      </main>
    </div>
  );
};

export default ReadingSectionPage;