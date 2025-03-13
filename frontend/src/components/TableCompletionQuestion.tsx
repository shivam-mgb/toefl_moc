import React from 'react';

interface TableCompletionQuestionProps {
    questionText: string;
    columnHeaders: string[];
    rowHeaders: string[];
    answers: Record<number, Record<number, boolean>> | any[] | undefined;
    onAnswerChange: (rowIndex: number, colIndex: number, value: boolean) => void;
}

const TableCompletionQuestion: React.FC<TableCompletionQuestionProps> = ({
    questionText,
    columnHeaders: initialColumnHeaders,
    rowHeaders: initialRowHeaders,
    answers = {}, // Default to empty object if undefined
    onAnswerChange,
}) => {
    const columnHeaders = initialColumnHeaders.slice(0, 3);
    const rowHeaders = initialRowHeaders.slice(0, 3);

    // Helper function to safely check if a checkbox is checked
    const isChecked = (rowIndex: number, colIndex: number): boolean => {
        if (!answers) return false;
        
        if (Array.isArray(answers)) {
            return answers[rowIndex] && answers[rowIndex][colIndex] === true;
        }
        
        return Boolean(answers[rowIndex]?.[colIndex]);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{questionText}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            {columnHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowHeaders.map((rowHeader, rowIndex) => (
                            <tr key={rowIndex} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {rowHeader}
                                </td>
                                {columnHeaders.map((_, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={isChecked(rowIndex, colIndex)}
                                            onChange={(e) => onAnswerChange(rowIndex, colIndex, e.target.checked)}
                                            className="form-checkbox h-5 w-5 text-teal-600"
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

export default TableCompletionQuestion;