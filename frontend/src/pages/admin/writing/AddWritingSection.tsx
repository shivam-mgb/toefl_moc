import { useReducer } from 'react';
import { createWritingSection } from '../../../api/api';
import { WritingSection } from '../../../types/types';

// Initial state
const initialState: WritingSection = {
  title: '',
  task1: { passage: '', audioFile: null, prompt: '' },
  task2: { passage: '', prompt: '' },
};

// Reducer to manage state updates
function reducer(state: WritingSection, action: any): WritingSection {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, title: action.payload };
    case 'UPDATE_TASK1_PASSAGE':
      return { ...state, task1: { ...state.task1, passage: action.payload } };
    case 'UPDATE_TASK1_AUDIO':
      return { ...state, task1: { ...state.task1, audioFile: action.payload } };
    case 'UPDATE_TASK1_PROMPT':
      return { ...state, task1: { ...state.task1, prompt: action.payload } };
    case 'UPDATE_TASK2_PASSAGE':
      return { ...state, task2: { ...state.task2, passage: action.payload } };
    case 'UPDATE_TASK2_PROMPT':
      return { ...state, task2: { ...state.task2, prompt: action.payload } };
    default:
      return state;
  }
}

function AddWritingSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handler to save the section
  const handleSave = async () => {
      try {
        // Validation
        if (!state.title) throw new Error('Section title is required');
        if (!state.task1.audioFile) throw new Error('Task 1 audio file is required');

  
        // Prepare data for API
        const sectionData = {
          title: state.title,
          task1: { passage: state.task1.passage, prompt: state.task1.prompt },
          task2: { passage: state.task2.passage, prompt: state.task2.prompt },
        };
  
        const response = await createWritingSection(
          sectionData,
          state.task1.audioFile!
        );
        console.log('Writing section created:', response);
        alert('Writing section saved successfully!');
      } catch (error) {
        console.error('Error saving writing section:', error);
        alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Writing Section</h1>

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

      {/* Task 1: Passage, Audio, Prompt */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 1</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Reading Passage</label>
          <textarea
            value={state.task1.passage}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK1_PASSAGE', payload: e.target.value })}
            placeholder="Enter reading passage for Task 1"
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
              dispatch({ type: 'UPDATE_TASK1_AUDIO', payload: file });
            }}
            className="w-full"
          />
          {state.task1.audioFile && (
            <p className="mt-1 text-sm text-gray-600">Selected: {state.task1.audioFile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Prompt</label>
          <input
            type="text"
            value={state.task1.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK1_PROMPT', payload: e.target.value })}
            placeholder="Enter question prompt for Task 1"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Task 2: Passage, Prompt */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Task 2</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Reading Passage</label>
          <textarea
            value={state.task2.passage}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK2_PASSAGE', payload: e.target.value })}
            placeholder="Enter reading passage for Task 2"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Prompt</label>
          <input
            type="text"
            value={state.task2.prompt}
            onChange={(e) => dispatch({ type: 'UPDATE_TASK2_PROMPT', payload: e.target.value })}
            placeholder="Enter question prompt for Task 2"
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Section
        </button>
      </div>
    </div>
  );
}

export default AddWritingSection;