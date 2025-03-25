import React, { useEffect, useState } from 'react';
import AudioPlayerSimple from '../components/AudioPlayerSimple';
import { useParams } from 'react-router-dom';
import { fetchSpeakingSectionResponse } from '../api/api';
import { SpeakingSectionReview as SpeakingResponse, returnUrlOfAudio } from '../types/types';


const SpeakingSectionReviewPage: React.FC = () => {
    const { secId } = useParams<{ secId: string }>();
    const [response, setResponse] = useState<SpeakingResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const res = await fetchSpeakingSectionResponse(secId!);
                setResponse(res);
            } catch (error) {
                console.error('Error fetching response:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponse();
    }, [secId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!response) {
        return <div className="min-h-screen bg-gray-100 p-6">No response data found.</div>;
    }

    const totalScore = response.tasks.reduce((acc, task) => acc + (task.score || 0), 0);
    const maxPossibleScore = response.tasks.length * 100; // Assuming each task is scored out of 100
    const overallScore = response ? (totalScore / maxPossibleScore) * 100 : 0;


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Speaking Section Review</h1>
            </header>

            <main className="max-w-4xl mx-auto space-y-8">
                {/* Overall Score Section */}
                <section className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Overall Score</h2>
                    <p className="text-2xl text-blue-600">
                        {overallScore.toFixed(2)}/100
                    </p>
                </section>

                {/* Task-wise Review Section */}
                {response.tasks.map((task) => (
                    <div key={task.task_id} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Task {task.task_number}</h3>

                        {/* Audio Playback Section
                        <section className="mb-4">
                            <h4 className="text-md font-semibold mb-2">Audio Response</h4>
                            <div className="flex items-center gap-4">
                                <audio controls src={task.audio_url} className="flex-1">
                                    Your browser does not support the audio element.
                                </audio>
                                <a
                                    href={task.audio_url}
                                    download
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Download
                                </a>
                            </div>
                        </section> */}

                        <AudioPlayerSimple src={returnUrlOfAudio(task.audio_url)} />
                        
                        {/* Score Section */}
                        <section className="mb-4">
                            <h4 className="text-md font-semibold mb-2">Score</h4>
                            <p className="text-xl text-green-600">
                                {task.score !== null ? `${task.score}/100` : 'Not available'}
                            </p>
                        </section>

                        {/* Feedback Section */}
                        <section>
                            <h4 className="text-md font-semibold mb-2">Feedback</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {task.feedback || 'No feedback provided.'}
                            </p>
                        </section>
                    </div>
                ))}
            </main>

            <footer className="mt-8">
                <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back
                </button>
            </footer>
        </div>
    );
};

export default SpeakingSectionReviewPage;
