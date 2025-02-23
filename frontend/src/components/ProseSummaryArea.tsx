import React, { useState } from 'react';

interface SummaryOption {
  id: string;
  text: string;
}

interface ProseSummaryAreaProps {
  questionText: string;
  options: SummaryOption[];
}

const ProseSummaryArea: React.FC<ProseSummaryAreaProps> = ({
  questionText,
  options
}) => {
  // State to track which option is in which drop zone
  const [dropZones, setDropZones] = useState<(SummaryOption | null)[]>([null, null, null]);
  const [availableOptions, setAvailableOptions] = useState<SummaryOption[]>(options);

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, option: SummaryOption) => {
    e.dataTransfer.setData('optionId', option.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    // Only allow drops in empty slots
    if (dropZones[dropIndex] !== null) {
      return;
    }

    const optionId = e.dataTransfer.getData('optionId');
    const option = availableOptions.find(opt => opt.id === optionId);
    
    if (option) {
      setAvailableOptions(prev => prev.filter(opt => opt.id !== optionId));
      setDropZones(prev => {
        const newZones = [...prev];
        newZones[dropIndex] = option;
        return newZones;
      });
    }
  };

  const handleDragFromDropZone = (e: React.DragEvent, option: SummaryOption, dropIndex: number) => {
    e.dataTransfer.setData('optionId', option.id);
    e.dataTransfer.setData('fromDropZone', dropIndex.toString());
  };

  const handleRemoveFromDropZone = (dropIndex: number) => {
    const option = dropZones[dropIndex];
    if (option) {
      setDropZones(prev => {
        const newZones = [...prev];
        newZones[dropIndex] = null;
        return newZones;
      });
      setAvailableOptions(prev => [...prev, option]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Question Text */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Prose Summary
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {questionText}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Draggable Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Available Choices
          </h3>
          {availableOptions.map((option) => (
            <div
              key={option.id}
              draggable
              onDragStart={(e) => handleDragStart(e, option)}
              className="bg-white p-4 rounded-lg border-2 border-gray-200
                       shadow-sm cursor-move
                       hover:border-teal-200 transition-colors duration-200
                       active:cursor-grabbing"
            >
              <p className="text-gray-600">{option.text}</p>
            </div>
          ))}
        </div>

        {/* Drop Zones */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Summary Order
          </h3>
          {dropZones.map((droppedOption, index) => (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`min-h-20 border-2 ${droppedOption ? 'border-solid border-teal-500' : 'border-dashed border-gray-300'} 
                       rounded-lg flex items-center justify-center
                       bg-gray-50 transition-colors duration-200`}
            >
              {droppedOption ? (
                <div
                  draggable
                  onDragStart={(e) => handleDragFromDropZone(e, droppedOption, index)}
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