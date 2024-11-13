// src/components/AnnotationPanel.tsx
import React from "react";

interface Annotation {
  term: string;
  index: number;
  type: string;
}

interface AnnotationPanelProps {
  annotations: Annotation[];
  currentAnnotationIndex: number;
  setCurrentAnnotationIndex: (index: number) => void;
}

const AnnotationPanel: React.FC<AnnotationPanelProps> = ({
  annotations,
  currentAnnotationIndex,
  setCurrentAnnotationIndex,
}) => {
  return (
    <div className="w-64 bg-gray-100 p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Annotations</h2>
      <ul className="space-y-2">
        {annotations.map((annotation, index) => (
          <li
            key={index}
            className={`p-2 rounded-lg cursor-pointer ${
              index === currentAnnotationIndex
                ? "bg-blue-200"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setCurrentAnnotationIndex(index)}
          >
            {annotation.term} (Location: {annotation.index})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnotationPanel;
