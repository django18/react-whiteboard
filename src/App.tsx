import React, { useState } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Whiteboard from "./components/Whiteboard";
import useWhiteboard from "./hooks/useWhiteboard";
import Settings from "./components/Settings";

const mockServer = {
  write: {
    mode: "WRITE",
    text: "# Welcome to AI Whiteboard\nThis is a *smart* whiteboard that supports **markdown** rendering. This whiteboard is amazing!",
  },
  append: [
    {
      mode: "APPEND",
      text: "\n\nThis text was appended to the whiteboard. Another whiteboard reference here.",
    },
    {
      mode: "APPEND",
      text: "\n\n## New Section\nThis is a new section with **bold text** and *italic text*.",
    },
    {
      mode: "APPEND",
      text: "\n\n### Another Subsection\nHere is a list:\n- Item 1\n- Item 2\n- Item 3",
    },
  ],
  annotations: [
    {
      mode: "ANNOTATE",
      pattern: "whiteboard",
      type: "highlight",
    },
    {
      mode: "ANNOTATE",
      pattern: "section",
      type: "underline",
      color: "#FF5252",
      index: 0,
    },
    { mode: "ANNOTATE", pattern: "amazing", type: "box", color: "#4CAF50" },
  ],
};

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const {
    content,
    isAnimating,
    handleWrite,
    handleAppend,
    handleAnnotate,
    contentRef,
    endOfContainerRef,
    currentAnnotationIndex,
    setTypingSpeed,
    typingSpeed,
  } = useWhiteboard(mockServer);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100">
      <div className="w-full py-3 bg-white flex-shrink-0 shadow-lg shadow-gray-300 border-b-2">
        <Controls
          handleWrite={handleWrite}
          handleAppend={handleAppend}
          handleAnnotate={handleAnnotate}
          isAnimating={isAnimating}
          currentAnnotationIndex={currentAnnotationIndex}
          totalAnnotations={mockServer.annotations.length}
          typingSpeed={typingSpeed}
          setTypingSpeed={setTypingSpeed}
          toggleDrawer={toggleDrawer}
        />
      </div>

      <Settings
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        typingSpeed={typingSpeed}
        setTypingSpeed={setTypingSpeed}
      />

      <div className="w-full h-full overflow-auto notebook">
        <div className="h-full mx-auto relative prose prose-lg">
          {content ? (
            <Whiteboard contentRef={contentRef} />
          ) : (
            <div className="p-10 text-center text-gray-500 italic">
              Click on any of the above commands to see the whiteboard in
              action!
            </div>
          )}
          <div ref={endOfContainerRef}></div>
        </div>
      </div>
    </div>
  );
};

export default App;
