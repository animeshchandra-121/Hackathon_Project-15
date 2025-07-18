import React from 'react';

// Sidebar Component
const Sidebar = ({ onAddBlock, onDragStart }) => {
  const blockTypes = [
    { type: 'title', label: 'Title/Header' },
    { type: 'paragraph', label: 'Paragraph/Text' },
    { type: 'image', label: 'Image' },
    { type: 'button', label: 'Button' },
    { type: 'feature-list', label: 'Feature List' },
    { type: 'container', label: 'Container (Drop elements inside)' }, // New Container Block
  ];

  return (
    <div className="w-full md:w-64 bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-2xl flex flex-col items-center space-y-4 overflow-y-auto md:rounded-r-lg rounded-b-lg md:rounded-bl-none backdrop-blur-md bg-opacity-80 border-r border-blue-200">
      <h2 className="text-3xl font-extrabold text-white mb-6 mt-2 drop-shadow-lg">Components</h2>
      {blockTypes.map((block) => (
        <div
          key={block.type}
          className="w-full p-3 bg-white/30 text-white rounded-xl shadow-md cursor-grab hover:bg-white/50 transition-all duration-300 ease-in-out transform hover:scale-105 text-center text-base font-semibold border border-white border-opacity-30 flex items-center justify-center gap-2"
          onClick={() => {
            let initialContent = '';
            if (block.type === 'title') initialContent = 'New Title';
            if (block.type === 'paragraph') initialContent = 'New paragraph text.';
            if (block.type === 'image') initialContent = 'https://placehold.co/400x200/cccccc/000000?text=Image';
            if (block.type === 'button') initialContent = 'Click Me';
            onAddBlock(block.type, initialContent);
          }}
          draggable
          onDragStart={() => onDragStart(block.type)}
          style={{ userSelect: 'none' }}
        >
          <span className="text-white">{block.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
