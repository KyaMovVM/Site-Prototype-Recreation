import { useState } from 'react';
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

interface MobileLanguageToggleProps {
  language: 'ja' | 'ru' | 'en';
  onToggle: () => void;
  highContrastMode?: boolean;
}

export default function MobileLanguageToggle({ language, onToggle, highContrastMode = false }: MobileLanguageToggleProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getLanguageFlag = () => {
    switch (language) {
      case 'ja': return '🇯🇵';
      case 'ru': return '🇷🇺';
      case 'en': return '🇺🇸';
      default: return '🇯🇵';
    }
  };

  const getLanguageCode = () => {
    switch (language) {
      case 'ja': return 'JA';
      case 'ru': return 'RU';
      case 'en': return 'EN';
      default: return 'JA';
    }
  };

  const getTitle = () => {
    switch (language) {
      case 'ja': return "ロシア語に切り替え";
      case 'ru': return "Переключить на английский";
      case 'en': return "Switch to Japanese";
      default: return "ロシア語に切り替え";
    }
  };

  return (
    <div className="lg:hidden fixed top-20 right-4 z-40">
      <Button
        size="sm"
        onClick={() => {
          setIsPressed(true);
          onToggle();
          setTimeout(() => setIsPressed(false), 150);
        }}
        className={`font-bold transition-all duration-300 shadow-lg ${
          isPressed ? 'scale-95' : 'hover:scale-105'
        } ${
          highContrastMode
            ? 'bg-white text-black hover:bg-gray-200 border-2 border-white shadow-xl'
            : 'bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-pink/80 hover:to-cyber-purple/80 text-white border-0'
        }`}
        title={getTitle()}
      >
        <div className="flex items-center space-x-1.5">
          <Languages className="w-3.5 h-3.5" />
          <span className="text-sm font-mono">{getLanguageFlag()}</span>
          <span className="text-xs font-bold">{getLanguageCode()}</span>
        </div>
      </Button>
    </div>
  );
}