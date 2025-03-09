import React, { useReducer } from 'react';
import { createReadingSection } from '../../../api/api'; // Adjust path as needed
import { ReadingSection, Question } from '../../../types/types';
import MultipleToSingleInput from '../../../components/admin/MultipleToSingleInput'; // Example component
import MultipleToMultipleInput from '../../../components/admin/MultipleToMultipleInput'; // Example component
import InsertTextInput from '../../../components/admin/InsertTextInput'; // Example component
import ProseSummaryInput from '../../../components/admin/ProseSummaryInput'; // Example component
import TableQuestionInput from '../../../components/admin/TableQuestionInput'; // Example component
import AudioQuestionInput from '../../../components/admin/AudioQuestionInput'; // Example component

// Define the initial state
const initialState: ReadingSection = {
  title: '',
  passages: [],
};

// Reducer to manage state
function reducer(state: ReadingSection, action: any): ReadingSection {
  switch (action.type) {
    case 'UPDATE_SECTION_TITLE':
      return { ...state, title: action.payload };
    case 'ADD_PASSAGE':
      return {
        ...state,
        passages: [
          ...state.passages,
          { id: Date.now().toString(), title: '', text: '', questions: [] },
        ],
      };
    case 'UPDATE_PASSAGE_TITLE':
      const { passageIdx, title } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, idx) =>
          idx === passageIdx ? { ...passage, title } : passage
        ),
      };
    case 'UPDATE_PASSAGE_TEXT':
      const { passageIdx: pIdxText, text } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, idx) =>
          idx === pIdxText ? { ...passage, text } : passage
        ),
      };
    case 'ADD_QUESTION':
      const { passageIdx: pIdxAdd } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, idx) =>
          idx === pIdxAdd
            ? {
                ...passage,
                questions: [
                  ...passage.questions,
                  { id: Date.now().toString(), type: '', prompt: '' } as Question | any,
                ],
              }
            : passage
        ),
      };
    case 'UPDATE_QUESTION_TYPE':
      const { passageIdx: pIdxType, questionIdx: qIdxType, type } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, pIdx) =>
          pIdx === pIdxType
            ? {
                ...passage,
                questions: passage.questions.map((question, qIdx) =>
                  qIdx === qIdxType ? { ...question, type } : question
                ),
              }
            : passage
        ),
      };
    case 'UPDATE_QUESTION_PROMPT':
      const { passageIdx: pIdxPrompt, questionIdx: qIdxPrompt, prompt } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, pIdx) =>
          pIdx === pIdxPrompt
            ? {
                ...passage,
                questions: passage.questions.map((question, qIdx) =>
                  qIdx === qIdxPrompt ? { ...question, prompt } : question
                ),
              }
            : passage
        ),
      };
    case 'UPDATE_QUESTION_DETAILS':
      const { passageIdx: pIdxDetails, questionIdx: qIdxDetails, details } = action.payload;
      return {
        ...state,
        passages: state.passages.map((passage, pIdx) =>
          pIdx === pIdxDetails
            ? {
                ...passage,
                questions: passage.questions.map((question, qIdx) =>
                  qIdx === qIdxDetails ? { ...question, ...details } : question
                ),
              }
            : passage
        ),
      };
    default:
      return state;
  }
}

const AddReadingSectionPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handlers for adding passages and questions
  const handleAddPassage = () => {
    dispatch({ type: 'ADD_PASSAGE' });
  };

  const handleAddQuestion = (passageIdx: number) => {
    dispatch({ type: 'ADD_QUESTION', payload: { passageIdx } });
  };

  // Save the section to the backend
  const handleSave = async () => {
    try {
      if (!state.title) throw new Error('Section title is required');
      if (state.passages.length === 0) throw new Error('At least one passage is required');

      const sectionData = {
        title: state.title,
        passages: state.passages.map((passage) => ({
          title: passage.title,
          text: passage.text,
          questions: passage.questions,
        })),
      };

      const response = await createReadingSection(sectionData);
      console.log('Reading section created:', response);
      alert('Reading section saved successfully!');
    } catch (error) {
      console.error('Error saving reading section:', error);
      alert(`Failed to save: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Reading Section</h1>

      {/* Section Title */}
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

      {/* Passages */}
      {state.passages.map((passage, passageIndex) => (
        <div key={passage.id} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Passage {passageIndex + 1}</h2>

          {/* Passage Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Passage Title</label>
            <input
              type="text"
              value={passage.title}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_PASSAGE_TITLE',
                  payload: { passageIdx: passageIndex, title: e.target.value },
                })
              }
              placeholder="Enter passage title"
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Passage Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Passage Text</label>
            <textarea
              value={passage.text}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_PASSAGE_TEXT',
                  payload: { passageIdx: passageIndex, text: e.target.value },
                })
              }
              placeholder="Enter passage text"
              className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div>

          {/* Questions */}
          {passage.questions.map((question, questionIndex) => (
            <div key={question.id} className="mt-4 p-4 border border-gray-200 rounded-md bg-white">
              <h3 className="text-lg font-medium mb-3 text-gray-600">Question {questionIndex + 1}</h3>

              {/* Question Type */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <select
                  value={question.type}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_TYPE',
                      payload: {
                        passageIdx: passageIndex,
                        questionIdx: questionIndex,
                        type: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="multiple_to_single">Multiple to Single</option>
                  <option value="multiple_to_multiple">Multiple to Multiple</option>
                  <option value="insert_text">Insert Text</option>
                  <option value="prose_summary">Prose Summary</option>
                  <option value="table">Table</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              {/* Question Prompt */}
              {question.type && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
              )}

              {/* Conditional Question Input Components */}
              {question.type === 'multiple_to_single' && (
                <MultipleToSingleInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'multiple_to_multiple' && (
                <MultipleToMultipleInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'insert_text' && (
                <InsertTextInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'prose_summary' && (
                <ProseSummaryInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'table' && (
                <TableQuestionInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
              {question.type === 'audio' && (
                <AudioQuestionInput
                  onChange={(data) =>
                    dispatch({
                      type: 'UPDATE_QUESTION_DETAILS',
                      payload: { passageIdx: passageIndex, questionIdx: questionIndex, details: data },
                    })
                  }
                />
              )}
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={() => handleAddQuestion(passageIndex)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
      ))}

      {/* Add Passage and Save Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleAddPassage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Passage
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
};

export default AddReadingSectionPage;