import { useReducer } from 'react';
import { SpeakingSectionState } from '../../../types/types';

// Initial state
const initialState: SpeakingSectionState = {
  title: '',
  task1: { prompt: '' },
  task2: { passage: '', audioFile: null, prompt: '' },
  task3: { passage: '', audioFile: null, prompt: '' },
  task4: { audioFile: null, prompt: '' },
};

// Reducer to manage state updates
function reducer(state: SpeakingSectionState, action: any): SpeakingSectionState {
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
  const handleSave = () => {
    const formData = new FormData();
    formData.append('title', state.title);

    // Task 1: Prompt only
    formData.append('task1[prompt]', state.task1.prompt);

    // Task 2: Passage, audio file (blob), and prompt
    formData.append('task2[passage]', state.task2.passage);
    if (state.task2.audioFile) {
      formData.append('task2[audioFile]', state.task2.audioFile);
    }
    formData.append('task2[prompt]', state.task2.prompt);

    // Task 3: Passage, audio file (blob), and prompt
    formData.append('task3[passage]', state.task3.passage);
    if (state.task3.audioFile) {
      formData.append('task3[audioFile]', state.task3.audioFile);
    }
    formData.append('task3[prompt]', state.task3.prompt);

    // Task 4: Audio file (blob) and prompt
    if (state.task4.audioFile) {
      formData.append('task4[audioFile]', state.task4.audioFile);
    }
    formData.append('task4[prompt]', state.task4.prompt);

    // Simulate sending to server (replace with actual API call)
    console.log('FormData prepared with blobs:', formData);
    alert('Speaking section saved successfully! Check console for FormData.');
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

export default AddSpeakingSection;