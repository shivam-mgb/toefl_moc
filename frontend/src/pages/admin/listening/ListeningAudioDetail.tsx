
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ListeningAudioDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Audio data state
  const [audioData, setAudioData] = useState({
    id: 0,
    title: '',
    type: '',
    duration: '',
    audioUrl: '',
    transcript: '',
    questions: [] as { id: number; stem: string; type: string }[]
  });

  // Fetch audio data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockData = {
        id: parseInt(id || '0'),
        title: 'Lecture on Climate Change',
        type: 'Lecture',
        duration: '5:30',
        audioUrl: 'https://example.com/audio/lecture.mp3',
        transcript: 'Today we are going to discuss climate change and its global impact. Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases...',
        questions: [
          { id: 1, stem: "What is the main purpose of the professor's lecture?", type: "Multiple Choice" },
          { id: 2, stem: "According to the professor, what is the primary cause of modern climate change?", type: "Multiple Choice" },
          { id: 3, stem: "Complete the table summarizing the effects of climate change mentioned in the lecture.", type: "Table Completion" }
        ]
      };
      
      setAudioData(mockData);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading audio details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{audioData.title}</h1>
        <nav className="text-sm text-gray-500">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/admin" className="hover:text-teal-600">Dashboard</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/admin/listening" className="hover:text-teal-600">Listening</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/admin/listening/audio" className="hover:text-teal-600">Audio Files</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700">{audioData.title}</li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Audio Details */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <ul className="flex">
                <li className="flex-1 text-center">
                  <button className="w-full py-4 px-1 border-b-2 border-teal-500 font-medium text-sm text-teal-600">
                    Audio Details
                  </button>
                </li>
                <li className="flex-1 text-center">
                  <button className="w-full py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Transcript
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Audio Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Title</label>
                    <p className="mt-1 text-sm text-gray-900">{audioData.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{audioData.type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Duration</label>
                    <p className="mt-1 text-sm text-gray-900">{audioData.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Questions</label>
                    <p className="mt-1 text-sm text-gray-900">{audioData.questions.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Audio Player</h2>
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-24">
                  <p className="text-gray-500">Audio player would be embedded here</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Transcript Preview</h2>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-sm text-gray-700">
                    {audioData.transcript.length > 200 
                      ? `${audioData.transcript.substring(0, 200)}...` 
                      : audioData.transcript}
                  </p>
                </div>
                <button className="mt-2 text-sm text-teal-600 hover:text-teal-800">
                  View full transcript
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to={`/admin/listening/audio/${id}/edit`}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Edit Audio Details
            </Link>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this audio file? This will also delete all associated questions.")) {
                  // Delete logic would go here
                  navigate('/admin/listening/audio');
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Delete Audio
            </button>
          </div>
        </div>
        
        {/* Right Column - Questions */}
        <div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">Associated Questions</h2>
              <Link 
                to="/admin/listening/questions/add" 
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                + Add Question
              </Link>
            </div>
            
            {audioData.questions.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {audioData.questions.map((question) => (
                  <li key={question.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 truncate" title={question.stem}>
                          {question.stem}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {question.type}
                        </p>
                      </div>
                      <div>
                        <Link 
                          to={`/admin/listening/questions/${question.id}/edit`}
                          className="text-sm text-teal-600 hover:text-teal-800"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">No questions associated with this audio yet.</p>
                <Link 
                  to="/admin/listening/questions/add" 
                  className="mt-2 inline-block text-sm text-teal-600 hover:text-teal-800"
                >
                  Add your first question
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningAudioDetail;
