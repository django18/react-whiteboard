import React from "react";
import { motion } from "framer-motion";

interface ControlsProps {
  handleWrite: () => void;
  handleAppend: () => void;
  handleAnnotate: () => void;
  isAnimating: boolean;
  currentAnnotationIndex: number;
  totalAnnotations: number;
}

const Controls: React.FC<ControlsProps> = ({
  handleWrite,
  handleAppend,
  handleAnnotate,
  isAnimating,
  currentAnnotationIndex,
  totalAnnotations,
}) => {
  return (
    <div className="max-w-3xl mx-auto flex justify-center gap-4 px-4 mb-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          px-8 py-3 rounded-lg font-medium text-sm
          ${
            isAnimating
              ? "bg-slate-100 text-slate-400"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
          transition-colors duration-200 shadow-sm
        `}
        onClick={handleWrite}
        disabled={isAnimating}
      >
        WRITE
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          px-8 py-3 rounded-lg font-medium text-sm
          ${
            isAnimating
              ? "bg-slate-100 text-slate-400"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }
          transition-colors duration-200 shadow-sm
        `}
        onClick={handleAppend}
        disabled={isAnimating}
      >
        APPEND
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          px-8 py-3 rounded-lg font-medium text-sm
          ${
            isAnimating
              ? "bg-slate-100 text-slate-400"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }
          transition-colors duration-200 shadow-sm
        `}
        onClick={handleAnnotate}
        disabled={isAnimating}
      >
        ANNOTATE ({currentAnnotationIndex}/{totalAnnotations})
      </motion.button>
    </div>
  );
};

export default Controls;
