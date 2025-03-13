import React, { useState, useEffect } from 'react';
import AudioPlayerComponent from '../components/AudioPlayerComponent';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import TableCompletionQuestion from '../components/TableCompletionQuestion';
import AudioQuestion from '../components/AudioQuestion'; // New import for the Audio Question component
import { AudioResponse, QuestionResponse } from '../types/types';

interface ListeningQuestionPageProps {
  audio: AudioResponse;
  currentAudioIndex: number;
  onAudioComplete: (audioId: string, answers: any) => void;
}

const ListeningQuestionPage: React.FC<ListeningQuestionPageProps> = ({ audio, currentAudioIndex, onAudioComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [isPlaying, setIsPlaying] = useState(true); // Start with autoplay enabled
  const [showQuestions, setShowQuestions] = useState(false);
  
  // Reset the question index and answers when the audio changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowQuestions(false);
    setIsPlaying(true); // Ensure audio starts playing when audio changes
  }, [audio, currentAudioIndex]);

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

    const questionId = currentQuestion.id || `q${currentQuestionIndex}`;

    switch (currentQuestion.type) {
      case 'multiple_to_single':
        return (
          <MultipleChoiceQuestion
            key={questionId}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={audio.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[questionId]}
            onAnswerSelect={(answer: string[]) => onAnswerSelect(questionId, answer)}
            isMultipleChoice={false}
          />
        );
      case 'multiple_to_multiple':
        return (
          <MultipleChoiceQuestion
            key={questionId}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={audio.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[questionId]}
            onAnswerSelect={(answer: string[]) => onAnswerSelect(questionId, answer)}
            isMultipleChoice={true}
          />
        );
      case 'audio':
        return (
          <AudioQuestion
            key={questionId}
            questionId={questionId}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={audio.questions.length}
            questionText={currentQuestion.prompt}
            audioUrl={currentQuestion.audio_url}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[questionId]}
            onAnswerSelect={(answer: string[]) => onAnswerSelect(questionId, answer)}
          />
        );
      case 'table':
        // Initialize the table answers properly if they don't exist yet
        const tableAnswers = selectedAnswers[questionId] || {};
        
        return (
          <TableCompletionQuestion
            questionText={currentQuestion.prompt}
            columnHeaders={currentQuestion.columns || []}
            rowHeaders={currentQuestion.rows || []}
            answers={tableAnswers}
            onAnswerChange={(rowIndex, colIndex, value) => {
              // Create a properly nested structure for table answers
              const updatedAnswers = { ...tableAnswers };
              if (!updatedAnswers[rowIndex]) {
                updatedAnswers[rowIndex] = {};
              }
              updatedAnswers[rowIndex][colIndex] = value;
              onAnswerSelect(questionId, updatedAnswers);
            }}
          />
        );
      default:
        return <p>Unsupported question type: {currentQuestion.type}</p>;
    }
  };

  const areAllQuestionsAnswered = audio.questions.every((q) => {
    const answer = selectedAnswers[q.id || `q${audio.questions.indexOf(q)}`];
    if (!answer) return false;
    
    if (q.type === 'table') {
      return Object.keys(answer || {}).length > 0;
    }
    
    return Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">{audio.title}</h1>
        {!showQuestions ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Listen to the audio</h2>
            <p className="mb-4">Audio will play automatically. You can answer questions after the audio finishes.</p>
            <AudioPlayerComponent
              audioSrc={audio.audio_url}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleEndAudio}
            />
            <button
              onClick={handleEndAudio}
              className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Skip to Questions
            </button>
          </div>
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
              {currentQuestionIndex === audio.questions.length - 1 ? (
                <button
                  onClick={() => onAudioComplete(audio.id || `a${currentAudioIndex}`, selectedAnswers)}
                  disabled={!areAllQuestionsAnswered}
                  className={`font-bold py-2 px-4 rounded ${
                    areAllQuestionsAnswered 
                      ? 'bg-teal-500 hover:bg-teal-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
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