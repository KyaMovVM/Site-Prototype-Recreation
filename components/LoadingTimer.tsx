// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Timer, Zap, Turtle, Rabbit, Settings, TrendingUp, Loader2 } from "lucide-react";

interface LoadingTimerProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
  onOptimizationToggle?: (enabled: boolean) => void;
  isOptimized?: boolean;
}

export default function LoadingTimer({ 
  language, 
  highContrastMode = false, 
  onOptimizationToggle,
  isOptimized = false 
}: LoadingTimerProps) {
  const [loadTime, setLoadTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [animalMood, setAnimalMood] = useState<'happy' | 'waiting' | 'sleepy' | 'excited'>('waiting');
  const [isCompact, setIsCompact] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const startTimeRef = useRef<number>(performance.now());
  const intervalRef = useRef<NodeJS.Timeout>();
  const initialLoadRef = useRef<boolean>(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  const texts = {
    ja: {
      loading: '読み込み中...',
      completed: '読み込み完了！',
      loadTime: '読み込み時間',
      performance: 'パフォーマンス',
      excellent: '優秀！',
      good: '良好',
      average: '普通',
      slow: '遅い',
      veryFast: '超高速',
      fast: '高速',
      normal: '通常',
      slowText: '遅い',
      optimizeMode: '最適化モード',
      normalMode: '通常モード',
      enableOptimization: '最適化を有効にする',
      disableOptimization: '最適化を無効にする',
      resources: 'リソース',
      animalSays: {
        happy: 'やったね！とても速いよ！🐱',
        waiting: 'がんばって読み込み中...🐾',
        sleepy: 'うーん、ちょっと時間がかかってるね...😴',
        excited: 'わー！スーパー高速だ！✨'
      }
    },
    ru: {
      loading: 'Загрузка...',
      completed: 'Загрузка завершена!',
      loadTime: 'Время загрузки',
      performance: 'Производительность',
      excellent: 'Отлично!',
      good: 'Хорошо',
      average: 'Средне',
      slow: 'Медленно',
      veryFast: 'Очень быстро',
      fast: 'Быстро',
      normal: 'Нормально',
      slowText: 'Медленно',
      optimizeMode: 'Режим оптимизации',
      normalMode: 'Обычный режим',
      enableOptimization: 'Включить оптимизацию',
      disableOptimization: 'Отключить оптимизацию',
      resources: 'Ресурсы',
      animalSays: {
        happy: 'Отлично! Очень быстро! 🐱',
        waiting: 'Загружается... 🐾',
        sleepy: 'Хм, загрузка идет медленно... 😴',
        excited: 'Вау! Супер быстро! ✨'
      }
    },
    en: {
      loading: 'Loading...',
      completed: 'Loading Complete!',
      loadTime: 'Load Time',
      performance: 'Performance',
      excellent: 'Excellent!',
      good: 'Good',
      average: 'Average',
      slow: 'Slow',
      veryFast: 'Very Fast',
      fast: 'Fast',
      normal: 'Normal',
      slowText: 'Slow',
      optimizeMode: 'Optimization Mode',
      normalMode: 'Normal Mode',
      enableOptimization: 'Enable Optimization',
      disableOptimization: 'Disable Optimization',
      resources: 'Resources',
      animalSays: {
        happy: 'Great! Very fast! 🐱',
        waiting: 'Loading... 🐾',
        sleepy: 'Hmm, loading is slow... 😴',
        excited: 'Wow! Super fast! ✨'
      }
    }
  };

  const t = texts[language];

  // Track page loading performance
  useEffect(() => {
    startTimeRef.current = performance.now();
    setIsLoading(true);
    setShowResults(false);
    setAnimalMood('waiting');
    setIsCompact(false);
    setResourcesLoaded(0);
    setTotalResources(0);

    // Count total resources
    const images = document.querySelectorAll('img');
    const scripts = document.querySelectorAll('script[src]');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const total = images.length + scripts.length + stylesheets.length;
    setTotalResources(total);

    // Track resource loading
    let loaded = 0;
    const trackResource = () => {
      loaded++;
      setResourcesLoaded(loaded);
    };

    images.forEach(img => {
      if (img.complete) {
        trackResource();
      } else {
        img.addEventListener('load', trackResource);
        img.addEventListener('error', trackResource);
      }
    });

    // Update timer continuously while loading
    intervalRef.current = setInterval(() => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      setLoadTime(elapsed);

      // Update animal mood based on time
      if (elapsed < 1) {
        setAnimalMood('excited');
      } else if (elapsed < 3) {
        setAnimalMood('happy');
      } else if (elapsed < 6) {
        setAnimalMood('waiting');
      } else {
        setAnimalMood('sleepy');
      }
    }, 50); // Update every 50ms for smooth counting

    // Check when page is fully loaded
    const checkPageLoad = () => {
      if (document.readyState === 'complete') {
        const finalTime = (performance.now() - startTimeRef.current) / 1000;
        setLoadTime(finalTime);
        setIsLoading(false);
        setShowResults(true);
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Final animal mood
        if (finalTime < 1) {
          setAnimalMood('excited');
        } else if (finalTime < 3) {
          setAnimalMood('happy');
        } else {
          setAnimalMood('sleepy');
        }

        // Switch to compact mode after 3 seconds
        setTimeout(() => {
          setIsCompact(true);
        }, 3000);

        // Hide completely after 10 seconds unless hovered
        setTimeout(() => {
          if (!isHovered) {
            setIsVisible(false);
          }
        }, 10000);
      } else {
        setTimeout(checkPageLoad, 100);
      }
    };

    // Start checking immediately
    checkPageLoad();

    // Also listen for load event as fallback
    const handleLoad = () => {
      if (isLoading) {
        const finalTime = (performance.now() - startTimeRef.current) / 1000;
        setLoadTime(finalTime);
        setIsLoading(false);
        setShowResults(true);
        
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    window.addEventListener('load', handleLoad);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('load', handleLoad);
      
      // Clean up event listeners
      images.forEach(img => {
        img.removeEventListener('load', trackResource);
        img.removeEventListener('error', trackResource);
      });
    };
  }, [isLoading, isHovered]);

  // Reset visibility on hover
  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
    }
  }, [isHovered]);

  const getPerformanceLevel = () => {
    if (loadTime < 1) return { level: 'veryFast', color: 'cyber-neon-green', emoji: '🚀' };
    if (loadTime < 2) return { level: 'fast', color: 'cyber-cyan', emoji: '⚡' };
    if (loadTime < 4) return { level: 'good', color: 'cyber-purple', emoji: '👍' };
    if (loadTime < 6) return { level: 'average', color: 'cyber-pink', emoji: '⏱️' };
    return { level: 'slow', color: 'red-500', emoji: '🐌' };
  };

  const performanceData = getPerformanceLevel();

  const getAnimalIcon = () => {
    switch (animalMood) {
      case 'excited': return '🐰'; // Excited rabbit
      case 'happy': return '🐱'; // Happy cat
      case 'waiting': return '🐾'; // Paw prints
      case 'sleepy': return '🦥'; // Sleepy sloth
      default: return '🐾';
    }
  };

  const handleOptimizationToggle = () => {
    if (onOptimizationToggle) {
      onOptimizationToggle(!isOptimized);
    }
  };

  if (!isVisible) return null;

  const shouldShowFull = isLoading || !isCompact || isHovered;

  return (
    <div 
      className={`fixed transition-all duration-500 z-40 ${
        shouldShowFull ? 'top-24 left-4 max-w-xs' : 'bottom-4 right-4 max-w-fit'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-500 ${
        shouldShowFull ? 'scale-100' : 'scale-90'
      } ${
        highContrastMode
          ? 'border-4 border-white bg-black/95 text-white'
          : 'border-cyber-cyan/30 bg-cyber-dark-secondary/95 shadow-cyber-cyan/20'
      }`}>
        <CardContent className={`transition-all duration-500 ${
          shouldShowFull ? 'p-4 space-y-3' : 'p-2 space-y-1'
        }`}>
          
          {/* Compact Mode */}
          {!shouldShowFull && (
            <div className="flex items-center space-x-2">
              <div className="text-lg">{getAnimalIcon()}</div>
              <div className="flex items-center space-x-1">
                <Timer className="w-3 h-3" />
                <span className="font-mono text-sm">
                  {loadTime.toFixed(1)}s
                </span>
              </div>
              {isOptimized && (
                <Rabbit className="w-3 h-3 text-cyber-neon-green" />
              )}
            </div>
          )}

          {/* Full Mode */}
          {shouldShowFull && (
            <>
              {/* Animal Character */}
              <div className="text-center">
                <div className={`inline-block text-4xl transition-all duration-300 ${
                  isLoading ? 'animate-bounce' : ''
                }`}>
                  {getAnimalIcon()}
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center space-y-2">
                <div className={`flex items-center justify-center space-x-2 ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Timer className="w-4 h-4" />
                  )}
                  <span className="font-mono text-lg">
                    {loadTime.toFixed(1)}s
                  </span>
                </div>

                <div className={`text-xs ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {isLoading ? t.loading : t.completed}
                </div>
              </div>

              {/* Resource Loading Progress */}
              {isLoading && totalResources > 0 && (
                <div className="space-y-1">
                  <div className={`text-xs ${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                  }`}>
                    {t.resources}: {resourcesLoaded}/{totalResources}
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-1.5 ${
                    highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark'
                  }`}>
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        highContrastMode ? 'bg-white' : 'bg-cyber-cyan'
                      }`}
                      style={{ 
                        width: `${totalResources > 0 ? (resourcesLoaded / totalResources) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Performance Badge */}
              {showResults && (
                <div className="text-center">
                  <Badge className={`font-bold text-xs ${
                    highContrastMode
                      ? 'bg-white text-black'
                      : `bg-${performanceData.color} text-white`
                  }`}>
                    {performanceData.emoji} {t[performanceData.level as keyof typeof t]}
                  </Badge>
                </div>
              )}

              {/* Animal Message */}
              <div className={`text-xs text-center p-2 rounded-lg ${
                highContrastMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-cyber-dark/50 text-cyber-cyan/80'
              }`}>
                {t.animalSays[animalMood]}
              </div>

              {/* Optimization Toggle */}
              <div className="pt-2 border-t border-cyber-cyan/20">
                <Button
                  size="sm"
                  variant={isOptimized ? "default" : "outline"}
                  onClick={handleOptimizationToggle}
                  className={`w-full text-xs font-medium transition-all duration-300 ${
                    isOptimized
                      ? (highContrastMode
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-cyber-neon-green text-cyber-dark hover:bg-cyber-neon-green/80')
                      : (highContrastMode
                          ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                          : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10')
                  }`}
                  title={isOptimized ? t.disableOptimization : t.enableOptimization}
                >
                  <div className="flex items-center space-x-1">
                    {isOptimized ? (
                      <>
                        <Rabbit className="w-3 h-3" />
                        <span>{t.optimizeMode}</span>
                      </>
                    ) : (
                      <>
                        <Turtle className="w-3 h-3" />
                        <span>{t.normalMode}</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>

              {/* Performance Stats (when completed) */}
              {showResults && (
                <div className={`text-xs space-y-1 pt-2 border-t ${
                  highContrastMode ? 'border-white/20' : 'border-cyber-cyan/20'
                }`}>
                  <div className="flex justify-between">
                    <span className={highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'}>
                      {t.loadTime}:
                    </span>
                    <span className={`font-mono ${
                      highContrastMode ? 'text-white' : 'text-cyber-cyan'
                    }`}>
                      {loadTime.toFixed(2)}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'}>
                      {t.performance}:
                    </span>
                    <span className={`font-medium ${
                      highContrastMode ? 'text-white' : `text-${performanceData.color}`
                    }`}>
                      {t[performanceData.level as keyof typeof t]}
                    </span>
                  </div>
                  {totalResources > 0 && (
                    <div className="flex justify-between">
                      <span className={highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'}>
                        {t.resources}:
                      </span>
                      <span className={`font-mono ${
                        highContrastMode ? 'text-white' : 'text-cyber-cyan'
                      }`}>
                        {resourcesLoaded}/{totalResources}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}