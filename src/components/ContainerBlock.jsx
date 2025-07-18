import React from 'react';
import BlockRenderer from './BlockRenderer.jsx';

const ContainerBlock = ({ block, updateBlockContent, deleteBlock, updateFeatureListItem, addFeatureListItem, deleteFeatureListItem, draggingBlockType, setDraggingBlockType, parentBlockId, onDropInContainer }) => {
  const childBlocks = block.content?.childBlocks || [];

  // Allow drop inside container
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDropInContainer) {
      onDropInContainer(block.id);
    }
  };

  return (
    <div
      className="relative group my-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-blue-300 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute top-2 right-2 text-xs text-blue-500 font-semibold bg-white bg-opacity-80 px-2 py-1 rounded shadow-sm">Container</div>
      {childBlocks.length === 0 && (
        <div className="text-gray-400 italic text-center py-8">Drag blocks here to add content</div>
      )}
      <div className="space-y-4">
        {childBlocks.map((childBlock) => (
          <BlockRenderer
            key={childBlock.id}
            block={childBlock}
            updateBlockContent={updateBlockContent}
            deleteBlock={deleteBlock}
            updateFeatureListItem={updateFeatureListItem}
            addFeatureListItem={addFeatureListItem}
            deleteFeatureListItem={deleteFeatureListItem}
            draggingBlockType={draggingBlockType}
            setDraggingBlockType={setDraggingBlockType}
            parentBlockId={block.id}
            onDropInContainer={onDropInContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default ContainerBlock; 