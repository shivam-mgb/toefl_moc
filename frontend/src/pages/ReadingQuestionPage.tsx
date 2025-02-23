import React, { useState } from 'react';
import TopMenu from '../components/TopMenu';
import Navigation from '../components/Navigation';
import ReadingPassageArea from '../components/ReadingPassageArea';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import ProseSummaryQuestion from '../components/ProseSummaryQuestion';
import InsertTextQuestion from '../components/InsertTextQuestion';
import TableCompletionQuestion from '../components/TableCompletionQuestion';

// Placeholder content
const PLACEHOLDER_PASSAGE = {
  title: "The Evolution of Urban Planning",
  text: `
    <p>Urban planning has undergone significant transformations throughout history, 
    reflecting the changing needs and values of societies. The modern concept of urban 
    planning emerged in the late 19th century as a response to the challenges posed by 
    rapid industrialization and urban growth.</p>

    <p>The Industrial Revolution marked a turning point in the way cities were designed 
    and organized. As factories drew large populations to urban centers, cities faced 
    unprecedented challenges in housing, sanitation, and transportation. Early urban 
    planners sought to address these issues through various approaches, from the 
    creation of wide boulevards to the establishment of public parks and green spaces.</p>

    <p>One influential movement in urban planning was the Garden City Movement, 
    initiated by Ebenezer Howard in 1898. Howard proposed self-contained communities 
    that combined the benefits of both urban and rural living. These garden cities 
    were designed to be surrounded by green belts, limiting their size and maintaining 
    a connection to nature.</p>

    <p>The modernist movement of the early 20th century brought new ideas to urban 
    planning. Architects and planners like Le Corbusier advocated for functional 
    zoning, separating residential, commercial, and industrial areas. This approach 
    emphasized efficiency and rationality but sometimes led to monotonous and 
    impersonal urban environments.</p>

    <p>Contemporary urban planning has shifted towards more sustainable and 
    human-centered approaches. Planners now prioritize mixed-use developments, 
    walkability, and public transportation. There is also greater emphasis on 
    preserving historical architecture and cultural heritage while accommodating 
    modern needs.</p>

    <p>The challenges facing urban planners today are complex and multifaceted. 
    They must address issues such as climate change, social equity, and technological 
    integration while creating livable and resilient cities. The future of urban 
    planning will likely continue to evolve as cities adapt to new challenges and 
    opportunities.</p>
  `
};

// Placeholder questions
const PLACEHOLDER_QUESTIONS = [
  {
    id: '1',
    text: 'According to the passage, what was the primary catalyst for the development of modern urban planning?',
    options: [
      { id: 'a', text: 'The Industrial Revolution and its associated challenges' },
      { id: 'b', text: 'The Garden City Movement of 1898' },
      { id: 'c', text: 'The modernist movement of the early 20th century' },
      { id: 'd', text: 'Contemporary sustainability concerns' }
    ]
  },
  {
    id: '3',
    type: 'multiple_answer',
    text: 'Which THREE of the following were mentioned in the passage as key developments in urban planning history?',
    options: [
      { id: 'a', text: 'The Garden City Movement' },
      { id: 'b', text: 'The Renaissance period' },
      { id: 'c', text: 'The Industrial Revolution' },
      { id: 'd', text: 'The Medieval era' },
      { id: 'e', text: 'The Modernist movement' },
      { id: 'f', text: 'Contemporary sustainable design' }
    ]
  },
  {
    id: '2',
    type: 'prose_summary',
    text: 'Complete the summary of the passage by selecting THREE answer choices that express the most important ideas. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage.',
    options: [
      { 
        id: 'a', 
        text: 'The Industrial Revolution led to rapid urbanization and new challenges in city planning.' 
      },
      { 
        id: 'b', 
        text: 'The Garden City Movement proposed self-contained communities surrounded by green belts.' 
      },
      { 
        id: 'c', 
        text: 'Modern urban planning emerged as a response to industrialization challenges.' 
      },
      { 
        id: 'd', 
        text: 'Contemporary urban planning focuses on sustainability and human-centered approaches.' 
      },
      { 
        id: 'e', 
        text: 'Urban planners face ongoing challenges related to climate change and social equity.' 
      },
      { 
        id: 'f', 
        text: 'The modernist movement emphasized functional zoning and separation of urban areas.' 
      }
    ]
  }
];

