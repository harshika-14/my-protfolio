import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, Palette } from 'lucide-react';
import { cn } from '../lib/utils';

const COLORS = [
  { name: 'Purple', color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.5)' },
  { name: 'Blue', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.5)' },
  { name: 'Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.5)' },
  { name: 'Pink', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.5)' },
  { name: 'Amber', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
];

export const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', activeColor.color);
    document.documentElement.style.setProperty('--accent-glow', activeColor.glow);
  }, [activeColor]);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 280 : 48, height: isOpen ? 80 : 48 }}
        className="glass-morphism rounded-full flex items-center overflow-hidden"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center shrink-0 hover:text-accent transition-colors"
        >
          <Palette className={cn("w-5 h-5", isOpen && "text-accent")} />
        </button>

        <div className="flex items-center gap-3 px-4">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setActiveColor(color)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
                activeColor.name === color.name ? "border-white scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
