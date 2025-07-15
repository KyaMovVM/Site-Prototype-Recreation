// @ts-nocheck
import { useState, useEffect } from 'react';
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Loader2, Zap, Check } from "lucide-react";

interface GlobalLoadingIndicatorProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
  isOptimized?: boolean;
}

export default function GlobalLoadingIndicator({
  language,
  highContrastMode = false,
  isOptimized = false
}: GlobalLoadingIndicatorProps) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('initial');
  const [isVisible, setIsVisible] = useState(true);

  const texts = {
    ja: {
      loading: '読み込み中...',
      optimized: '最適化モード',
      stages: {
        initial: 'スタイルを読み込み中...',
        components: 'コンポーネントを読み込み中...',
        images: '画像を読み込み中...',
        complete: '完了！'
      }
    },
    ru: {
      loading: 'Загрузка...',
      optimized: 'Режим оптимизации',
      stages: {
        initial: 'Загрузка стилей...',
        components: 'Загрузка компонентов...',
        images: 'Загрузка изображений...',
        complete: 'Завершено!'
      }
    },
    en: {
      loading: 'Loading...',
      optimized: 'Optimization Mode',
      stages: {
        initial: 'Loading styles...',
        components: 'Loading components...',
        images: 'Loading images...',
        complete: 'Complete!'
      }
    }
  };

  const t = texts[language];

  useEffect(() => {
    const stages = [
      { name: 'initial', duration: isOptimized ? 500 : 1000 },
      { name: 'components', duration: isOptimized ? 800 : 1500 },
      { name: 'images', duration: isOptimized ? 600 : 1200 },
      { name: 'complete', duration: 300 }
    ];

    let currentProgress = 0;
    let stageIndex = 0;

    const updateProgress = () => {
      const stage = stages[stageIndex];
      const increment = 25; // Each stage is 25% of progress
      const stepSize = increment / (stage.duration / 50); // Update every 50ms

      const progressInterval = setInterval(() => {
        currentProgress += stepSize;
        setProgress(Math.min(currentProgress, (stageIndex + 1) * 25));

        if (currentProgress >= (stageIndex + 1) * 25) {
          clearInterval(progressInterval);
          
          if (stageIndex < stages.length - 1) {
            stageIndex++;
            setLoadingStage(stages[stageIndex].name);
            updateProgress();
          } else {
            // Hide loading indicator after completion
            setTimeout(() => {
              setIsVisible(false);
            }, 1000);
          }
        }
      }, 50);
    };

    setLoadingStage(stages[0].name);
    updateProgress();

    return () => {
      // Cleanup handled by closure
    };
  }, [isOptimized]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${
      highContrastMode 
        ? 'bg-black border-b-4 border-white' 
        : 'bg-cyber-dark-secondary/95 border-b border-cyber-cyan/30 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-4">
          {/* Loading Icon */}
          <div className="flex-shrink-0">
            {progress >= 100 ? (
              <Check className={`w-5 h-5 ${
                highContrastMode ? 'text-white' : 'text-cyber-neon-green'
              }`} />
            ) : (
              <Loader2 className={`w-5 h-5 animate-spin ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`} />
            )}
          </div>

          {/* Progress Info */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {progress >= 100 ? t.stages.complete : t.stages[loadingStage as keyof typeof t.stages]}
              </span>
              
              <div className="flex items-center space-x-2">
                {isOptimized && (
                  <Badge className={`text-xs ${
                    highContrastMode 
                      ? 'bg-green-700 text-white' 
                      : 'bg-cyber-neon-green text-cyber-dark'
                  }`}>
                    <Zap className="w-3 h-3 mr-1" />
                    {t.optimized}
                  </Badge>
                )}
                <span className={`text-sm font-mono ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <Progress 
              value={progress} 
              className={`h-2 ${
                highContrastMode 
                  ? 'bg-gray-800' 
                  : 'bg-cyber-dark'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}