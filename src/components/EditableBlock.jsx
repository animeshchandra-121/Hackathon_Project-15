import React, { useState, useRef } from 'react';

// Editable Block Wrapper Component
const EditableBlock = ({ children, block, deleteBlock, parentBlockId = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef(null);

  // Handle blur to save content
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`relative group p-5 my-6 border-2 rounded-2xl transition-all duration-300 ease-in-out bg-white/95 shadow-lg hover:shadow-2xl hover:border-blue-400 cursor-move
        ${isEditing ? 'border-blue-500 ring-2 ring-blue-300 shadow-2xl' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={() => setIsEditing(true)}
      style={{ boxShadow: isEditing ? '0 8px 32px 0 rgba(0, 80, 255, 0.15)' : undefined }}
    >
      {/* Drag handle indicator */}
      <div className="absolute left-2 top-2 w-6 h-6 flex items-center justify-center opacity-60 group-hover:opacity-100">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-300"><circle cx="9" cy="9" r="7" /><path d="M9 5v4l2 2" /></svg>
      </div>
      {children(isEditing, contentRef)}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteBlock(block.id, parentBlockId);
        }}
        className="absolute -top-3 -right-3 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform hover:scale-110 shadow-md z-10"
        title="Delete Block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditableBlock;
