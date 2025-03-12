import React, { useState, useEffect } from 'react';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import TableCompletionQuestion from '../components/TableCompletionQuestion';
import { AudioResponse, QuestionResponse } from '../types/types';

interface ListeningQuestionPageProps {
  audio: AudioResponse;
  currentAudioIndex: number;
  onAudioComplete: (audioId: string, answers: any) => void;
}

const ListeningQuestionPage: React.FC<ListeningQuestionPageProps> = ({ audio, currentAudioIndex, onAudioComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false); 
  

  // Simulate audio playback (replace with actual audio logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false);
      setShowQuestions(true);
    }, 180000); // 3 minutes for audio
    return () => clearTimeout(timer);
  }, []);

  // Handle answer selection
  const onAnswerSelect = (questionId: string, answer: any) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < audio.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleEndAudio = () => {
    setIsPlaying(false);
    setShowQuestions(true);
  };


  const renderQuestion = () => {
    const currentQuestion: QuestionResponse = audio.questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple_to_single':
        return (
          <MultipleChoiceQuestion
            key={currentQuestion.id}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={audio.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[currentQuestion.id!]}
            onAnswerSelect={(answer: string[]) => onAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, answer)}
            isMultipleChoice={false}
          />
        );
      case 'multiple_to_multiple':
        return (
          <MultipleChoiceQuestion
            key={currentQuestion.id}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={audio.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[currentQuestion.id!]}
            onAnswerSelect={(answer: string[]) => onAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, answer)}
            isMultipleChoice={true}
          />
        );
      case 'table':
        return (
          <TableCompletionQuestion
            questionText={currentQuestion.prompt}
            columnHeaders={currentQuestion.columns || []}
            rowHeaders={currentQuestion.rows || []}
            answers={selectedAnswers[currentQuestion.id!] || []}
            onAnswerChange={(rowIndex, colIndex, value) =>
              onAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, {
                ...selectedAnswers[currentQuestion.id!],
                [rowIndex]: { ...selectedAnswers[currentQuestion.id!]?.[rowIndex], [colIndex]: value },
              })
            }
          />
        );
      default:
        return <p>Unsupported question type: {currentQuestion.type}</p>;
    }
  };

  const areAllQuestionsAnswered = audio.questions.every((q) => {
    const answer = selectedAnswers[q.id || `q${audio.questions.indexOf(q)}`];
    return answer !== undefined && (Array.isArray(answer) ? answer.length > 0 : true);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1>{audio.title}</h1>
        <h2>{audio.audio_url}</h2>
        {!showQuestions ? (
          <AudioPlayerComponent
            audioSrc={audio.audio_url}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleEndAudio}
          />
        ) : (
          <div>
            {renderQuestion()}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Previous
              </button>
              {areAllQuestionsAnswered ? (
                <button
                  onClick={() => onAudioComplete(audio.id || `a${currentAudioIndex}`, selectedAnswers)}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === audio.questions.length - 1}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListeningQuestionPage;