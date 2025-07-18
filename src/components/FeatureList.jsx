import React from 'react';
import EditableBlock from './EditableBlock.jsx';

// Feature List Block Component
const FeatureListBlock = ({
  block,
  deleteBlock,
  updateFeatureListItem,
  addFeatureListItem,
  deleteFeatureListItem,
  parentBlockId,
}) => {
  return (
    <EditableBlock block={block} deleteBlock={deleteBlock} parentBlockId={parentBlockId}>
      {() => (
        <div className="flex flex-col items-center">
          <ul className="list-none p-0 w-full">
            {block.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 my-3 rounded-lg shadow-md border border-gray-100 group hover:border-green-300 transition-all duration-200"
              >
                <span className="mr-3 text-green-600 text-2xl">✔</span>
                <span
                  contentEditable
                  onBlur={(e) =>
                    updateFeatureListItem(block.id, item.id, e.target.innerText, parentBlockId)
                  }
                  dangerouslySetInnerHTML={{ __html: item.text }}
                  suppressContentEditableWarning={true}
                  className="flex-grow text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 rounded-md p-1 -m-1 transition-all duration-200"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFeatureListItem(block.id, item.id, parentBlockId);
                  }}
                  className="ml-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-sm"
                  title="Delete Feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              </li>
            ))}
          </ul>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addFeatureListItem(block.id, parentBlockId);
            }}
            className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Add Feature
          </button>
        </div>
      )}
    </EditableBlock>
  );
};

export default FeatureListBlock;
