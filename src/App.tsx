import React, { useState, useEffect } from 'react';
import { Menu, Folder, Mail, User, Github, Linkedin, Globe, Moon, Sun, Battery, Wifi, Settings } from 'lucide-react';
import Desktop from './components/Desktop';
import LockScreen from './components/LockScreen';
import FileExplorer from './components/FileExplorer';
import TopBar from './components/TopBar';
import DockBar from './components/DockBar';
import SafariApp from './components/SafariApp';

function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleWindowChange = (window: string | null) => {
    setActiveWindow(window);
    setIsMaximized(false);
  };

  const renderActiveWindow = () => {
    switch (activeWindow) {
      case 'files':
        return (
          <FileExplorer 
            onClose={() => handleWindowChange(null)}
            onMaximize={(maximized) => setIsMaximized(maximized)}
          />
        );
      case 'safari':
        return (
          <SafariApp 
            onClose={() => handleWindowChange(null)}
            onMaximize={(maximized) => setIsMaximized(maximized)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')] bg-cover bg-center ${isDark ? 'dark' : ''}`}>
      {isLocked ? (
        <LockScreen onUnlock={handleUnlock} currentTime={currentTime} />
      ) : (
        <div className="h-full w-full backdrop-blur-xl bg-black/5">
          <TopBar 
            currentTime={currentTime} 
            isDark={isDark}
            onThemeToggle={() => setIsDark(!isDark)}
          />
          
          <Desktop
            activeWindow={activeWindow}
            setActiveWindow={handleWindowChange}
          />
          
          {renderActiveWindow()}
          
          <DockBar 
            setActiveWindow={handleWindowChange} 
            isMaximized={isMaximized}
          />
        </div>
      )}
    </div>
  );
}

export default App;