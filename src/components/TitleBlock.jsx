import React from 'react';
import EditableBlock from './EditableBlock.jsx';

// Title Block Component
const TitleBlock = ({ block, updateBlockContent, deleteBlock, parentBlockId }) => {
  return (
    <EditableBlock block={block} deleteBlock={deleteBlock} parentBlockId={parentBlockId}>
      {(isEditing, contentRef) => (
        <h2
          className={`w-full h-full flex items-center justify-center text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight
            ${isEditing ? 'outline-none ring-2 ring-blue-400 rounded-md' : ''}`}
          contentEditable={isEditing}
          onBlur={(e) => updateBlockContent(block.id, e.target.innerText, null, parentBlockId)}
          dangerouslySetInnerHTML={{ __html: block.content }}
          ref={contentRef}
          suppressContentEditableWarning={true}
          style={{ minHeight: 0 }}
        />
      )}
    </EditableBlock>
  );
};

export default TitleBlock;
