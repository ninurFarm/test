import React from 'react';
import { Folder, User, Mail, Globe } from 'lucide-react';
import AboutWidget from './AboutWidget';

interface DesktopProps {
  activeWindow: string | null;
  setActiveWindow: (window: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ activeWindow, setActiveWindow }) => {
  const desktopItems = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'projects', icon: Globe, label: 'Projects' },
    { id: 'files', icon: Folder, label: 'Files' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="pt-12 p-4 grid grid-cols-[repeat(auto-fill,96px)] gap-6 h-full relative">
      {desktopItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveWindow(item.id)}
          className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md transform scale-90 translate-y-1 group-hover:bg-white/10 transition-all" />
            <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-sm group-hover:scale-105 group-hover:bg-white/20 transition-all duration-200">
              <item.icon className="w-10 h-10 text-white" />
            </div>
          </div>
          <span className="text-white text-sm font-medium px-2 py-0.5 rounded text-center max-w-[90px] break-words leading-tight desktop-icon-text">
            {item.label}
          </span>
        </button>
      ))}

      {/* About Widget positioned in the center-right */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-10">
        <AboutWidget />
      </div>
    </div>
  );
}

export default Desktop;