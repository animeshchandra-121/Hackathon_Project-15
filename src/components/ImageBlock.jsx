import React, { useState, useRef, useEffect } from 'react';
import EditableBlock from './EditableBlock.jsx';

// Image Block Component
const ImageBlock = ({ block, updateBlockContent, deleteBlock, parentBlockId }) => {
  const [imageUrl, setImageUrl] = useState(block.content);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  useEffect(() => {
    setImageUrl(block.content);
  }, [block.content]);

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUrlBlur = () => {
    updateBlockContent(block.id, imageUrl, null, parentBlockId);
    setIsEditingUrl(false);
  };

  const handleError = (e) => {
    e.target.src = 'https://placehold.co/400x200/ff0000/ffffff?text=Error+Loading+Image';
  };

  return (
    <EditableBlock block={block} deleteBlock={deleteBlock} parentBlockId={parentBlockId}>
      {(isEditing, contentRef) => (
        <div className="flex flex-col items-center p-2 w-full h-full">
          <img
            src={imageUrl}
            alt="Placeholder"
            className="w-full h-full object-contain rounded-lg shadow-xl border border-gray-200"
            onError={handleError}
            style={{ minHeight: 0 }}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditingUrl(true); }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
          >
            {isEditingUrl ? 'Editing URL...' : 'Change Image URL'}
          </button>
          {isEditingUrl && (
            <input
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              className="mt-3 p-2 border border-gray-300 rounded-md w-full max-w-md text-center focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              placeholder="Enter image URL"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUrlBlur();
                }
              }}
            />
          )}
        </div>
      )}
    </EditableBlock>
  );
};

export default ImageBlock;
