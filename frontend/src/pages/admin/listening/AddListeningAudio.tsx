
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddListeningAudio: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('lecture');
  const [transcript, setTranscript] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile) {
      alert('Please select an audio file to upload');
      return;
    }
    
    // Simulate upload process
    setIsUploading(true);
    
    // Here you would normally send the data to your backend
    console.log({
      title,
      type,
      transcript,
      audioFile
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsUploading(false);
      navigate('/admin/listening/audio');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Listening Audio</h1>
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
            <li className="text-gray-700">Add New Audio</li>
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audio Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g., Lecture on Climate Change"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audio Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="lecture">Lecture</option>
              <option value="conversation">Conversation</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audio File
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*"
                className="hidden"
                required
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Select Audio File
              </button>
              <span className="ml-3 text-sm text-gray-500">
                {audioFile ? audioFile.name : 'No file selected'}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Supported formats: MP3, WAV, OGG (max. 50MB)
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transcript
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              rows={8}
              placeholder="Enter the complete transcript of the audio here..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/admin/listening/audio"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isUploading}
              className={`bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md ${
                isUploading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload Audio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListeningAudio;
