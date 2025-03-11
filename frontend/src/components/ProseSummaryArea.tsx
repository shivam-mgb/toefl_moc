import React, { useState } from 'react';
import { ProseSummaryQuestion } from '../types/types';

interface SummaryOption {
  id: string;
  text: string;
}

interface ProseSummaryAreaProps {
  question: ProseSummaryQuestion;
  onAnswerSelect: (answer: string[]) => void;
}

const ProseSummaryArea: React.FC<ProseSummaryAreaProps> = ({ question, onAnswerSelect }) => {
  // Map string options to SummaryOption[] with generated IDs
  const initialOptions: SummaryOption[] = question.options.map((text, index) => ({
    id: String(index),
    text,
  }));

  const [dropZones, setDropZones] = useState<(SummaryOption | null)[]>([null, null, null]);
  const [availableOptions, setAvailableOptions] = useState<SummaryOption[]>(initialOptions);

  // Handle dragging an option
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, option: SummaryOption) => {
    e.dataTransfer.setData('optionId', option.id);
  };

  // Allow dropping by preventing default behavior
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Unified handler for drop and remove actions
  const updateDropZones = (
    action: 'drop' | 'remove',
    dropIndex: number,
    optionId?: string
  ) => {
    if (action === 'drop' && optionId) {
      if (dropZones[dropIndex] !== null) return; // Drop zone already occupied
      const option = availableOptions.find((opt) => opt.id === optionId);
      if (!option) return;

      // Compute new states
      const newAvailableOptions = availableOptions.filter((opt) => opt.id !== optionId);
      const newDropZones = [...dropZones];
      newDropZones[dropIndex] = option;

      // Apply state updates
      setAvailableOptions(newAvailableOptions);
      setDropZones(newDropZones);

      // Notify parent after state updates
      const answers = newDropZones.filter((zone) => zone !== null).map((zone) => zone!.id);
      queueMicrotask(() => onAnswerSelect(answers)); // Defer to avoid render conflict
    } else if (action === 'remove') {
      const option = dropZones[dropIndex];
      if (!option) return;

      // Compute new states
      const newDropZones = [...dropZones];
      newDropZones[dropIndex] = null;
      const newAvailableOptions = [...availableOptions, option];

      // Apply state updates
      setDropZones(newDropZones);
      setAvailableOptions(newAvailableOptions);

      // Notify parent after state updates
      const answers = newDropZones.filter((zone) => zone !== null).map((zone) => zone!.id);
      queueMicrotask(() => onAnswerSelect(answers)); // Defer to avoid render conflict
    }
  };

  // Handle dropping an option into a drop zone
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const optionId = e.dataTransfer.getData('optionId');
    updateDropZones('drop', dropIndex, optionId);
  };

  // Remove an option from a drop zone
  const handleRemoveFromDropZone = (dropIndex: number) => {
    updateDropZones('remove', dropIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.prompt}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Available Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Choices</h3>
          {availableOptions.map((option) => (
            <div
              key={option.id}
              draggable
              onDragStart={(e) => handleDragStart(e, option)}
              className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm cursor-move hover:border-teal-200 transition-colors duration-200 active:cursor-grabbing"
            >
              <p className="text-gray-600">{option.text}</p>
            </div>
          ))}
        </div>

        {/* Drop Zones */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Summary Order</h3>
          {dropZones.map((droppedOption, index) => (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`min-h-20 border-2 ${
                droppedOption ? 'border-solid border-teal-500' : 'border-dashed border-gray-300'
              } rounded-lg flex items-center justify-center bg-gray-50 transition-colors duration-200`}
            >
              {droppedOption ? (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, droppedOption)}
                  className="w-full p-4 cursor-move bg-white rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{droppedOption.text}</p>
                    <button
                      onClick={() => handleRemoveFromDropZone(index)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Drop your answer here</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProseSummaryArea;