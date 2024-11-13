import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa"; // Import the settings icon
import { RiSketching } from "react-icons/ri";
import { TbScribble } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";

interface ControlsProps {
  handleWrite: () => void;
  handleAppend: () => void;
  handleAnnotate: (color: string, type: string) => void;
  isAnimating: boolean;
  currentAnnotationIndex: number;
  totalAnnotations: number;
  typingSpeed: number;
  setTypingSpeed: (speed: number) => void;
  toggleDrawer: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  handleWrite,
  handleAppend,
  handleAnnotate,
  isAnimating,
  currentAnnotationIndex,
  totalAnnotations,
  toggleDrawer,
}) => {
  const [selectedColor] = useState<string>("#FFF176");
  const [selectedType] = useState<string>("highlight");

  const handleAnnotation = () => {
    handleAnnotate(selectedColor, selectedType);
  };

  return (
    <div className="w-full mx-auto flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg font-medium text-sm ${
            isAnimating
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors duration-200 shadow-md flex gap-2 place-items-center`}
          onClick={handleWrite}
          disabled={isAnimating}
        >
          WRITE
          <span>
            <TbScribble />
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-8 py-2 rounded-lg font-medium text-sm ${
            isAnimating
              ? "bg-gray-300 text-gray-500"
              : "bg-green-600 text-white hover:bg-green-700"
          } transition-colors duration-200 shadow-md flex gap-2 place-items-center`}
          onClick={handleAppend}
          disabled={isAnimating}
        >
          APPEND
          <span>
            <FiPlus />
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-lg font-medium text-sm ${
            isAnimating
              ? "bg-gray-300 text-gray-500"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } transition-colors duration-200 shadow-md flex gap-2 place-items-center`}
          onClick={handleAnnotation}
          disabled={isAnimating}
        >
          ANNOTATE ({currentAnnotationIndex}/{totalAnnotations})
          <span>
            <RiSketching />
          </span>
        </motion.button>
      </div>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center px-6 py-2 rounded-lg text-sm ${
            isAnimating
              ? "bg-gray-300 text-gray-500"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } transition-colors duration-200 shadow-md`}
          disabled={isAnimating}
          onClick={toggleDrawer}
        >
          Downlaod as PDF
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center px-6 py-2 rounded-lg text-sm ${
            isAnimating
              ? "bg-gray-300 text-gray-500"
              : "bg-purple-600 text-white hover:bg-purple-700"
          } transition-colors duration-200 shadow-md`}
          disabled={isAnimating}
          onClick={toggleDrawer}
        >
          <FaCog className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default Controls;
