import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import ReadingQuestionPage from './ReadingQuestionPage';
import { PassageConfig } from '../types/reading';


// Passage configurations.  Replace with your actual passage data.
const PASSAGE_CONFIGS: PassageConfig[] = [
    {
        id: 'passage1',
        title: 'The Evolution of Urban Planning',
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
        `,
        questions: [
          {
            id: 'passage1-q1',
            text: 'According to the passage, what was the primary catalyst for the development of modern urban planning?',
            options: [
              { id: 'a', text: 'The Industrial Revolution and its associated challenges' },
              { id: 'b', text: 'The Garden City Movement of 1898' },
              { id: 'c', text: 'The modernist movement of the early 20th century' },
              { id: 'd', text: 'Contemporary sustainability concerns' }
            ],
            type: 'multiple_choice',
            correctAnswer: 'a',
          },
          {
            id: 'passage1-q2',
            text: 'Which THREE of the following were mentioned in the passage as key developments in urban planning history?',
            options: [
              { id: 'a', text: 'The Garden City Movement' },
              { id: 'b', text: 'The Renaissance period' },
              { id: 'c', text: 'The Industrial Revolution' },
              { id: 'd', text: 'The Medieval era' },
              { id: 'e', text: 'The Modernist movement' },
              { id: 'f', text: 'Contemporary sustainable design' }
            ],
            type: 'multiple_choice',
            correctAnswer: ['a', 'c', 'e'],
          },
          {
            id: 'passage1-q4',
            type: 'insert_text',
            text: 'Insert this sentence into the most logical place in the passage:',
            passageText: 'The rise of remote work has fundamentally altered how cities function and develop.[1] This shift, accelerated by recent global events, has challenged traditional urban planning assumptions.[2] The resulting urban structure influenced everything from transportation systems to housing prices.[3] However, the widespread adoption of remote work has begun to reshape these established patterns.[4]',
            insertionPoints: [1, 2, 3, 4],
            correctAnswer: '3',
          },
          {
            id: 'passage1-q3',
            type: 'prose_summary',
            text: 'Complete the summary of the passage by selecting THREE answer choices that express the most important ideas. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage.',
            options: [
              { id: 'a', text: 'The Industrial Revolution led to rapid urbanization and new challenges in city planning.' },
              { id: 'b', text: 'The Garden City Movement proposed self-contained communities surrounded by green belts.' },
              { id: 'c', text: 'Modern urban planning emerged as a response to industrialization challenges.' },
              { id: 'd', text: 'Contemporary urban planning focuses on sustainability and human-centered approaches.' },
              { id: 'e', text: 'Urban planners face ongoing challenges related to climate change and social equity.' },
              { id: 'f', text: 'The modernist movement emphasized functional zoning and separation of urban areas.' }
            ],
            correctAnswer: ['a', 'b', 'd'],
          }
        ],
    },
    {
        id: 'passage2',
        title: 'The Evolution of Something Else',
        text: `
          <p>Something Else has undergone significant transformations throughout history, 
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
        `,
        questions: [
          {
            id: 'passage1-q1',
            text: 'According to the passage, what was the primary catalyst for the development of modern urban planning?',
            options: [
              { id: 'a', text: 'The Industrial Revolution and its associated challenges' },
              { id: 'b', text: 'The Garden City Movement of 1898' },
              { id: 'c', text: 'The modernist movement of the early 20th century' },
              { id: 'd', text: 'Contemporary sustainability concerns' }
            ],
            type: 'multiple_choice',
            correctAnswer: 'a',
          },
          {
            id: 'passage1-q2',
            text: 'Which THREE of the following were mentioned in the passage as key developments in urban planning history?',
            options: [
              { id: 'a', text: 'The Garden City Movement' },
              { id: 'b', text: 'The Renaissance period' },
              { id: 'c', text: 'The Industrial Revolution' },
              { id: 'd', text: 'The Medieval era' },
              { id: 'e', text: 'The Modernist movement' },
              { id: 'f', text: 'Contemporary sustainable design' }
            ],
            type: 'multiple_choice',
            correctAnswer: ['a', 'c', 'e'],
          },
          {
            id: 'passage1-q4',
            type: 'insert_text',
            text: 'Insert this sentence into the most logical place in the passage:',
            passageText: 'The rise of remote work has fundamentally altered how cities function and develop.[1] This shift, accelerated by recent global events, has challenged traditional urban planning assumptions.[2] The resulting urban structure influenced everything from transportation systems to housing prices.[3] However, the widespread adoption of remote work has begun to reshape these established patterns.[4]',
            insertionPoints: [1, 2, 3, 4],
            correctAnswer: '3',
          },
          {
            id: 'passage1-q3',
            type: 'prose_summary',
            text: 'Complete the summary of the passage by selecting THREE answer choices that express the most important ideas. Some sentences do not belong in the summary because they express ideas that are not presented in the passage or are minor ideas in the passage.',
            options: [
              { id: 'a', text: 'The Industrial Revolution led to rapid urbanization and new challenges in city planning.' },
              { id: 'b', text: 'The Garden City Movement proposed self-contained communities surrounded by green belts.' },
              { id: 'c', text: 'Modern urban planning emerged as a response to industrialization challenges.' },
              { id: 'd', text: 'Contemporary urban planning focuses on sustainability and human-centered approaches.' },
              { id: 'e', text: 'Urban planners face ongoing challenges related to climate change and social equity.' },
              { id: 'f', text: 'The modernist movement emphasized functional zoning and separation of urban areas.' }
            ],
            correctAnswer: ['a', 'b', 'd'],
          }
        ],
    },
    // Add more passages as needed
];

const ReadingSectionPage: React.FC = () => {
    
    const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
    const [sectionComplete, setSectionComplete] = useState(false);
    const [sectionTimeRemaining, setSectionTimeRemaining] = useState(600); // 10 minutes in seconds
    const [passageAnswers, setPassageAnswers] = useState<Record<string, any>>({}); //Store answers per passage

    console.log('ReadingSectionPage rendered, currentPassageIndex:', currentPassageIndex); 

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handlePassageComplete = (passageId: string, answers: any) => {
        setPassageAnswers((prevAnswers) => ({ ...prevAnswers, [passageId]: answers }));
        console.log('Answers for passage', passageId, ':', answers);
        console.log('Before setCurrentPassageIndex:', currentPassageIndex); // Log before state update
        if (currentPassageIndex < PASSAGE_CONFIGS.length - 1) {
            setCurrentPassageIndex((prev) => prev + 1);
            console.log('After setCurrentPassageIndex:', currentPassageIndex + 1); // Log after state update
        } else {
            setSectionComplete(true);
            console.log('Section Complete set to true');
        }
    };

    const currentPassage = PASSAGE_CONFIGS[currentPassageIndex];

    useEffect(() => {
        if (sectionComplete || sectionTimeRemaining <= 0) {
            return;
        }
    
        const timer = setInterval(() => {
            setSectionTimeRemaining(prevTime => {
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

    const getPassageProgress = (): string => {
        const passageNumber = currentPassageIndex + 1;
        const totalPassages = PASSAGE_CONFIGS.length;
        return `Passage ${passageNumber} of ${totalPassages}`;
    };


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
    console.log('Current passage config:', PASSAGE_CONFIGS[currentPassageIndex]); // Add this log

    return (
        <div className="min-h-screen flex flex-col">
            <TopMenu
                sectionTitle="Reading Section"
                questionProgress={`${currentPassageIndex + 1}/${PASSAGE_CONFIGS.length}`}
                timer={formatTime(sectionTimeRemaining)}
            />
            <main className="flex-grow container mx-auto px-4 py-8">
                {!sectionComplete && (
                    <ReadingQuestionPage
                        passageConfig={PASSAGE_CONFIGS[currentPassageIndex]}
                        onPassageComplete={handlePassageComplete}
                    />
                )}
            </main>
        </div>
    );
};

export default ReadingSectionPage;

