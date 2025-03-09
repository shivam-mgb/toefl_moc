import { useReducer } from 'react';
import { createSpeakingSection } from '../../../api/api';
import { SpeakingSection } from '../../../types/types';

// Initial state
const initialState: SpeakingSection = {
  id: undefined, // Optional, added by backend
  title: '',
  task1: { prompt: '' },
  task2: { passage: '', audioFile: null, prompt: '' },
  task3: { passage: '', audioFile: null, prompt: '' },
  task4: { audioFile: null, prompt: '' },
};

// Reducer to manage state updates
function reducer(state: SpeakingSection, action: any): SpeakingSection {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, title: action.payload };
    case 'UPDATE_TASK1_PROMPT':
      return { ...state, task1: { ...state.task1, prompt: action.payload } };
    case 'UPDATE_TASK2_PASSAGE':
      return { ...state, task2: { ...state.task2, passage: action.payload } };
    case 'UPDATE_TASK2_AUDIO':
      return { ...state, task2: { ...state.task2, audioFile: action.payload } };
    case 'UPDATE_TASK2_PROMPT':
      return { ...state, task2: { ...state.task2, prompt: action.payload } };
    case 'UPDATE_TASK3_PASSAGE':
      return { ...state, task3: { ...state.task3, passage: action.payload } };
    case 'UPDATE_TASK3_AUDIO':
      return { ...state, task3: { ...state.task3, audioFile: action.payload } };
    case 'UPDATE_TASK3_PROMPT':
      return { ...state, task3: { ...state.task3, prompt: action.payload } };
    case 'UPDATE_TASK4_AUDIO':
      return { ...state, task4: { ...state.task4, audioFile: action.payload } };
    case 'UPDATE_TASK4_PROMPT':
      return { ...state, task4: { ...state.task4, prompt: action.payload } };
    default:
      return state;
  }
}

function AddSpeakingSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handler to save the section
  const handleSave = async () => {
    try {
      // Validation
      if (!state.title) throw new Error('Section title is required');
      if (!state.task2.audioFile) throw new Error('Task 2 audio file is required');
      if (!state.task3.audioFile) throw new Error('Task 3 audio file is required');
      if (!state.task4.audioFile) throw new Error('Task 4 audio file is required');

      // Prepare data for API
      const sectionData = {
        title: state.title,
        task1: state.task1,
        task2: { passage: state.task2.passage, prompt: state.task2.prompt },
        task3: { passage: state.task3.passage, prompt: state.task3.prompt },
        task4: { prompt: state.task4.prompt },
      };

      const response = await createSpeakingSection(
        sectionData,
        state.task2.audioFile!,
        state.task3.audioFile!,
        state.task4.audioFile!
      );
      console.log('Speaking section created:', response);
      alert('Speaking section saved successfully!');
    } catch (error) {
      console.error('Error saving speaking section:', error);
      alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Speaking Section</h1>

      {/* Section Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
        <input
          type="text"
          value={state.title}
          onChange={(e) => dispatch({ type: 'UPDATE_TITLE', payload: e.target.value })}
          placeholder="Enter section title"
          className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Task 1: Prompt only */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 1</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <input
            type="text"
            value={state.task1.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK1_PROMPT', payload: e.target.value })}
            placeholder="Enter prompt for Task 1"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Task 2: Passage, audio file, prompt */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 2</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Passage</label>
          <textarea
            value={state.task2.passage}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK2_PASSAGE', payload: e.target.value })}
            placeholder="Enter reading passage for Task 2"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              dispatch({ type: 'UPDATE_TASK2_AUDIO', payload: file });
            }}
            className="w-full"
          />
          {state.task2.audioFile && (
            <p className="mt-1 text-sm text-gray-600">Selected: {state.task2.audioFile.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <input
            type="text"
            value={state.task2.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK2_PROMPT', payload: e.target.value })}
            placeholder="Enter prompt for Task 2"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Task 3: Passage, audio file, prompt */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 3</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Passage</label>
          <textarea
            value={state.task3.passage}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK3_PASSAGE', payload: e.target.value })}
            placeholder="Enter reading passage for Task 3"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              dispatch({ type: 'UPDATE_TASK3_AUDIO', payload: file });
            }}
            className="w-full"
          />
          {state.task3.audioFile && (
            <p className="mt-1 text-sm text-gray-600">Selected: {state.task3.audioFile.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <input
            type="text"
            value={state.task3.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK3_PROMPT', payload: e.target.value })}
            placeholder="Enter prompt for Task 3"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Task 4: Audio file, prompt */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 4</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              dispatch({ type: 'UPDATE_TASK4_AUDIO', payload: file });
            }}
            className="w-full"
          />
          {state.task4.audioFile && (
            <p className="mt-1 text-sm text-gray-600">Selected: {state.task4.audioFile.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
          <input
            type="text"
            value={state.task4.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK4_PROMPT', payload: e.target.value })}
            placeholder="Enter prompt for Task 4"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Save Section
        </button>
      </div>
    </div>
  );
}

export default AddSpeakingSection;