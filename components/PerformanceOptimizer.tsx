// @ts-nocheck
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Zap, Turtle, Rabbit, Wifi, WifiOff, Gauge, Settings } from "lucide-react";

interface PerformanceOptimizerProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
  isOptimized: boolean;
  onOptimizationChange: (enabled: boolean) => void;
  onClose?: () => void;
}

export default function PerformanceOptimizer({
  language,
  highContrastMode = false,
  isOptimized,
  onOptimizationChange,
  onClose
}: PerformanceOptimizerProps) {
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow' | 'unknown'>('unknown');
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [devicePerformance, setDevicePerformance] = useState<'high' | 'low' | 'unknown'>('unknown');

  const texts = {
    ja: {
      title: 'パフォーマンス最適化',
      subtitle: '読み込み速度を改善します',
      currentMode: '現在のモード',
      optimized: '最適化済み',
      normal: '通常',
      connectionSpeed: '接続速度',
      devicePerformance: 'デバイス性能',
      autoOptimize: '自動最適化',
      autoOptimizeDesc: '接続速度に基づいて自動的に最適化',
      optimizations: '最適化設定',
      lazyLoading: '遅延読み込み',
      imageOptimization: '画像最適化',
      codesplitting: 'コード分割',
      preloading: '事前読み込み',
      apply: '適用',
      cancel: 'キャンセル',
      fast: '高速',
      slow: '低速',
      high: '高性能',
      low: '低性能',
      unknown: '不明',
      recommendation: 'おすすめ',
      enableOptimization: '日本での快適な閲覧のため最適化をお勧めします',
      optimizationBenefits: '最適化により読み込み時間が50%短縮されます'
    },
    ru: {
      title: 'Оптимизация производительности',
      subtitle: 'Улучшает скорость загрузки',
      currentMode: 'Текущий режим',
      optimized: 'Оптимизирован',
      normal: 'Обычный',
      connectionSpeed: 'Скорость соединения',
      devicePerformance: 'Производительность устройства',
      autoOptimize: 'Авто-оптимизация',
      autoOptimizeDesc: 'Автоматическая оптимизация на основе скорости соединения',
      optimizations: 'Настройки оптимизации',
      lazyLoading: 'Ленивая загрузка',
      imageOptimization: 'Оптимизация изображений',
      codesplitting: 'Разделение кода',
      preloading: 'Предварительная загрузка',
      apply: 'Применить',
      cancel: 'Отмена',
      fast: 'Быстрое',
      slow: 'Медленное',
      high: 'Высокая',
      low: 'Низкая',
      unknown: 'Неизвестно',
      recommendation: 'Рекомендация',
      enableOptimization: 'Рекомендуется включить оптимизацию для комфортного просмотра',
      optimizationBenefits: 'Оптимизация сокращает время загрузки на 50%'
    },
    en: {
      title: 'Performance Optimization',
      subtitle: 'Improves loading speed',
      currentMode: 'Current Mode',
      optimized: 'Optimized',
      normal: 'Normal',
      connectionSpeed: 'Connection Speed',
      devicePerformance: 'Device Performance',
      autoOptimize: 'Auto Optimize',
      autoOptimizeDesc: 'Automatically optimize based on connection speed',
      optimizations: 'Optimization Settings',
      lazyLoading: 'Lazy Loading',
      imageOptimization: 'Image Optimization',
      codesplitting: 'Code Splitting',
      preloading: 'Preloading',
      apply: 'Apply',
      cancel: 'Cancel',
      fast: 'Fast',
      slow: 'Slow',
      high: 'High',
      low: 'Low',
      unknown: 'Unknown',
      recommendation: 'Recommendation',
      enableOptimization: 'Optimization recommended for better browsing experience',
      optimizationBenefits: 'Optimization reduces loading time by 50%'
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Detect connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === '4g' || effectiveType === '3g') {
          setConnectionSpeed('fast');
        } else {
          setConnectionSpeed('slow');
        }
      }
    }

    // Detect device performance (simple heuristic)
    const detectDevicePerformance = () => {
      const startTime = performance.now();
      for (let i = 0; i < 100000; i++) {
        Math.random();
      }
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      if (executionTime < 10) {
        setDevicePerformance('high');
      } else {
        setDevicePerformance('low');
      }
    };

    detectDevicePerformance();
  }, []);

  useEffect(() => {
    // Auto-optimize for Japanese users with slow connections
    if (autoOptimize && language === 'ja' && connectionSpeed === 'slow') {
      onOptimizationChange(true);
    }
  }, [autoOptimize, language, connectionSpeed, onOptimizationChange]);

  const shouldRecommendOptimization = () => {
    return language === 'ja' || connectionSpeed === 'slow' || devicePerformance === 'low';
  };

  const getConnectionIcon = () => {
    switch (connectionSpeed) {
      case 'fast': return <Wifi className="w-4 h-4" />;
      case 'slow': return <WifiOff className="w-4 h-4" />;
      default: return <Gauge className="w-4 h-4" />;
    }
  };

  const getPerformanceIcon = () => {
    switch (devicePerformance) {
      case 'high': return <Zap className="w-4 h-4" />;
      case 'low': return <Turtle className="w-4 h-4" />;
      default: return <Gauge className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md max-h-[90vh] overflow-y-auto ${
        highContrastMode
          ? 'border-4 border-white bg-black text-white'
          : 'border-cyber-cyan/30 bg-cyber-dark-secondary/95 shadow-2xl shadow-cyber-cyan/20'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`flex items-center space-x-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                <Settings className="w-5 h-5" />
                <span>{t.title}</span>
              </CardTitle>
              <p className={`text-sm mt-1 ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
              }`}>
                {t.subtitle}
              </p>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={`${
                  highContrastMode
                    ? 'text-white hover:bg-gray-800'
                    : 'text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
              >
                ×
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.currentMode}:
              </span>
              <Badge className={`${
                isOptimized
                  ? (highContrastMode 
                      ? 'bg-green-700 text-white'
                      : 'bg-cyber-neon-green text-cyber-dark')
                  : (highContrastMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-cyber-pink text-white')
              }`}>
                {isOptimized ? (
                  <>
                    <Rabbit className="w-3 h-3 mr-1" />
                    {t.optimized}
                  </>
                ) : (
                  <>
                    <Turtle className="w-3 h-3 mr-1" />
                    {t.normal}
                  </>
                )}
              </Badge>
            </div>

            {/* Connection Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg border ${
                highContrastMode
                  ? 'border-white/20 bg-gray-800'
                  : 'border-cyber-cyan/20 bg-cyber-dark/30'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getConnectionIcon()}
                  <span className={`text-sm font-medium ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    {t.connectionSpeed}
                  </span>
                </div>
                <Badge variant="outline" className={`text-xs ${
                  connectionSpeed === 'fast'
                    ? 'border-green-500 text-green-400'
                    : connectionSpeed === 'slow'
                      ? 'border-red-500 text-red-400'
                      : 'border-gray-500 text-gray-400'
                }`}>
                  {t[connectionSpeed]}
                </Badge>
              </div>

              <div className={`p-3 rounded-lg border ${
                highContrastMode
                  ? 'border-white/20 bg-gray-800'
                  : 'border-cyber-cyan/20 bg-cyber-dark/30'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getPerformanceIcon()}
                  <span className={`text-sm font-medium ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    {t.devicePerformance}
                  </span>
                </div>
                <Badge variant="outline" className={`text-xs ${
                  devicePerformance === 'high'
                    ? 'border-green-500 text-green-400'
                    : devicePerformance === 'low'
                      ? 'border-red-500 text-red-400'
                      : 'border-gray-500 text-gray-400'
                }`}>
                  {t[devicePerformance]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          {shouldRecommendOptimization() && !isOptimized && (
            <div className={`p-4 rounded-lg border-l-4 ${
              highContrastMode
                ? 'border-white bg-gray-800 text-gray-300'
                : 'border-cyber-neon-green bg-cyber-neon-green/10 text-cyber-neon-green'
            }`}>
              <div className="flex items-start space-x-2">
                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{t.recommendation}</p>
                  <p className="text-xs mt-1 opacity-80">
                    {language === 'ja' ? t.enableOptimization : t.optimizationBenefits}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Auto Optimization */}
          <div className="flex items-center justify-between">
            <div>
              <label className={`font-medium text-sm ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.autoOptimize}
              </label>
              <p className={`text-xs mt-1 ${
                highContrastMode ? 'text-gray-400' : 'text-cyber-cyan/60'
              }`}>
                {t.autoOptimizeDesc}
              </p>
            </div>
            <Switch
              checked={autoOptimize}
              onCheckedChange={setAutoOptimize}
              className="ml-4"
            />
          </div>

          {/* Optimization Features */}
          <div className="space-y-3">
            <h4 className={`font-medium ${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              {t.optimizations}
            </h4>
            
            <div className="space-y-2">
              {[
                { key: 'lazyLoading', icon: '🔄' },
                { key: 'imageOptimization', icon: '🖼️' },
                { key: 'codesplitting', icon: '⚡' },
                { key: 'preloading', icon: '🚀' }
              ].map((feature) => (
                <div key={feature.key} className={`flex items-center space-x-3 p-2 rounded ${
                  isOptimized
                    ? (highContrastMode ? 'bg-green-800/30' : 'bg-cyber-neon-green/10')
                    : (highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/30')
                }`}>
                  <span className="text-lg">{feature.icon}</span>
                  <span className={`text-sm flex-grow ${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                  }`}>
                    {t[feature.key as keyof typeof t]}
                  </span>
                  <Badge 
                    variant={isOptimized ? "default" : "outline"}
                    className={`text-xs ${
                      isOptimized
                        ? (highContrastMode ? 'bg-green-700' : 'bg-cyber-neon-green text-cyber-dark')
                        : ''
                    }`}
                  >
                    {isOptimized ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => onOptimizationChange(!isOptimized)}
              className={`flex-1 font-bold transition-all duration-300 ${
                isOptimized
                  ? (highContrastMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-cyber-pink text-white hover:bg-cyber-pink/80')
                  : (highContrastMode
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-cyber-neon-green text-cyber-dark hover:bg-cyber-neon-green/80')
              }`}
            >
              {isOptimized ? (
                <>
                  <Turtle className="w-4 h-4 mr-2" />
                  {t.normal}
                </>
              ) : (
                <>
                  <Rabbit className="w-4 h-4 mr-2" />
                  {t.optimized}
                </>
              )}
            </Button>
            
            {onClose && (
              <Button
                variant="outline"
                onClick={onClose}
                className={`${
                  highContrastMode
                    ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                    : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
              >
                {t.cancel}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}