import React, { useState } from 'react';
import ReadingPassageArea from '../components/ReadingPassageArea';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import ProseSummaryArea from '../components/ProseSummaryArea';
import InsertTextQuestion from '../components/InsertTextQuestion';
import { Passage } from '../types/types';

interface ReadingQuestionPageProps {
  passage: Passage;
  onPassageComplete: (passageId: string, answers: any) => void;
}

const ReadingQuestionPage: React.FC<ReadingQuestionPageProps> = ({ passage, onPassageComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[] | undefined>>({});

  const handleAnswerSelect = (questionId: string, answer: string[]) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < passage.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = passage.questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple_to_single':
        return (
          <MultipleChoiceQuestion
            key={currentQuestion.id}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={passage.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[currentQuestion.id!]}
            onAnswerSelect={(answer: string[]) => handleAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, answer)}
            isMultipleChoice={false}
          />
        );
      case 'multiple_to_multiple':
        return (
          <MultipleChoiceQuestion
            key={currentQuestion.id}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={passage.questions.length}
            questionText={currentQuestion.prompt}
            options={currentQuestion.options.map((opt, idx) => ({
              id: String.fromCharCode(97 + idx),
              text: opt,
            }))}
            selectedAnswer={selectedAnswers[currentQuestion.id!]}
            onAnswerSelect={(answer: string[]) => handleAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, answer)}
            isMultipleChoice={true}
          />
        );
      case 'insert_text':
        return (
          <InsertTextQuestion
            questionText={currentQuestion.prompt}
            passageText={passage.text}
            onAnswerSelect={(answer: string) => handleAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, [answer])}
          />
        );
      case 'prose_summary':
        return (
          <ProseSummaryArea
            question={currentQuestion}
            onAnswerSelect={(answer: string[]) => handleAnswerSelect(currentQuestion.id || `q${currentQuestionIndex}`, answer)}
          />
        );
      case 'table':
        return <p>TableQuestion component not implemented yet.</p>;
      case 'audio':
        return <p>AudioQuestion component not implemented yet.</p>;
      default:
        return <p>Unsupported question type: don't know what the type</p>;
    }
  };

  const areAllQuestionsAnswered = passage.questions.every((q) => {
    const answer = selectedAnswers[q.id || `q${passage.questions.indexOf(q)}`];
    return answer !== undefined && answer.length > 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ReadingPassageArea passageTitle={passage.title} passageText={passage.text} />
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
                onClick={() => onPassageComplete(passage.id || `p${currentQuestionIndex}`, selectedAnswers)}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === passage.questions.length - 1}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReadingQuestionPage;