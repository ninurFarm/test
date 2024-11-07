import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Search, Folder, FileText, Image, Code } from 'lucide-react';

interface FileExplorerProps {
  onClose: () => void;
  onMaximize: (maximized: boolean) => void;
}

interface Position {
  x: number;
  y: number;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose, onMaximize }) => {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const files = [
    { name: 'Resume.pdf', type: 'pdf', size: '2.1 MB', modified: '2024-03-15', icon: FileText },
    { name: 'Portfolio.key', type: 'keynote', size: '15.4 MB', modified: '2024-03-14', icon: Image },
    { name: 'Projects', type: 'folder', items: '12 items', modified: '2024-03-13', icon: Folder },
    { name: 'Source Code', type: 'folder', items: '8 items', modified: '2024-03-12', icon: Code },
  ];

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
    if (!newMaximized) {
      setPosition({
        x: (window.innerWidth - (windowRef.current?.offsetWidth || 0)) / 2,
        y: Math.max(40, (window.innerHeight - (windowRef.current?.offsetHeight || 0)) / 4),
      });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      setIsMinimized(false);
    }, 300);
  };

  if (isMinimized) return null;

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
        maxWidth: '1000px',
        height: '80vh',
        transform: 'none',
        transition: isDragging ? 'none' : 'all 0.3s ease-in-out',
      };

  return (
    <div
      ref={windowRef}
      className="fixed bg-[#f6f6f6]/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden window-transition"
      style={windowStyle}
    >
      <div
        className="bg-[#e7e7e7]/95 p-2 flex items-center gap-2 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4b47] transition-colors"
            title="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5b529] transition-colors"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#24b93c] transition-colors"
            title="Zoom"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button 
            className="p-1 hover:bg-black/5 rounded disabled:opacity-50"
            onClick={() => currentPath.length > 1 && setCurrentPath(prev => prev.slice(0, -1))}
            disabled={currentPath.length <= 1}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-black/5 rounded disabled:opacity-50"
            disabled={true}
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="bg-[#ffffff]/70 rounded-md flex items-center gap-2 px-3 py-1">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm flex-1 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#007AFF]/10 text-[#007AFF]' : 'hover:bg-black/5 text-gray-600'}`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#007AFF]/10 text-[#007AFF]' : 'hover:bg-black/5 text-gray-600'}`}
          >
            Grid
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100%-2.5rem)]">
        <div className="w-48 p-2 border-r border-[#e5e5e5] bg-[#f3f3f3]/50">
          <div className="text-sm font-medium text-gray-600 mb-2">Favorites</div>
          <div className="space-y-1">
            {['Desktop', 'Documents', 'Downloads', 'Pictures'].map(item => (
              <button
                key={item}
                className="w-full text-left px-2 py-1 rounded text-sm hover:bg-[#007AFF]/10 hover:text-[#007AFF] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-sm text-gray-500 mb-4">
            {currentPath.join(' / ')}
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-[#007AFF]/10 cursor-pointer group transition-colors"
                >
                  <file.icon className="w-16 h-16 text-[#007AFF] mb-2" />
                  <span className="text-sm text-center group-hover:text-[#007AFF]">{file.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Modified</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.name} className="hover:bg-[#007AFF]/10 cursor-pointer group">
                    <td className="py-2 flex items-center gap-2">
                      <file.icon className="w-4 h-4 text-[#007AFF]" />
                      <span className="group-hover:text-[#007AFF]">{file.name}</span>
                    </td>
                    <td className="py-2 group-hover:text-[#007AFF]">{file.size || file.items}</td>
                    <td className="py-2 group-hover:text-[#007AFF]">{file.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;