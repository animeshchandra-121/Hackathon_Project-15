import React from 'react';
import EditableBlock from './EditableBlock.jsx';

// Paragraph Block Component
const ParagraphBlock = ({ block, updateBlockContent, deleteBlock, parentBlockId }) => {
  return (
    <EditableBlock block={block} deleteBlock={deleteBlock} parentBlockId={parentBlockId}>
      {(isEditing, contentRef) => (
        <p
          className={`w-full h-full flex items-center justify-center text-lg md:text-xl text-gray-700 leading-relaxed text-center
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

export default ParagraphBlock;