// Add new placeholder content for new question types
const PLACEHOLDER_INSERT_TEXT = {
  questionText: "Where should the following sentence be inserted into the passage?",
  sentenceToInsert: "This shift in urban development patterns has led to significant changes in how cities allocate resources and plan for future growth.",
  passageText: `The rise of remote work has fundamentally altered how cities function and develop.[1] This shift, accelerated by recent global events, has challenged traditional urban planning assumptions.[2] The resulting urban structure influenced everything from transportation systems to housing prices.[3] However, the widespread adoption of remote work has begun to reshape these established patterns.[4]`,
  insertionPoints: [1, 2, 3, 4]
};

const PLACEHOLDER_TABLE = {
  questionText: "Complete the table by selecting the appropriate options for each cell.",
  columnHeaders: ["Traditional Cities", "Remote Work Cities"],
  rowHeaders: ["Infrastructure", "Housing", "Transportation"],
  cells: [
    [
      { content: "Centralized" },
      { isInput: true }
    ],
    [
      { content: "Dense Urban" },
      { isInput: true }
    ],
    [
      { isInput: true },
      { content: "Flexible Routes" }
    ]
  ]
};

const ReadingQuestionPage: React.FC = () => {
  // State for question display and answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [questionType] = useState<'multiple-choice' | 'prose-summary' | 'insert-text' | 'table-completion'>('multiple-choice');

  const currentQuestion = PLACEHOLDER_QUESTIONS[currentQuestionIndex];

  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: Array.isArray(answer) ? answer : [answer]
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < PLACEHOLDER_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderQuestion = () => {
    switch (questionType) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={PLACEHOLDER_QUESTIONS.length}
            questionText={currentQuestion.text}
            options={currentQuestion.options}
            selectedAnswer={selectedAnswers[currentQuestion.id]?.[0]}
            onAnswerSelect={(answer: string) => handleAnswerSelect(currentQuestion.id, answer)}
          />
        );
      case 'prose-summary':
        return (
          <ProseSummaryQuestion
            questionText={currentQuestion.text}
            options={currentQuestion.options}
            onAnswerSelect={(answer: string[]) => handleAnswerSelect(currentQuestion.id, answer)}
          />
        );
      case 'insert-text':
        return (
          <InsertTextQuestion
            questionText={PLACEHOLDER_INSERT_TEXT.questionText}
            passageText={PLACEHOLDER_INSERT_TEXT.passageText}
            insertionPoints={PLACEHOLDER_INSERT_TEXT.insertionPoints}
          />
        );
      case 'table-completion':
        return (
          <TableCompletionQuestion
            questionText={PLACEHOLDER_TABLE.questionText}
            columnHeaders={PLACEHOLDER_TABLE.columnHeaders}
            rowHeaders={PLACEHOLDER_TABLE.rowHeaders}
            cells={PLACEHOLDER_TABLE.cells}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TopMenu 
        sectionTitle="Reading Section"
        questionProgress={`${currentQuestionIndex + 1}/${PLACEHOLDER_QUESTIONS.length}`}
        timer="20:00"
      />
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2">
            <ReadingPassageArea
              passageTitle={PLACEHOLDER_PASSAGE.title}
              passageText={PLACEHOLDER_PASSAGE.text}
            />
          </div>
          <div className="lg:order-1">
            {renderQuestion()}
          </div>
        </div>
      </main>
      {/* Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Navigation 
            onNext={handleNext}
            isNextDisabled={!selectedAnswers[currentQuestion.id]}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingQuestionPage;
