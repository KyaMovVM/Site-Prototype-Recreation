import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GitBranch, History, Sparkles, Zap, Shield, Globe, Search } from "lucide-react";

interface VersionIndicatorProps {
  language: 'ja' | 'ru' | 'en';
  onVersionHistoryClick: () => void;
  highContrastMode?: boolean;
}

export default function VersionIndicator({ 
  language, 
  onVersionHistoryClick, 
  highContrastMode = false 
}: VersionIndicatorProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const currentVersion = "v0.48";
  const buildDate = "2025-01-12";
  
  const texts = {
    ja: {
      version: 'バージョン',
      currentVersion: '現在のバージョン',
      buildDate: 'ビルド日',
      viewHistory: '履歴を表示',
      latest: '最新',
      updates: '更新内容',
      newFeatures: [
        'LCP 最適化完了',
        'パフォーマンス向上',
        'UML 修正済み',
        'SEO 改善済み',
        'アクセシビリティ強化'
      ]
    },
    ru: {
      version: 'Версия',
      currentVersion: 'Текущая версия',
      buildDate: 'Дата сборки',
      viewHistory: 'Показать историю',
      latest: 'Последняя',
      updates: 'Обновления',
      newFeatures: [
        'LCP оптимизация завершена',
        'Улучшена производительность',
        'Исправлены UML компоненты',
        'Улучшено SEO',
        'Усилена доступность'
      ]
    },
    en: {
      version: 'Version',
      currentVersion: 'Current Version',
      buildDate: 'Build Date',
      viewHistory: 'View History',
      latest: 'Latest',
      updates: 'Updates',
      newFeatures: [
        'LCP optimization completed',
        'Performance improvements',
        'UML components fixed',
        'SEO enhancements',
        'Accessibility improvements'
      ]
    }
  };

  const t = texts[language];

  return (
    <div 
      className="fixed bottom-4 left-4 z-40 max-w-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-500 ${
        isHovered ? 'scale-105' : 'scale-100'
      } ${
        highContrastMode
          ? 'border-4 border-white bg-black/95 text-white'
          : 'border-cyber-purple/30 bg-cyber-dark-secondary/95 shadow-cyber-purple/20'
      }`}>
        <CardContent className={`transition-all duration-500 ${
          isHovered ? 'p-4 space-y-3' : 'p-3 space-y-2'
        }`}>
          
          {/* Compact Mode */}
          {!isHovered && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GitBranch className={`w-4 h-4 ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`} />
                <Badge className={`font-mono text-xs ${
                  highContrastMode 
                    ? 'bg-white text-black' 
                    : 'bg-cyber-purple text-white'
                }`}>
                  {currentVersion}
                </Badge>
              </div>
              <Badge 
                variant="outline"
                className={`text-xs flex items-center space-x-1 ${
                  highContrastMode
                    ? 'border-white text-white'
                    : 'border-cyber-neon-green text-cyber-neon-green'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>{t.latest}</span>
              </Badge>
            </div>
          )}

          {/* Full Mode */}
          {isHovered && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitBranch className={`w-5 h-5 ${
                    highContrastMode ? 'text-white' : 'text-cyber-purple'
                  }`} />
                  <h3 className={`font-bold ${
                    highContrastMode ? 'text-white' : 'text-cyber-purple'
                  }`}>
                    {t.version}
                  </h3>
                </div>
                <Badge className={`font-mono ${
                  highContrastMode 
                    ? 'bg-white text-black' 
                    : 'bg-cyber-purple text-white'
                }`}>
                  {currentVersion}
                </Badge>
              </div>

              {/* Version Info */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
                  }`}>
                    {t.buildDate}:
                  </span>
                  <span className={`text-sm font-mono ${
                    highContrastMode ? 'text-white' : 'text-cyber-purple'
                  }`}>
                    {buildDate}
                  </span>
                </div>
                
                <Badge 
                  variant="outline"
                  className={`text-xs flex items-center space-x-1 ${
                    highContrastMode
                      ? 'border-white text-white'
                      : 'border-cyber-neon-green text-cyber-neon-green'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>{t.latest}</span>
                </Badge>
              </div>

              {/* New Features */}
              <div className="space-y-2">
                <h4 className={`text-sm font-medium flex items-center space-x-1 ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>{t.updates}:</span>
                </h4>
                <ul className="space-y-1">
                  {t.newFeatures.map((feature, index) => (
                    <li 
                      key={index}
                      className={`text-xs flex items-start space-x-2 ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
                      }`}
                    >
                      <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                        highContrastMode ? 'bg-white' : 'bg-cyber-purple'
                      }`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* History Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={onVersionHistoryClick}
                className={`w-full text-xs font-medium transition-all duration-300 ${
                  highContrastMode
                    ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                    : 'border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10'
                }`}
              >
                <History className="w-3 h-3 mr-1" />
                {t.viewHistory}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}