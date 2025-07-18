import React from 'react';
import EditableBlock from './EditableBlock.jsx';

// Button Block Component
const ButtonBlock = ({ block, updateBlockContent, deleteBlock, parentBlockId }) => {
  return (
    <EditableBlock block={block} deleteBlock={deleteBlock} parentBlockId={parentBlockId}>
      {(isEditing, contentRef) => (
        <div className="flex justify-center w-full h-full items-center">
          <button
            className={`w-full h-full px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300
              ${isEditing ? 'ring-2 ring-blue-400' : ''}`}
            contentEditable={isEditing}
            onBlur={(e) => updateBlockContent(block.id, e.target.innerText, null, parentBlockId)}
            dangerouslySetInnerHTML={{ __html: block.content }}
            ref={contentRef}
            suppressContentEditableWarning={true}
            style={{ minHeight: 0 }}
          />
        </div>
      )}
    </EditableBlock>
  );
};

export default ButtonBlock;
