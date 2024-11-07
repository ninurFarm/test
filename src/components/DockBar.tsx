import React, { useState } from 'react';
import { Folder, User, Mail, Globe, Github, Linkedin, Settings, Terminal } from 'lucide-react';

interface DockBarProps {
  setActiveWindow: (window: string) => void;
  isMaximized?: boolean;
}

const DockBar: React.FC<DockBarProps> = ({ setActiveWindow, isMaximized }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (isMaximized) {
    return null;
  }

  const dockItems = [
    { id: 'about', icon: User, label: 'About Me', dot: true },
    { id: 'files', icon: Folder, label: 'Files' },
    { id: 'safari', icon: Globe, label: 'Safari', dot: true },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { type: 'separator' },
    { id: 'contact', icon: Mail, label: 'Contact' },
    { id: 'github', icon: Github, label: 'GitHub' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4">
      <div className="flex items-end gap-1 px-2 py-1 rounded-2xl bg-white/20 backdrop-blur-xl shadow-lg">
        {dockItems.map((item, index) => 
          item.type === 'separator' ? (
            <div key={`separator-${index}`} className="w-px h-8 bg-white/20 mx-1" />
          ) : (
            <button
              key={item.id}
              onClick={() => setActiveWindow(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="dock-item relative p-2 rounded-lg group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur transform scale-90 translate-y-1 group-hover:scale-110 transition-all" />
                <item.icon className={`relative w-10 h-10 text-white transition-transform duration-200 ${
                  hoveredItem === item.id ? 'scale-110' : ''
                }`} />
              </div>
              {item.dot && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-xl">
                {item.label}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DockBar;