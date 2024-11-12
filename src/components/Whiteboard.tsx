import React from "react";

interface WhiteboardProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const Whiteboard: React.FC<WhiteboardProps> = React.forwardRef(
  ({ contentRef }) => {
    return <div ref={contentRef} className="p-10" />;
  }
);

export default Whiteboard;
