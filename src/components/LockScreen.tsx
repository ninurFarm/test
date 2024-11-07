import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  currentTime: Date;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, currentTime }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center backdrop-blur-xl bg-black/20 text-white">
      <div className="text-6xl font-light mb-4">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-xl mb-20">
        {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
      
      <div 
        className={`cursor-pointer transition-all duration-300 ${
          isDragging ? 'scale-95 opacity-80' : ''
        }`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => {
          setIsDragging(false);
          onUnlock();
        }}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => {
          setIsDragging(false);
          onUnlock();
        }}
      >
        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 transition-colors">
          <Lock className="w-5 h-5" />
          <span className="text-sm">Click to unlock</span>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;