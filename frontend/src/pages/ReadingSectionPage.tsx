import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import ReadingQuestionPage from './ReadingQuestionPage';
import { ReadingSectionResponse, Passage } from '../types/types'; // Import types from types.ts

// Define props interface to accept readingSection
interface ReadingSectionPageProps {
  readingSection: ReadingSectionResponse;
}

const ReadingSectionPage: React.FC<ReadingSectionPageProps> = ({ readingSection }) => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(600); // 10 minutes in seconds
  const [passageAnswers, setPassageAnswers] = useState<Record<string, any>>({}); // Store answers per passage

  // Format time for display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle passage completion
  const handlePassageComplete = (passageId: string, answers: any) => {
    setPassageAnswers((prevAnswers) => ({ ...prevAnswers, [passageId]: answers }));
    console.log('Answers for passage', passageId, ':', answers);
    console.log('So the passageAnswers is: ', passageAnswers);
    
    if (currentPassageIndex < readingSection.passages.length - 1) {
      setCurrentPassageIndex((prev) => prev + 1);
      console.log('Moved to passage index:', currentPassageIndex + 1);
    } else {
      setSectionComplete(true);
      console.log('Section Complete set to true');
    }
  };

  // Timer logic
  useEffect(() => {
    if (sectionComplete || sectionTimeRemaining <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSectionTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setSectionComplete(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sectionComplete, sectionTimeRemaining]);

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
            <p className="text-gray-600">
              You have completed all reading passages and their questions.
            </p>
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