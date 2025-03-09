// src/components/TableQuestionInput.tsx
import React, { useState } from 'react';
import { TableQuestion } from '../../types/types';

interface TableQuestionInputProps {
  onChange: (data: Omit<TableQuestion, 'type'>) => void;
}

const TableQuestionInput: React.FC<TableQuestionInputProps> = ({ onChange }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [rows, setRows] = useState<string[]>(['']); // Start with one empty row
  const [columns, setColumns] = useState<string[]>(['']); // Start with one empty column
  const [correctSelections, setCorrectSelections] = useState<{ row: string; column: string }[]>([]);

  // Add a new row
  const addRow = () => {
    setRows([...rows, '']);
  };

  // Update a row value
  const updateRow = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index] = value;
    setRows(newRows);
  };

  // Add a new column
  const addColumn = () => {
    setColumns([...columns, '']);
  };

  // Update a column value
  const updateColumn = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  // Toggle a row-column pair as correct
  const toggleSelection = (row: string, column: string) => {
    setCorrectSelections((prev) => {
      const exists = prev.some((sel) => sel.row === row && sel.column === column);
      if (exists) {
        return prev.filter((sel) => !(sel.row === row && sel.column === column));
      } else {
        return [...prev, { row, column }];
      }
    });
  };

  const handleChange = (prompt: string, rows: string[], columns: string[], correctSelections: { row: string; column: string }[]) => {
    onChange({ 
      prompt,
      rows, 
      columns, 
      correct_selections: correctSelections
    });
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          handleChange(prompt, rows, columns, correctSelections);
        }}
        placeholder="Enter question prompt"
        className="w-full p-2 border rounded-md mb-4"
      />
      <div className="mb-4">
        <p className="font-medium">Rows:</p>
        {rows.map((row, index) => (
          <input
            key={index}
            value={row}
            onChange={(e) => {
              updateRow(index, e.target.value);
              handleChange(prompt, rows, columns, correctSelections);
            }}
            placeholder={`Row ${index + 1}`}
            className="w-full p-2 border rounded-md mb-2"
          />
        ))}
        <button
          onClick={addRow}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Add Row
        </button>
      </div>
      <div className="mb-4">
        <p className="font-medium">Columns:</p>
        {columns.map((column, index) => (
          <input
            key={index}
            value={column}
            onChange={(e) => {
              updateColumn(index, e.target.value);
              handleChange(prompt, rows, columns, correctSelections);
            }}
            placeholder={`Column ${index + 1}`}
            className="w-full p-2 border rounded-md mb-2"
          />
        ))}
        <button
          onClick={addColumn}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Add Column
        </button>
      </div>
      <div>
        <p className="font-medium mb-2">Select correct mappings:</p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {columns.map((column, colIndex) => (
                <th key={colIndex} className="border p-2">
                  {column || `Column ${colIndex + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border p-2">
                  {row || `Row ${rowIndex + 1}`}
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={correctSelections.some(
                        (sel) => sel.row === row && sel.column === column
                      )}
                      onChange={() => {
                        toggleSelection(row, column);
                        handleChange(prompt, rows, columns, correctSelections);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableQuestionInput;