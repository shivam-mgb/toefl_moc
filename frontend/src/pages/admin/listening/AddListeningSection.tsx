// src/components/admin/AddListeningSection.tsx
import { useReducer } from 'react';
import { createListeningSection } from '../../../api/api';
import MultipleToSingleInput from '../../../components/admin/MultipleToSingleInput';
import MultipleToMultipleInput from '../../../components/admin/MultipleToMultipleInput';
import TableQuestionInput from '../../../components/admin/TableQuestionInput';
import AudioQuestionInput from '../../../components/admin/AudioQuestionInput';
import { ListeningSection, Question } from '../../../types/types';

// Initial state
const initialState: ListeningSection = {
  title: '',
  audios: [],
};

// Reducer function to manage state updates
function reducer(state: ListeningSection, action: any): ListeningSection {
  switch (action.type) {
    case 'UPDATE_SECTION_TITLE':
      return { ...state, title: action.payload };
    case 'ADD_AUDIO':
      return {
        ...state,
        audios: [
          ...state.audios,
          { id: Date.now().toString(), title: '', audioFile: null, photoFile: null, questions: [] },
        ],
      };
    case 'UPDATE_AUDIO_TITLE':
      const { audioIdx, title } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, idx) =>
          idx === audioIdx ? { ...audio, title } : audio
        ),
      };
    case 'UPDATE_AUDIO_FILE':
      const { audioIdx: aiFile, file: audioFile } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, idx) =>
          idx === aiFile ? { ...audio, audioFile } : audio
        ),
      };
    case 'UPDATE_PHOTO_FILE':
      const { audioIdx: aiPhoto, file: photoFile } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, idx) =>
          idx === aiPhoto ? { ...audio, photoFile } : audio
        ),
      };
    case 'ADD_QUESTION':
      const { audioIdx: aiAdd } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, idx) =>
          idx === aiAdd
            ? {
                ...audio,
                questions: [
                  ...audio.questions,
                  { id: Date.now().toString(), type: '', prompt: '' } as Question | any,
                ],
              }
            : audio
        ),
      };
    case 'UPDATE_QUESTION_TYPE':
      const { audioIdx: aiType, questionIdx: qiType, type } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, aIdx) =>
          aIdx === aiType
            ? {
                ...audio,
                questions: audio.questions.map((question, qIdx) =>
                  qIdx === qiType ? { ...question, type } : question
                ),
              }
            : audio
        ),
      };
    case 'UPDATE_QUESTION_PROMPT':
      const { audioIdx: aiPrompt, questionIdx: qiPrompt, prompt } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, aIdx) =>
          aIdx === aiPrompt
            ? {
                ...audio,
                questions: audio.questions.map((question, qIdx) =>
                  qIdx === qiPrompt ? { ...question, prompt } : question
                ),
              }
            : audio
        ),
      };
    case 'UPDATE_QUESTION_DETAILS':
      const { audioIdx: aiDetails, questionIdx: qiDetails, details } = action.payload;
      return {
        ...state,
        audios: state.audios.map((audio, aIdx) =>
          aIdx === aiDetails
            ? {
                ...audio,
                questions: audio.questions.map((question, qIdx) =>
                  qIdx === qiDetails ? { ...question, ...details } : question
                ),
              }
            : audio
        ),
      };
    default:
      return state;
  }
}

function AddListeningSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handler to add a new audio
  const handleAddAudio = () => {
    dispatch({ type: 'ADD_AUDIO' });
  };

  // Handler to save the section
  const handleSave = async () => {
  try {
    if (!state.title) throw new Error('Section title is required');
    if (state.audios.some(audio => !audio.audioFile)) {
      throw new Error('All audios must have an audio file');
    }

    // Prepare sectionData without files
    const sectionData = {
      title: state.title,
      audios: state.audios.map(audio => ({
        title: audio.title,
        questions: audio.questions.map(question => {
          if (question.type === 'audio') {
            return { ...question, snippetFile: null }; // Remove file from data
          }
          return question;
        }),
      })),
    };

    const audioFiles = state.audios.map(audio => audio.audioFile!).filter(Boolean);
    const photoFiles = state.audios.map(audio => audio.photoFile).filter(Boolean) as File[];

    // Collect question audio files with indices
    const questionSnippetFiles = state.audios.flatMap((audio, audioIdx) =>
      audio.questions
        .map((question, questionIdx) => {
          if (question.type === 'audio' && question.snippetFile) {
            return { audioIdx, questionIdx, file: question.snippetFile };
          }
          return null;
        })
        .filter((item) => item !== null) as { audioIdx: number; questionIdx: number; file: File }[]
    );

    const response = await createListeningSection(sectionData, audioFiles, photoFiles, questionSnippetFiles);
    console.log('Listening section created:', response);
    alert('Listening section saved successfully!');
  } catch (error) {
    console.error('Error saving listening section:', error);
    alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Listening Section</h1>

      {/* Section Title Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
        <input
          type="text"
          value={state.title}
          onChange={(e) => dispatch({ type: 'UPDATE_SECTION_TITLE', payload: e.target.value })}
          placeholder="Enter section title"
          className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Audio Sections */}
      {state.audios.map((audio, audioIndex) => (
        <div key={audio.id} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Audio {audioIndex + 1}</h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Audio Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audio Title</label>
              <input
                type="text"
                value={audio.title}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_AUDIO_TITLE',
                    payload: { audioIdx: audioIndex, title: e.target.value },
                  })
                }
                placeholder="Enter audio title"
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Audio File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Audio File</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  dispatch({
                    type: 'UPDATE_AUDIO_FILE',
                    payload: { audioIdx: audioIndex, file },
                  });
                }}
                className="w-full"
              />
              {audio.audioFile && (
                <p className="mt-1 text-sm text-gray-600">Selected: {audio.audioFile.name}</p>
              )}
            </div>

            {/* Photo File Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  dispatch({
                    type: 'UPDATE_PHOTO_FILE',
                    payload: { audioIdx: audioIndex, file },
                  });
                }}
                className="w-full"
              />
              {audio.photoFile && (
                <p className="mt-1 text-sm text-gray-600">Selected: {audio.photoFile.name}</p>
              )}
            </div>
          </div>

          {/* Questions for this Audio */}
          {audio.questions.map((question, questionIndex) => (
            <div key={question.id} className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="text-lg font-medium mb-3 text-gray-600">Question {questionIndex + 1}</h3>

              {/* Question Type Dropdown */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_TYPE',
                      payload: { audioIdx: audioIndex, questionIdx: questionIndex, type: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="multiple_to_single">Multiple to Single</option>
                  <option value="multiple_to_multiple">Multiple to Multiple</option>
                  <option value="table">Table</option>
                  <option value="audio">Audio</option>
                </select>
              </div>


              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>


              {/* Conditional Rendering of Question Input Components */}
              {question.type === 'multiple_to_single' && (
                <MultipleToSingleInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { audioIdx: audioIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'multiple_to_multiple' && (
                <MultipleToMultipleInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { audioIdx: audioIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'table' && (
                <TableQuestionInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { audioIdx: audioIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'audio' && (
                <AudioQuestionInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { audioIdx: audioIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={() => dispatch({ type: 'ADD_QUESTION', payload: { audioIdx: audioIndex } })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
      ))}

      {/* Add Audio and Save Section Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleAddAudio}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Audio
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Save Section
        </button>
      </div>
    </div>
  );
}

export default AddListeningSection;