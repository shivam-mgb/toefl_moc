import React, { useState } from 'react';

interface InsertTextQuestionProps {
    questionText: string;
    passageText: string;
    onAnswerSelect: (answer: string) => void;
}

const InsertTextQuestion = ({ questionText, passageText, onAnswerSelect }: InsertTextQuestionProps): React.ReactElement => {
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    // Helper to get the last two sentences of a text block
    const getLastTwoSentences = (text: string): string => {
        const sentences = text.trim().split('. ').filter((s: string) => s.length > 0);
        return sentences.length <= 2 ? text : sentences.slice(-2).join('. ') + '.';
    };

    // Helper to get the first two sentences of a text block
    const getFirstTwoSentences = (text: string): string => {
        const sentences = text.trim().split('. ').filter((s: string) => s.length > 0);
        return sentences.length <= 2 ? text : sentences.slice(0, 2).join('. ') + '.';
    };

    // Process passage into segments and placeholders
    const processPassage = (text: string): { displaySegments: string[]; placeholders: string[] } => {
        const regex = /(\[[a-z]\])/g;
        const parts: string[] = text.split(regex);
        const textSegments: string[] = [];
        const placeholders: string[] = [];

        parts.forEach((part: string, index: number) => {
            if (index % 2 === 0) textSegments.push(part);
            else placeholders.push(part);
        });

        const displaySegments: string[] = [];
        if (textSegments.length > 0) displaySegments.push(getLastTwoSentences(textSegments[0]));
        for (let i = 1; i < textSegments.length - 1; i++) displaySegments.push(textSegments[i]);
        if (textSegments.length > 1) displaySegments.push(getFirstTwoSentences(textSegments[textSegments.length - 1]));

        return { displaySegments, placeholders };
    };

    const { displaySegments, placeholders } = processPassage(passageText);

    // Handle clicking an insertion point (selects but doesn’t submit)
    const handleSquareClick = (label: string): void => {
        setSelectedLabel(label);
        onAnswerSelect(label);
    };

    // Build the render parts
    const renderParts: React.ReactElement[] = [];
    if (displaySegments.length > 0) {
        renderParts.push(React.createElement('span', { key: 'seg0' }, displaySegments[0]));
        for (let i = 0; i < placeholders.length; i++) {
            const label: string = placeholders[i].slice(1, 2); // Extract 'a' from '[a]'
            if (selectedLabel === label) {
                // Replace with questionText when selected
                renderParts.push(
                    React.createElement('span', { key: `inserted${i}`, className: 'inserted-text' }, questionText)
                );
            } else {
                // Render the lime square
                renderParts.push(
                    React.createElement('span', {
                        key: `square${i}`,
                        className: `inline-block w-4 h-4 bg-lime-500 cursor-pointer mx-1 hover:bg-lime-600 ${selectedLabel === label ? 'border-2 border-teal-500' : ''}`,
                        onClick: () => {
                            handleSquareClick(label);
                        },
                    })
                );
            }
            if (i < displaySegments.length - 1) {
                renderParts.push(React.createElement('span', { key: `seg${i + 1}` }, displaySegments[i + 1]));
            }
        }
    }

    // Return the full component with a submit button
    return React.createElement(
        'div',
        { className: 'space-y-6' },
        React.createElement(
            'div',
            { className: 'bg-white rounded-lg shadow-md p-6' },
            React.createElement('h2', { className: 'text-lg font-semibold text-gray-800 mb-4' }, questionText),
            React.createElement('p', { className: 'text-gray-600' }, 'Click a colored square to select the insertion point, then press Submit.')
        ),
        React.createElement(
            'div',
            { className: 'bg-white rounded-lg shadow-md p-6' },
            React.createElement('div', { className: 'prose max-w-none' }, renderParts),
        )
    );
};

export default InsertTextQuestion;