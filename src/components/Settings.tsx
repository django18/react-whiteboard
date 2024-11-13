import React from "react";

interface SettingsProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  typingSpeed: number;
  setTypingSpeed: (speed: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
  isDrawerOpen,
  toggleDrawer,
  typingSpeed,
  setTypingSpeed,
}) => {
  return (
    <>
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 shadow-lg">
          <h5 className="mb-4 text-base font-semibold text-gray-500">
            Settings
          </h5>
          <button
            type="button"
            onClick={toggleDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2 right-2 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="flex items-center justify-between mt-4">
            <label className="text-sm">Markup Speed ({typingSpeed} ms)</label>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={typingSpeed}
            onChange={(e) => setTypingSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </>
  );
};

export default Settings;
