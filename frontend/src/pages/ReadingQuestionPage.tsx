import React, { useState, useEffect } from 'react';
import ReadingPassageArea from '../components/ReadingPassageArea';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import ProseSummaryArea from '../components/ProseSummaryArea';
import InsertTextQuestion from '../components/InsertTextQuestion';
import { PassageConfig, Question, isMultipleChoice, isProseSummary, isInsertText } from '../types/reading';

interface ReadingQuestionPageProps {
    passageConfig: PassageConfig;
    onPassageComplete: (passageId: string, answers: any) => void;
}

const ReadingQuestionPage: React.FC<ReadingQuestionPageProps> = ({ passageConfig, onPassageComplete }) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[] | undefined>>({});

    console.log('ReadingQuestionPage rendered, currentQuestionIndex:', currentQuestionIndex);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
    }, [passageConfig]);

    const handleAnswerSelect = (questionId: string, answer: string[]) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < passageConfig.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };


    const renderQuestion = () => {
        console.log('renderQuestion called, currentQuestionIndex:', currentQuestionIndex);
        const currentQuestion = passageConfig.questions[currentQuestionIndex];
        if (currentQuestion) {
            if (isMultipleChoice(currentQuestion)) {
                return (
                  <MultipleChoiceQuestion
                      key={currentQuestion.id}
                      questionNumber={currentQuestionIndex + 1}
                      totalQuestions={passageConfig.questions.length}
                      questionText={currentQuestion.text}
                      options={currentQuestion.options}
                      selectedAnswer={selectedAnswers[currentQuestion.id]}
                      onAnswerSelect={(answer: string[]) => handleAnswerSelect(currentQuestion.id, answer)}
                      isMultipleChoice={Array.isArray(currentQuestion.correctAnswer)}
                  />
                );
            } else if (isProseSummary(currentQuestion)) {
                return (
                  <ProseSummaryArea
                      questionText={currentQuestion.text}
                      options={currentQuestion.options}
                      onAnswerSelect={handleAnswerSelect} // Passed directly
                      questionId={currentQuestion.id}      // Passed questionId separately
                  />
                );
            } else if (isInsertText(currentQuestion)) {
                return (
                    <InsertTextQuestion
                        questionText={currentQuestion.text}
                        passageText={currentQuestion.passageText}
                        insertionPoints={currentQuestion.insertionPoints}
                        onAnswerSelect={(answer: string) => handleAnswerSelect(currentQuestion.id, [answer])} // Wrapped in array
                    />
                );
            } else {
                return <p>Unsupported question type</p>;
            }
        }
        return null;
    };


    const areAllQuestionsAnswered = passageConfig.questions.every((q) => {
      const answer = selectedAnswers[q.id];
      return answer !== undefined;
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ReadingPassageArea passageTitle={passageConfig.title} passageText={passageConfig.text} />
                <div>
                    {renderQuestion()}
                    <div className="mt-4 flex justify-between">
                        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Previous</button>
                        {areAllQuestionsAnswered ? (
                            <button onClick={() => onPassageComplete(passageConfig.id, selectedAnswers)} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        ) : (
                            <button onClick={handleNext} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Next</button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReadingQuestionPage;
