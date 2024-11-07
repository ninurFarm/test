import React, { useState } from 'react';
import { Apple, Wifi, Battery, Volume2, Search, Sun, Moon } from 'lucide-react';

interface TopBarProps {
  currentTime: Date;
  isDark: boolean;
  onThemeToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ currentTime, isDark, onThemeToggle }) => {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  const appleMenuItems = [
    'About This Mac',
    'System Settings...',
    '-',
    'Sleep',
    'Restart...',
    'Shut Down...',
    '-',
    'Lock Screen',
  ];

  return (
    <>
      <div className="h-7 bg-black/20 backdrop-blur-xl text-white px-2 flex items-center justify-between fixed top-0 w-full z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="hover:bg-white/20 px-2 py-0.5 rounded"
          >
            <Apple className="w-4 h-4" />
          </button>
          <span className="font-semibold">Portfolio</span>
          <span className="text-sm">File</span>
          <span className="text-sm">Edit</span>
          <span className="text-sm">View</span>
          <span className="text-sm">Window</span>
          <span className="text-sm">Help</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setShowSpotlight(true)}
            className="hover:bg-white/20 px-2 py-0.5 rounded flex items-center gap-1"
          >
            <Search className="w-3 h-3" />
          </button>
          <button
            onClick={onThemeToggle}
            className="hover:bg-white/20 px-2 py-0.5 rounded"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {showAppleMenu && (
        <div className="fixed top-7 left-2 w-56 bg-gray-800/90 backdrop-blur-xl rounded-lg shadow-xl z-50 py-1 text-white menu-bar-dropdown">
          {appleMenuItems.map((item, index) => (
            item === '-' ? (
              <hr key={index} className="my-1 border-gray-600" />
            ) : (
              <button
                key={index}
                className="w-full text-left px-4 py-1 hover:bg-blue-500 text-sm"
                onClick={() => setShowAppleMenu(false)}
              >
                {item}
              </button>
            )
          ))}
        </div>
      )}

      {showSpotlight && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50"
          onClick={() => setShowSpotlight(false)}
        >
          <div 
            className="w-[600px] bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-2xl spotlight-search"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Spotlight Search"
                className="bg-transparent w-full outline-none text-white"
              />
            </div>
            <div className="px-4 pb-4 text-sm text-gray-400">
              Type to search for apps, files, and more...
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;