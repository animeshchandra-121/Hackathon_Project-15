import React from 'react';
import TitleBlock from './TitleBlock.jsx';
import ParagraphBlock from './ParagraphBlock.jsx';
import ImageBlock from './ImageBlock.jsx';
import ButtonBlock from './ButtonBlock.jsx';
import FeatureList from './FeatureList.jsx';
import ContainerBlock from './ContainerBlock.jsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Block Renderer Component - determines which block component to render
const BlockRenderer = ({
  block,
  updateBlockContent,
  deleteBlock,
  updateFeatureListItem,
  addFeatureListItem,
  deleteFeatureListItem,
  draggingBlockType,
  setDraggingBlockType,
  parentBlockId = null,
  onDropInContainer,
  sortableId,
}) => {
  // Only make top-level blocks sortable
  const isSortable = !parentBlockId && sortableId;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 100 : undefined,
  };

  // Render a drag handle for reordering (only for top-level blocks)
  const dragHandle = isSortable ? (
    <div {...listeners} {...attributes} style={{ cursor: 'grab', position: 'absolute', top: 8, left: 8, zIndex: 10 }} title="Drag to reorder">
      <svg width="24" height="24" fill="none" stroke="#6366f1" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity="0.15"/><path d="M12 8v4l3 2"/></svg>
    </div>
  ) : null;

  switch (block.type) {
    case 'title':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<TitleBlock block={block} updateBlockContent={updateBlockContent} deleteBlock={deleteBlock} parentBlockId={parentBlockId} /></div>;
    case 'paragraph':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<ParagraphBlock block={block} updateBlockContent={updateBlockContent} deleteBlock={deleteBlock} parentBlockId={parentBlockId} /></div>;
    case 'image':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<ImageBlock block={block} updateBlockContent={updateBlockContent} deleteBlock={deleteBlock} parentBlockId={parentBlockId} /></div>;
    case 'button':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<ButtonBlock block={block} updateBlockContent={updateBlockContent} deleteBlock={deleteBlock} parentBlockId={parentBlockId} /></div>;
    case 'feature-list':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<FeatureList block={block} deleteBlock={deleteBlock} updateFeatureListItem={updateFeatureListItem} addFeatureListItem={addFeatureListItem} deleteFeatureListItem={deleteFeatureListItem} parentBlockId={parentBlockId} /></div>;
    case 'container':
      return <div ref={isSortable ? setNodeRef : undefined} style={style}>{dragHandle}<ContainerBlock block={block} updateBlockContent={updateBlockContent} deleteBlock={deleteBlock} updateFeatureListItem={updateFeatureListItem} addFeatureListItem={addFeatureListItem} deleteFeatureListItem={deleteFeatureListItem} draggingBlockType={draggingBlockType} setDraggingBlockType={setDraggingBlockType} parentBlockId={parentBlockId} onDropInContainer={onDropInContainer} /></div>;
    default:
      return null;
  }
};

export default BlockRenderer;
