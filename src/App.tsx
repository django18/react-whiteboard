import React from "react";
import "./App.css";
import Controls from "./components/Controls";
import Whiteboard from "./components/Whiteboard";
import useWhiteboard from "./hooks/useWhiteboard";

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
      color: "#FFF176",
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
  const {
    content,
    isAnimating,
    handleWrite,
    handleAppend,
    handleAnnotate,
    contentRef,
    endOfContainerRef,
    currentAnnotationIndex,
  } = useWhiteboard(mockServer);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-100">
      <div className="w-full py-6 bg-white shadow-sm flex-shrink-0">
        <Controls
          handleWrite={handleWrite}
          handleAppend={handleAppend}
          handleAnnotate={handleAnnotate}
          isAnimating={isAnimating}
          currentAnnotationIndex={currentAnnotationIndex}
          totalAnnotations={mockServer.annotations.length}
        />
      </div>
      <div className="flex-1 p-6 overflow-auto relative">
        <div className="p-8">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {content ? (
              <Whiteboard contentRef={contentRef} />
            ) : (
              <div className="text-center text-gray-500 italic">
                Click on any of the above commands to see the whiteboard in
                action!
              </div>
            )}
            <div ref={endOfContainerRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
