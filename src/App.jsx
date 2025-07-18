import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'; // Explicitly added .jsx extension
import Canvas from './components/Canvas.jsx';   // Explicitly added .jsx extension
import StartScreen from '../StartScreen.jsx';

// Main App Component
const App = () => {
  // State to hold the blocks on the canvas
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  // State to manage the currently dragged block type from the sidebar
  const [draggingBlockType, setDraggingBlockType] = useState(null);
  // State to hold the main page title
  const [pageTitle, setPageTitle] = useState('Your Awesome Launch Page');
  // State to control whether the initial form or the builder is shown
  const [showBuilder, setShowBuilder] = useState(false);
  const [startScreenChoice, setStartScreenChoice] = useState(null);

  // States for initial form inputs
  const [inputProductName, setInputProductName] = useState('');
  const [inputTagline, setInputTagline] = useState('');
  const [inputFeatures, setInputFeatures] = useState(''); // Comma-separated or newline-separated

  // Helper to update blocks and history
  const setBlocksWithHistory = (newBlocks) => {
    setBlocks(newBlocks);
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      updated.push(newBlocks);
      return updated;
    });
    setHistoryIndex((prev) => prev + 1);
  };

  // Function to add a block to the canvas (top-level)
  const addBlock = (type, initialContent = '') => {
    let newBlock = {
      id: Date.now() + Math.random(), // Unique ID for the block
      type,
      x: 100, // Default position
      y: 100,
      width: 400, // Default size
      height: 100,
    };

    if (type === 'feature-list') {
      newBlock.content = initialContent;
      newBlock.items = [{ id: Date.now() + 0.1, text: 'New Feature 1' }];
    } else if (type === 'container') {
      newBlock.content = { childBlocks: [] }; // Container will hold an array of child blocks
    } else {
      newBlock.content = initialContent;
    }

    setBlocksWithHistory([...blocks, newBlock]);
  };

  // Function to update the content of a block (top-level or nested)
  const updateBlockContent = (id, newContent, field = null, parentBlockId = null) => {
    setBlocksWithHistory(
      blocks.map((block) => {
        if (block.id === parentBlockId && block.type === 'container') {
          // If updating a block inside a container
          return {
            ...block,
            content: {
              ...block.content,
              childBlocks: block.content.childBlocks.map((childBlock) =>
                childBlock.id === id
                  ? { ...childBlock, content: newContent }
                  : childBlock
              ),
            },
          };
        } else if (block.id === id) {
          // If updating a top-level block (including container itself)
          return { ...block, content: newContent };
        }
        return block;
      })
    );
  };

  // Function to delete a block (top-level or nested)
  const deleteBlock = (id, parentBlockId = null) => {
    if (parentBlockId) {
      // Delete a block inside a container
      setBlocksWithHistory(
        blocks.map((block) =>
          block.id === parentBlockId && block.type === 'container'
            ? {
                ...block,
                content: {
                  ...block.content,
                  childBlocks: block.content.childBlocks.filter(
                    (childBlock) => childBlock.id !== id
                  ),
                },
              }
            : block
        )
      );
    } else {
      // Delete a top-level block
      setBlocksWithHistory(blocks.filter((block) => block.id !== id));
    }
  };

  // Function to update a feature list item (top-level or nested)
  const updateFeatureListItem = (blockId, itemId, newText, parentBlockId = null) => {
    setBlocksWithHistory(
      blocks.map((block) => {
        if (block.id === parentBlockId && block.type === 'container') {
          return {
            ...block,
            content: {
              ...block.content,
              childBlocks: block.content.childBlocks.map((childBlock) =>
                childBlock.id === blockId && childBlock.type === 'feature-list'
                  ? {
                      ...childBlock,
                      items: childBlock.items.map((item) =>
                        item.id === itemId ? { ...item, text: newText } : item
                      ),
                    }
                  : childBlock
              ),
            },
          };
        } else if (block.id === blockId && block.type === 'feature-list') {
          return {
            ...block,
            items: block.items.map((item) =>
              item.id === itemId ? { ...item, text: newText } : item
            ),
          };
        }
        return block;
      })
    );
  };

  // Function to add a new feature list item (top-level or nested)
  const addFeatureListItem = (blockId, parentBlockId = null) => {
    setBlocksWithHistory(
      blocks.map((block) => {
        if (block.id === parentBlockId && block.type === 'container') {
          return {
            ...block,
            content: {
              ...block.content,
              childBlocks: block.content.childBlocks.map((childBlock) =>
                childBlock.id === blockId && childBlock.type === 'feature-list'
                  ? {
                      ...childBlock,
                      items: [
                        ...childBlock.items,
                        { id: Date.now() + Math.random(), text: 'New Feature' },
                      ],
                    }
                  : childBlock
              ),
            },
          };
        } else if (block.id === blockId && block.type === 'feature-list') {
          return {
            ...block,
            items: [
              ...block.items,
              { id: Date.now() + Math.random(), text: 'New Feature' },
            ],
          };
        }
        return block;
      })
    );
  };

  // Function to delete a feature list item (top-level or nested)
  const deleteFeatureListItem = (blockId, itemId, parentBlockId = null) => {
    setBlocksWithHistory(
      blocks.map((block) => {
        if (block.id === parentBlockId && block.type === 'container') {
          return {
            ...block,
            content: {
              ...block.content,
              childBlocks: block.content.childBlocks.map((childBlock) =>
                childBlock.id === blockId && childBlock.type === 'feature-list'
                  ? {
                      ...childBlock,
                      items: childBlock.items.filter((item) => item.id !== itemId),
                    }
                  : childBlock
              ),
            },
          };
        } else if (block.id === blockId && block.type === 'feature-list') {
          return {
            ...block,
            items: block.items.filter((item) => item.id !== itemId),
          };
        }
        return block;
      })
    );
  };

  // Add this function inside App component
  const updateBlockPositionAndSize = (id, updates, parentBlockId = null) => {
    setBlocksWithHistory(
      blocks.map((block) => {
        if (block.id === parentBlockId && block.type === 'container') {
          // If updating a block inside a container
          return {
            ...block,
            content: {
              ...block.content,
              childBlocks: block.content.childBlocks.map((childBlock) =>
                childBlock.id === id ? { ...childBlock, ...updates } : childBlock
              ),
            },
          };
        } else if (block.id === id) {
          // If updating a top-level block
          return { ...block, ...updates };
        }
        return block;
      })
    );
  };

  // Handle drag start from sidebar
  const handleDragStart = (type) => {
    setDraggingBlockType(type);
  };

  // Handle drag over on the canvas
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  // Handle drop on the canvas (top-level)
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingBlockType) {
      let initialContent = '';
      if (draggingBlockType === 'title') initialContent = 'New Title';
      if (draggingBlockType === 'paragraph') initialContent = 'New paragraph text.';
      if (draggingBlockType === 'image') initialContent = 'https://placehold.co/400x200/cccccc/000000?text=Image';
      if (draggingBlockType === 'button') initialContent = 'Click Me';
      addBlock(draggingBlockType, initialContent);
      setDraggingBlockType(null); // Reset dragging state
    }
  };

  // Handle form submission for auto-generation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowBuilder(true);
    setPageTitle(inputProductName || 'Your Awesome Launch Page'); // Set main page title from product name

    const generatedBlocks = [];

    // 1. Hero Section (Title + Paragraph)
    if (inputProductName) {
      generatedBlocks.push({
        id: Date.now() + 1,
        type: 'title',
        content: inputProductName,
      });
    }
    if (inputTagline) {
      generatedBlocks.push({
        id: Date.now() + 2,
        type: 'paragraph',
        content: inputTagline,
      });
    }

    // 2. Features Section
    const featuresArray = inputFeatures
      .split(/[\n,]+/) // Split by newline or comma
      .map((feature) => feature.trim())
      .filter((feature) => feature.length > 0);

    if (featuresArray.length > 0) {
      generatedBlocks.push({
        id: Date.now() + 3,
        type: 'feature-list',
        content: 'Key Features', // Default title for auto-generated feature list
        items: featuresArray.map((text, index) => ({
          id: Date.now() + 3.1 + index,
          text: text,
        })),
      });
    }

    // 3. CTA Section
    generatedBlocks.push({
      id: Date.now() + 4,
      type: 'button',
      content: inputProductName ? `Get Started with ${inputProductName}` : 'Get Started',
    });

    setBlocksWithHistory(generatedBlocks);
  };

  // Add this function inside App component
  const onDropInContainer = (containerId) => {
    if (draggingBlockType) {
      let initialContent = '';
      if (draggingBlockType === 'title') initialContent = 'New Title';
      if (draggingBlockType === 'paragraph') initialContent = 'New paragraph text.';
      if (draggingBlockType === 'image') initialContent = 'https://placehold.co/400x200/cccccc/000000?text=Image';
      if (draggingBlockType === 'button') initialContent = 'Click Me';
      const newBlock = {
        id: Date.now() + Math.random(),
        type: draggingBlockType,
        x: 100,
        y: 100,
        width: 400,
        height: 100,
        content: initialContent,
      };
      setBlocksWithHistory(
        blocks.map((block) => {
          if (block.id === containerId && block.type === 'container') {
            return {
              ...block,
              content: {
                ...block.content,
                childBlocks: [...(block.content.childBlocks || []), newBlock],
              },
            };
          }
          return block;
        })
      );
      setDraggingBlockType(null);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  // Add this function inside App component
  const onReorderBlocks = (fromIndex, toIndex) => {
    const updated = Array.from(blocks);
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setBlocksWithHistory(updated);
  };

  // Show StartScreen first
  if (!startScreenChoice) {
    return <StartScreen onSelect={setStartScreenChoice} />;
  }

  // If user chose autogenerate, show the form (existing logic)
  if (startScreenChoice === 'autogenerate' && !showBuilder) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 transform transition-all duration-300 scale-100 hover:scale-105"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Generate Your Landing Page
          </h2>
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g., BugBlitz"
              value={inputProductName}
              onChange={(e) => setInputProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g., Fix bugs 10x faster"
              value={inputTagline}
              onChange={(e) => setInputTagline(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
              Features (one per line or comma-separated)
            </label>
            <textarea
              id="features"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Real-time bug reporting&#10;Slack integration&#10;One-click deploy fixes"
              value={inputFeatures}
              onChange={(e) => setInputFeatures(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Auto-Generate Page
          </button>
        </form>
      </div>
    );
  }

  // If user chose manual or finished autogenerate, show builder
  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar onAddBlock={addBlock} onDragStart={handleDragStart} />
      {/* Canvas */}
      <Canvas
        blocks={blocks}
        updateBlockContent={updateBlockContent}
        deleteBlock={deleteBlock}
        updateFeatureListItem={updateFeatureListItem}
        addFeatureListItem={addFeatureListItem}
        deleteFeatureListItem={deleteFeatureListItem}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
        draggingBlockType={draggingBlockType}
        setDraggingBlockType={setDraggingBlockType}
        updateBlockPositionAndSize={updateBlockPositionAndSize}
        addBlock={addBlock}
        onDropInContainer={onDropInContainer}
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onReorderBlocks={onReorderBlocks}
      />
    </div>
  );
};

export default App;
