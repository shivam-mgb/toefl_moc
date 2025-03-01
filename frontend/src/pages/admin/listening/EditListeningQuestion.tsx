
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditListeningQuestion: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [audioFile, setAudioFile] = useState('');
  const [questionStem, setQuestionStem] = useState('');
  
  // Multiple choice specific state
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ]);
  
  // Table completion specific state
  const [tableHeaders, setTableHeaders] = useState(['', '']);
  const [tableRows, setTableRows] = useState([
    ['', ''],
    ['', '']
  ]);
  const [blankCells, setBlankCells] = useState([
    [false, false],
    [false, false]
  ]);

  // Mock fetch data
  useEffect(() => {
    // Simulate API call to fetch question data
    setTimeout(() => {
      // Mock data for the question being edited
      const mockData = {
        id: parseInt(id || '0'),
        type: 'multiple-choice',
        audioFileId: '1',
        stem: "What is the main purpose of the professor's lecture?",
        options: [
          { text: 'To explain climate change causes', isCorrect: true },
          { text: 'To discuss solutions to global warming', isCorrect: false },
          { text: 'To review historical weather patterns', isCorrect: false },
          { text: 'To predict future environmental changes', isCorrect: false }
        ]
      };

      setQuestionType(mockData.type);
      setAudioFile(mockData.audioFileId);
      setQuestionStem(mockData.stem);
      setOptions(mockData.options);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index
    }));
    setOptions(newOptions);
  };

  const handleTableHeaderChange = (index: number, value: string) => {
    const newHeaders = [...tableHeaders];
    newHeaders[index] = value;
    setTableHeaders(newHeaders);
  };

  const handleTableCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...tableRows];
    newRows[rowIndex][colIndex] = value;
    setTableRows(newRows);
  };

  const handleBlankCellToggle = (rowIndex: number, colIndex: number) => {
    const newBlankCells = [...blankCells];
    newBlankCells[rowIndex][colIndex] = !newBlankCells[rowIndex][colIndex];
    setBlankCells(newBlankCells);
  };

  const addTableRow = () => {
    setTableRows([...tableRows, Array(tableHeaders.length).fill('')]);
    setBlankCells([...blankCells, Array(tableHeaders.length).fill(false)]);
  };

  const addTableColumn = () => {
    setTableHeaders([...tableHeaders, '']);
    setTableRows(tableRows.map(row => [...row, '']));
    setBlankCells(blankCells.map(row => [...row, false]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the data to your backend
    console.log({
      id,
      questionType,
      audioFile,
      questionStem,
      options: questionType === 'multiple-choice' ? options : undefined,
      tableData: questionType === 'table-completion' ? {
        headers: tableHeaders,
        rows: tableRows,
        blankCells
      } : undefined
    });
    
    // Navigate back to questions list
    navigate('/admin/listening/questions');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading question data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Listening Question</h1>
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
              <Link to="/admin/listening/questions" className="hover:text-teal-600">Questions</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700">Edit Question {id}</li>
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="table-completion">Table Completion</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audio File
            </label>
            <select
              value={audioFile}
              onChange={(e) => setAudioFile(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select Audio File</option>
              <option value="1">Lecture on Climate Change</option>
              <option value="2">Student Advising Conversation</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Stem
            </label>
            <textarea
              value={questionStem}
              onChange={(e) => setQuestionStem(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Enter the question text here..."
            ></textarea>
          </div>

          {questionType === 'multiple-choice' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Answer Options
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="radio"
                    checked={option.isCorrect}
                    onChange={() => handleCorrectOptionChange(index)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="ml-2 flex-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              ))}
            </div>
          )}

          {questionType === 'table-completion' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Table Completion
              </label>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr>
                      {tableHeaders.map((header, index) => (
                        <th key={index} className="border border-gray-200 p-2">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => handleTableHeaderChange(index, e.target.value)}
                            placeholder={`Header ${index + 1}`}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="border border-gray-200 p-2">
                            <div className="flex flex-col">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => handleTableCellChange(rowIndex, colIndex, e.target.value)}
                                placeholder={`Cell (${rowIndex + 1}, ${colIndex + 1})`}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                              />
                              <div className="flex items-center mt-1">
                                <input
                                  type="checkbox"
                                  checked={blankCells[rowIndex][colIndex]}
                                  onChange={() => handleBlankCellToggle(rowIndex, colIndex)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-xs text-gray-500">Blank cell (answer)</span>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addTableRow}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Add Row
                </button>
                <button
                  type="button"
                  onClick={addTableColumn}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
                >
                  Add Column
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Link
              to="/admin/listening/questions"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Update Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListeningQuestion;
