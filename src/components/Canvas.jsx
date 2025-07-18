import React, { useState, useRef } from 'react';
import BlockRenderer from './BlockRenderer.jsx'; // Added .jsx extension
import saveAs from 'file-saver';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// Canvas Component
const Canvas = ({
  blocks,
  updateBlockContent,
  deleteBlock,
  updateFeatureListItem,
  addFeatureListItem,
  deleteFeatureListItem,
  onDragOver,
  onDrop,
  pageTitle,
  setPageTitle,
  draggingBlockType, // Receive dragging type
  setDraggingBlockType, // Receive setter
  onDropInContainer, // Pass drop handler for containers
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onReorderBlocks, // new prop
}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const titleRef = useRef(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleTitleBlur = () => {
    if (titleRef.current) {
      setPageTitle(titleRef.current.innerText);
    }
    setIsTitleEditing(false);
  };

  // Helper to convert blocks to HTML
  const blocksToHTML = (blocks) => {
    return blocks.map((block) => {
      switch (block.type) {
        case 'title':
          return `<h1>${block.content}</h1>`;
        case 'paragraph':
          return `<p>${block.content}</p>`;
        case 'image':
          return `<img src="${block.content}" alt="Image" style="max-width:100%;"/>`;
        case 'button':
          return `<button style="padding:1em 2em;background:#6366f1;color:#fff;border:none;border-radius:2em;font-size:1.2em;">${block.content}</button>`;
        case 'feature-list':
          return `<ul>${(block.items||[]).map(item => `<li>${item.text}</li>`).join('')}</ul>`;
        case 'container':
          return `<div style="padding:1em;border:2px solid #6366f1;border-radius:1em;margin:1em 0;">${blocksToHTML(block.content.childBlocks||[])}</div>`;
        default:
          return '';
      }
    }).join('');
  };

  // Download handler
  const handleDownload = () => {
    const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>${pageTitle}</title></head><body style='font-family:sans-serif;background:#f8fafc;padding:2em;'>${blocksToHTML(blocks)}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    saveAs(blob, 'landing-page.html');
  };

  // dnd-kit drag end handler
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((b) => String(b.id) === String(active.id));
      const newIndex = blocks.findIndex((b) => String(b.id) === String(over.id));
      onReorderBlocks(oldIndex, newIndex);
    }
  };

  return (
    <div
      className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col items-center bg-white" // Changed bg-gray-100 to bg-white
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Toolbar with Download, Undo, Redo */}
      <div className="w-full flex justify-end mb-4 gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-4 py-2 rounded-lg shadow font-semibold text-lg transition bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`px-4 py-2 rounded-lg shadow font-semibold text-lg transition bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Redo
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold text-lg transition"
        >
          Download HTML
        </button>
      </div>
      <div className="w-full max-w-4xl p-6 md:p-10 shadow-2xl rounded-xl border border-gray-200"> {/* Removed bg-white and min-h */}
        <h1
          className={`text-5xl font-extrabold text-center text-gray-900 mb-10 leading-tight cursor-pointer
            ${isTitleEditing ? 'outline-none ring-2 ring-blue-400 rounded-md' : ''}`}
          contentEditable={isTitleEditing}
          onBlur={handleTitleBlur}
          onClick={() => setIsTitleEditing(true)}
          dangerouslySetInnerHTML={{ __html: pageTitle }}
          ref={titleRef}
          suppressContentEditableWarning={true}
        >
        </h1>
        {blocks.length === 0 && (
          <p className="text-center text-gray-500 text-xl mt-12 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            Drag and drop blocks from the sidebar to start building your page!
          </p>
        )}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map(b => String(b.id))} strategy={verticalListSortingStrategy}>
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                updateBlockContent={updateBlockContent}
                deleteBlock={deleteBlock}
                updateFeatureListItem={updateFeatureListItem}
                addFeatureListItem={addFeatureListItem}
                deleteFeatureListItem={deleteFeatureListItem}
                draggingBlockType={draggingBlockType} // Pass to BlockRenderer
                setDraggingBlockType={setDraggingBlockType} // Pass to BlockRenderer
                onDropInContainer={onDropInContainer} // Pass drop handler down
                sortableId={String(block.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Canvas;
