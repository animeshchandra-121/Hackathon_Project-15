import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const SortableItem = ({
  id,
  children,
  onSelect,
  onDelete,
  isSelected,
  onResizeStop,
  onDragStop,
  defaultSize = { width: 'auto', height: 'auto' },
  defaultPosition = { x: 0, y: 0 },
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [size, setSize] = useState(defaultSize);
  const [position, setPosition] = useState(defaultPosition);

  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      width: ref.style.width,
      height: ref.style.height,
    });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const newSize = {
      width: ref.style.width,
      height: ref.style.height,
    };
    setSize(newSize);
    onResizeStop?.(id, newSize);
  };

  const handleDragStop = (e, d) => {
    const newPosition = { x: d.x, y: d.y };
    setPosition(newPosition);
    onDragStop?.(id, newPosition);
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      bounds="parent"
      minWidth={100}
      minHeight={50}
      style={{
        border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb',
        borderRadius: 16,
        background: '#fff',
        boxShadow: isSelected ? '0 8px 32px 0 rgba(37,99,235,0.15)' : '0 2px 8px 0 rgba(0,0,0,0.08)',
        zIndex: isSelected ? 10 : 1,
        padding: 0,
      }}
    >
      <div className="relative w-full h-full flex flex-col">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={toggleExpand}
            className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '-' : '+'}
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
            title="Delete"
          >
            ×
          </button>
        </div>
        <div
          className={`flex-1 p-4 ${isExpanded ? 'text-lg' : ''}`}
          onClick={() => onSelect?.(id)}
          style={{ cursor: 'pointer' }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default SortableItem; 