import React, { useState, useEffect } from 'react';
import TopMenu from '../components/TopMenu';
import ListeningQuestionPage from './ListeningQuestionPage';
import { TrackConfig, Question, TrackType } from '../types/listening';

// Track configurations
const TRACK_CONFIGS: TrackConfig[] = [
    {
        id: 'conv1',
        type: 'conversation',
        title: 'Student Discussion About Research Project',
        audioLength: 23, // 3 minutes
        questionCount: 5,
        imageUrl: 'src/assets/listening.jpeg',
        audioSrc: 'src/assets/listening.mp3',
        questions: [
            {
                id: 'conv1-q1',
                text: 'What is the main topic of the conversation?',
                options: [
                    { id: 'conv1-q1-a', text: 'The research project deadline' },
                    { id: 'conv1-q1-b', text: 'The professor\'s feedback' },
                    { id: 'conv1-q1-c', text: 'The group member\'s contributions' },
                    { id: 'conv1-q1-d', text: 'The research methodology' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv1-q2',
                text: 'Why is the student concerned about the project?',
                options: [
                    { id: 'conv1-q2-a', text: 'They don\'t understand the topic' },
                    { id: 'conv1-q2-b', text: 'They haven\'t finished their part' },
                    { id: 'conv1-q2-c', text: 'They disagree with the group\'s approach' },
                    { id: 'conv1-q2-d', text: 'They are worried about the presentation' }
                ],
                hasAudioSnippet: true,
                type: 'single-choice',
            },
            {
                id: 'conv1-q3',
                text: 'What does the other student suggest?',
                options: [
                    { id: 'conv1-q3-a', text: 'Asking the professor for an extension' },
                    { id: 'conv1-q3-b', text: 'Working together to finish the project' },
                    { id: 'conv1-q3-c', text: 'Dividing the work differently' },
                    { id: 'conv1-q3-d', text: 'Changing the research topic' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv1-q4',
                text: 'What is the tone of the conversation?',
                options: [
                    { id: 'conv1-q4-a', text: 'Angry and confrontational' },
                    { id: 'conv1-q4-b', text: 'Anxious and worried' },
                    { id: 'conv1-q4-c', text: 'Collaborative and supportive' },
                    { id: 'conv1-q4-d', text: 'Indifferent and dismissive' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv1-q5',
                text: 'What will the students likely do next?',
                options: [
                    { id: 'conv1-q5-a', text: 'Meet with the professor' },
                    { id: 'conv1-q5-b', text: 'Continue working on the project' },
                    { id: 'conv1-q5-c', text: 'Give up on the project' },
                    { id: 'conv1-q5-d', text: 'Ask another group for help' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv1-q6',
                text: 'Complete the table below:',
                type: 'table-completion',
                columnHeaders: ['Category 1', 'Category 2', 'Category 3'],
                rowHeaders: ['Row 1', 'Row 2', 'Row 3'],
                answers: [[false, false, false], [false, false, false], [false, false, false]]
            }
        ]
    },
    {
        id: 'conv2',
        type: 'conversation',
        title: 'Office Hours Meeting',
        audioLength: 180,
        questionCount: 5,
        imageUrl: 'src/assets/listening.jpeg',
        audioSrc: 'src/assets/listening.mp3',
        questions: [
            {
                id: 'conv2-q1',
                text: 'Why does the student visit the professor?',
                options: [
                    { id: 'conv2-q1-a', text: 'To ask for an extension on an assignment' },
                    { id: 'conv2-q1-b', text: 'To clarify a concept from the lecture' },
                    { id: 'conv2-q1-c', text: 'To discuss their grade on a test' },
                    { id: 'conv2-q1-d', text: 'To get advice on a research paper' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv2-q2',
                text: 'What is the professor\'s initial reaction to the student\'s question?',
                options: [
                    { id: 'conv2-q2-a', text: 'Surprised' },
                    { id: 'conv2-q2-b', text: 'Annoyed' },
                    { id: 'conv2-q2-c', text: 'Helpful' },
                    { id: 'conv2-q2-d', text: 'Confused' }
                ],
                hasAudioSnippet: true,
                type: 'single-choice',
            },
            {
                id: 'conv2-q3',
                text: 'What example does the professor use to explain the concept?',
                options: [
                    { id: 'conv2-q3-a', text: 'A historical event' },
                    { id: 'conv2-q3-b', text: 'A scientific experiment' },
                    { id: 'conv2-q3-c', text: 'A real-world scenario' },
                    { id: 'conv2-q3-d', text: 'A hypothetical situation' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv2-q4',
                text: 'How does the student feel after the explanation?',
                options: [
                    { id: 'conv2-q4-a', text: 'More confused' },
                    { id: 'conv2-q4-b', text: 'Relieved' },
                    { id: 'conv2-q4-c', text: 'Frustrated' },
                    { id: 'conv2-q4-d', text: 'Excited' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv2-q5',
                text: 'What does the professor suggest the student do next?',
                options: [
                    { id: 'conv2-q5-a', text: 'Read the textbook again' },
                    { id: 'conv2-q5-b', text: 'Attend the next lecture' },
                    { id: 'conv2-q5-c', text: 'Form a study group' },
                    { id: 'conv2-q5-d', text: 'Review their notes' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv1-q6',
                text: 'Complete the table below:',
                type: 'table-completion',
                columnHeaders: ['Category 1', 'Category 2', 'Category 3'],
                rowHeaders: ['Row 1', 'Row 2', 'Row 3'],
                answers: [[false, false, false], [false, false, false], [false, false, false]]
            }
        ]
    },
    {
        id: 'lec1',
        type: 'lecture',
        title: 'Introduction to Marine Biology',
        audioLength: 240, // 4 minutes
        questionCount: 6,
        imageUrl: 'src/assets/listening.jpeg',
        audioSrc: 'src/assets/listening.mp3',
        questions: [
            {
                id: 'lec1-q1',
                text: 'What is the main focus of the lecture?',
                options: [
                    { id: 'lec1-q1-a', text: 'Ocean pollution' },
                    { id: 'lec1-q1-b', text: 'Marine ecosystems' },
                    { id: 'lec1-q1-c', text: 'Whale migration' },
                    { id: 'lec1-q1-d', text: 'Deep-sea exploration' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec1-q2',
                text: 'According to the professor, what is the importance of coral reefs?',
                options: [
                    { id: 'lec1-q2-a', text: 'They are a source of food for humans' },
                    { id: 'lec1-q2-b', text: 'They protect coastlines from erosion' },
                    { id: 'lec1-q2-c', text: 'They are home to a wide variety of marine life' },
                    { id: 'lec1-q2-d', text: 'They regulate ocean temperature' }
                ],
                hasAudioSnippet: true,
                type: 'single-choice',
            },
            {
                id: 'lec1-q3',
                text: 'What is the biggest threat to marine ecosystems?',
                options: [
                    { id: 'lec1-q3-a', text: 'Overfishing' },
                    { id: 'lec1-q3-b', text: 'Climate change' },
                    { id: 'lec1-q3-c', text: 'Plastic pollution' },
                    { id: 'lec1-q3-d', text: 'All of the above' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec1-q4',
                text: 'What does the professor suggest as a solution to protect marine life?',
                options: [
                    { id: 'lec1-q4-a', text: 'Creating marine protected areas' },
                    { id: 'lec1-q4-b', text: 'Reducing carbon emissions' },
                    { id: 'lec1-q4-c', text: 'Promoting sustainable fishing practices' },
                    { id: 'lec1-q4-d', text: 'All of the above' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec1-q5',
                text: 'What is the professor\'s overall tone in the lecture?',
                options: [
                    { id: 'lec1-q5-a', text: 'Alarmist' },
                    { id: 'lec1-q5-b', text: 'Informative and concerned' },
                    { id: 'lec1-q5-c', text: 'Optimistic' },
                    { id: 'lec1-q5-d', text: 'Neutral' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec1-q6',
                text: 'What is the professor likely to discuss in the next lecture?',
                options: [
                    { id: 'lec1-q6-a', text: 'Specific types of marine animals' },
                    { id: 'lec1-q6-b', text: 'The history of marine biology' },
                    { id: 'lec1-q6-c', text: 'Research methods in marine biology' },
                    { id: 'lec1-q6-d', text: 'The impact of tourism on marine life' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec1-q7',
                text: 'Which of the following are threats to marine ecosystems? (Select all that apply)',
                options: [
                    { id: 'lec1-q7-a', text: 'Overfishing' },
                    { id: 'lec1-q7-b', text: 'Climate change' },
                    { id: 'lec1-q7-c', text: 'Plastic pollution' },
                    { id: 'lec1-q7-d', text: 'Habitat destruction' }
                ],
                hasAudioSnippet: false,
                type: 'multiple-choice-multiple-answer',
            }
        ]
    },
    {
        id: 'lec2',
        type: 'lecture',
        title: 'Modern Architecture',
        audioLength: 240,
        questionCount: 6,
        imageUrl: 'src/assets/listening.jpeg',
        audioSrc: 'src/assets/listening.mp3',
        questions: [
            {
                id: 'lec2-q1',
                text: 'What is the defining characteristic of modern architecture, according to the lecture?',
                options: [
                    { id: 'lec2-q1-a', text: 'Ornamentation' },
                    { id: 'lec2-q1-b', text: 'Use of traditional materials' },
                    { id: 'lec2-q1-c', text: 'Emphasis on functionality and simplicity' },
                    { id: 'lec2-q1-d', text: 'Symmetry and balance' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec2-q2',
                text: 'Which architect is mentioned as a pioneer of modern architecture?',
                options: [
                    { id: 'lec2-q2-a', text: 'Frank Lloyd Wright' },
                    { id: 'lec2-q2-b', text: 'Le Corbusier' },
                    { id: 'lec2-q2-c', text: 'Mies van der Rohe' },
                    { id: 'lec2-q2-d', text: 'All of the above' }
                ],
                hasAudioSnippet: true,
                type: 'single-choice',
            },
            {
                id: 'lec2-q3',
                text: 'What materials are commonly used in modern architecture?',
                options: [
                    { id: 'lec2-q3-a', text: 'Brick and stone' },
                    { id: 'lec2-q3-b', text: 'Wood and thatch' },
                    { id: 'lec2-q3-c', text: 'Steel, glass, and concrete' },
                    { id: 'lec2-q3-d', text: 'Marble and granite' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec2-q4',
                text: 'What is the relationship between form and function in modern architecture?',
                options: [
                    { id: 'lec2-q4-a', text: 'Form follows function' },
                    { id: 'lec2-q4-b', text: 'Function follows form' },
                    { id: 'lec2-q4-c', text: 'Form and function are unrelated' },
                    { id: 'lec2-q4-d', text: 'Form is more important than function' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec2-q5',
                text: 'What is a common criticism of modern architecture?',
                options: [
                    { id: 'lec2-q5-a', text: 'It is too expensive' },
                    { id: 'lec2-q5-b', text: 'It is not environmentally friendly' },
                    { id: 'lec2-q5-c', text: 'It is cold and impersonal' },
                    { id: 'lec2-q5-d', text: 'It is too difficult to construct' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec2-q6',
                text: 'What is the lecture likely to discuss next?',
                options: [
                    { id: 'lec2-q6-a', text: 'Specific examples of modern buildings' },
                    { id: 'lec2-q6-b', text: 'The history of architecture' },
                    { id: 'lec2-q6-c', text: 'The future of architecture' },
                    { id: 'lec2-q6-d', text: 'The role of architects in society' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'conv2-q6',
                text: 'Which of the following topics were discussed in the conversation? (Select all that apply)',
                options: [
                    { id: 'conv2-q6-a', text: 'Assignment extension' },
                    { id: 'conv2-q6-b', text: 'Lecture clarification' },
                    { id: 'conv2-q6-c', text: 'Test grade discussion' },
                    { id: 'conv2-q6-d', text: 'Research paper advice' }
                ],
                hasAudioSnippet: false,
                type: 'multiple-choice-multiple-answer',
            }
        ]
    },
    {
        id: 'lec3',
        type: 'lecture',
        title: 'Economic Theory',
        audioLength: 240,
        questionCount: 6,
        imageUrl: 'src/assets/listening.jpeg',
        audioSrc: 'src/assets/listening.mp3',
        questions: [
            {
                id: 'lec3-q1',
                text: 'What is the main economic theory discussed in the lecture?',
                options: [
                    { id: 'lec3-q1-a', text: 'Keynesian economics' },
                    { id: 'lec3-q1-b', text: 'Supply-side economics' },
                    { id: 'lec3-q1-c', text: 'Monetarism' },
                    { id: 'lec3-q1-d', text: 'Behavioral economics' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec3-q2',
                text: 'According to the theory, what is the primary driver of economic growth?',
                options: [
                    { id: 'lec3-q2-a', text: 'Government spending' },
                    { id: 'lec3-q2-b', text: 'Consumer spending' },
                    { id: 'lec3-q2-c', text: 'Investment' },
                    { id: 'lec3-q2-d', text: 'Exports' }
                ],
                hasAudioSnippet: true,
                type: 'single-choice',
            },
            {
                id: 'lec3-q3',
                text: 'What is the role of the government in this economic theory?',
                options: [
                    { id: 'lec3-q3-a', text: 'To actively intervene in the economy' },
                    { id: 'lec3-q3-b', text: 'To maintain a stable money supply' },
                    { id: 'lec3-q3-c', text: 'To provide social safety nets' },
                    { id: 'lec3-q3-d', text: 'To minimize its involvement in the economy' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec3-q4',
                text: 'What is a potential criticism of this economic theory?',
                options: [
                    { id: 'lec3-q4-a', text: 'It can lead to inflation' },
                    { id: 'lec3-q4-b', text: 'It can lead to unemployment' },
                    { id: 'lec3-q4-c', text: 'It can lead to income inequality' },
                    { id: 'lec3-q4-d', text: 'All of the above' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec3-q5',
                text: 'How does this theory compare to other economic theories?',
                options: [
                    { id: 'lec3-q5-a', text: 'It is completely different' },
                    { id: 'lec3-q5-b', text: 'It shares some similarities but has key differences' },
                    { id: 'lec3-q5-c', text: 'It is a more modern version of an older theory' },
                    { id: 'lec3-q5-d', text: 'It is a combination of several other theories' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
            {
                id: 'lec3-q6',
                text: 'What is the professor likely to discuss next?',
                options: [
                    { id: 'lec3-q6-a', text: 'Real-world applications of the theory' },
                    { id: 'lec3-q6-b', text: 'The history of economic thought' },
                    { id: 'lec3-q6-c', text: 'Alternative economic theories' },
                    { id: 'lec3-q6-d', text: 'The role of international trade' }
                ],
                hasAudioSnippet: false,
                type: 'single-choice',
            },
             {
                id: 'lec3-q7',
                text: 'Which of the following concepts were discussed in the lecture? (Select all that apply)',
                options: [
                    { id: 'lec3-q7-a', text: 'Keynesian economics' },
                    { id: 'lec3-q7-b', text: 'Supply-side economics' },
                    { id: 'lec3-q7-c', text: 'Monetarism' },
                    { id: 'lec3-q7-d', text: 'Behavioral economics' }
                ],
                hasAudioSnippet: false,
                type: 'multiple-choice-multiple-answer',
            }
        ]
    }
];

const ListeningSectionPage: React.FC = () => {
    // Section state
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [sectionComplete, setSectionComplete] = useState(false);
    const [sectionTimeRemaining, setSectionTimeRemaining] = useState(2400); // 40 minutes
    const [hasStarted, setHasStarted] = useState(false);

    const currentTrack = TRACK_CONFIGS[currentTrackIndex];
    useEffect(() => {
        if (currentTrack.audioSrc && !hasStarted) {
            setHasStarted(true);
        }
    }, [currentTrack.audioSrc, hasStarted]);

    // Format time for display
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    const getTrackProgress = (track: TrackConfig): string => {
        const trackNumber = currentTrackIndex + 1;
        const totalTracks = TRACK_CONFIGS.length;
        const trackType = track.type === 'conversation' ? 'Conversation' : 'Lecture';
        return `${trackType} ${trackNumber} of ${totalTracks}`;
    };

    const handleTrackComplete = () => {
        console.log("currentTrackIndex", currentTrackIndex)
        if (currentTrackIndex < TRACK_CONFIGS.length - 1) {
            setCurrentTrackIndex((prev) => prev + 1);
        } else {
            setSectionComplete(true);
        }
    };

    if (sectionComplete) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-100">
                <TopMenu
                    sectionTitle="Listening Section"
                    questionProgress="Complete"
                    timer={formatTime(sectionTimeRemaining)}
                />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Listening Section Completed
                        </h2>
                        <p className="text-gray-600">
                            You have completed all listening tracks and their questions.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* The ListeningQuestionPage component will handle its own TopMenu */}
            <ListeningQuestionPage
                trackType={currentTrack.type}
                trackConfig={currentTrack}
                sectionProgress={getTrackProgress(currentTrack)}
                sectionTimer={formatTime(sectionTimeRemaining)}
                onTrackComplete={handleTrackComplete}
            />
        </div>
    );
};

export default ListeningSectionPage;
