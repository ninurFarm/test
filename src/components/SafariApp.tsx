import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCw, Globe } from 'lucide-react';

interface SafariAppProps {
  onClose: () => void;
  onMaximize: (maximized: boolean) => void;
}

interface Position {
  x: number;
  y: number;
}

const SafariApp: React.FC<SafariAppProps> = ({ onClose, onMaximize }) => {
  const [url, setUrl] = useState('https://example.com');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    setPosition({
      x: (window.innerWidth - rect.width) / 2,
      y: Math.max(40, (window.innerHeight - rect.height) / 4),
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized || e.target !== e.currentTarget) return;
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMaximize = () => {
    const newMaximized = !isMaximized;
    setIsMaximized(newMaximized);
    onMaximize(newMaximized);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHistory([...history.slice(0, historyIndex + 1), url]);
    setHistoryIndex(historyIndex + 1);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const windowStyle = isMaximized
    ? {
        top: 28,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 28px)',
        transform: 'none',
        transition: 'all 0.3s ease-in-out',
      }
    : {
        top: position.y,
        left: position.x,
        width: '90%',
        maxWidth: '1200px',
        height: '80vh',
        transform: 'none',
        transition: isDragging ? 'none' : 'all 0.3s ease-in-out',
      };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden window-transition"
      style={windowStyle}
    >
      <div
        className="bg-gray-100 dark:bg-gray-900 p-2 flex items-center gap-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4b47] transition-colors"
            title="Close"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#24b93c] transition-colors"
            title="Zoom"
          />
        </div>

        <div className="flex items-center gap-2 ml-4 flex-1">
          <button
            onClick={handleBack}
            disabled={historyIndex <= 0}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
          >
            <RotateCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <form onSubmit={handleUrlSubmit} className="flex-1">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-1">
              <Globe className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
                placeholder="Enter URL"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full h-[calc(100%-2.5rem)] bg-white dark:bg-gray-800">
        <iframe
          src={url}
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts"
          title="Safari Browser"
        />
      </div>
    </div>
  );
};

export default SafariApp;