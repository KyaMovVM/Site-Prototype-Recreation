import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Heart, Star, Sparkles, Zap, Cherry, MapPin, Clock, Gift } from "lucide-react";

interface JapaneseEngagementPageProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
  loadingProgress: number;
  onComplete?: () => void;
}

export default function JapaneseEngagementPage({
  language,
  highContrastMode = false,
  loadingProgress,
  onComplete
}: JapaneseEngagementPageProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const texts = {
    ja: {
      title: '日本の皆様へ特別コンテンツ',
      subtitle: 'ページを読み込み中に楽しいコンテンツをお楽しみください',
      loadingMessage: 'KyaMovVMを最適化中...',
      funFacts: [
        '🗾 このプロジェクトは日本の技術愛好家のために作られました',
        '🌸 サイバーパンクデザインは東京のネオンライトからインスピレーション',
        '🎌 日本語は主要言語として設定されています',
        '🗼 東京タワーのように高くそびえる野心を持っています',
        '🍣 日本の職人精神で丁寧に作られています',
        '🎮 アニメやゲーム文化を愛するチームが開発',
        '⚡ 光速のような速度を目指しています',
        '🎨 日本のアート美学を技術に融合'
      ],
      interactiveElements: {
        title: 'インタラクティブ要素',
        clickMe: '私をクリック！',
        clickCount: 'クリック数',
        achievement: '達成！',
        kawaii: 'かわいい！'
      },
      specialFeatures: {
        title: '日本向け特別機能',
        features: [
          '🎌 日本語優先インターface',
          '🌸 桜をテーマにしたアニメーション',
          '🗾 日本時間での表示',
          '💴 日本円での計算サポート',
          '🎎 和風UIコンポーネント',
          '🍜 ラーメンタイマー機能（開発中）'
        ]
      },
      timeInJapan: '日本時間',
      almostReady: 'もうすぐ準備完了！',
      continue: '続行'
    },
    ru: {
      title: 'Специальный контент для японской аудитории',
      subtitle: 'Наслаждайтесь интересным контентом во время загрузки страницы',
      loadingMessage: 'Оптимизация KyaMovVM...',
      funFacts: [
        '🗾 Этот проект создан специально для японских энтузиастов технологий',
        '🌸 Киберпанк дизайн вдохновлен неоновыми огнями Токио',
        '🎌 Японский язык установлен как основной',
        '🗼 Имеет амбиции высокие как Токийская башня',
        '🍣 Создано с японским мастерством и вниманием к деталям',
        '🎮 Разработано командой любителей аниме и игровой культуры',
        '⚡ Стремится к скорости света',
        '🎨 Объединяет японскую эстетику с технологией'
      ],
      interactiveElements: {
        title: 'Интерактивные элементы',
        clickMe: 'Нажми на меня!',
        clickCount: 'Количество кликов',
        achievement: 'Достижение!',
        kawaii: 'Кавайи!'
      },
      specialFeatures: {
        title: 'Специальные функции для Японии',
        features: [
          '🎌 Приоритет японского языка',
          '🌸 Сакура-анимации',
          '🗾 Отображение времени Японии',
          '💴 Поддержка расчетов в йенах',
          '🎎 UI компоненты в японском стиле',
          '🍜 Таймер рамен (в разработке)'
        ]
      },
      timeInJapan: 'Время в Японии',
      almostReady: 'Почти готово!',
      continue: 'Продолжить'
    },
    en: {
      title: 'Special Content for Japanese Audience',
      subtitle: 'Enjoy interesting content while the page loads',
      loadingMessage: 'Optimizing KyaMovVM...',
      funFacts: [
        '🗾 This project is created specifically for Japanese tech enthusiasts',
        '🌸 Cyberpunk design inspired by Tokyo neon lights',
        '🎌 Japanese is set as the primary language',
        '🗼 Has ambitions as high as Tokyo Tower',
        '🍣 Created with Japanese craftsmanship and attention to detail',
        '🎮 Developed by team of anime and gaming culture lovers',
        '⚡ Aiming for light-speed performance',
        '🎨 Fuses Japanese art aesthetics with technology'
      ],
      interactiveElements: {
        title: 'Interactive Elements',
        clickMe: 'Click Me!',
        clickCount: 'Click Count',
        achievement: 'Achievement!',
        kawaii: 'Kawaii!'
      },
      specialFeatures: {
        title: 'Special Features for Japan',
        features: [
          '🎌 Japanese language priority interface',
          '🌸 Sakura-themed animations',
          '🗾 Japan time display',
          '💴 Japanese yen calculation support',
          '🎎 Japanese-style UI components',
          '🍜 Ramen timer function (in development)'
        ]
      },
      timeInJapan: 'Time in Japan',
      almostReady: 'Almost Ready!',
      continue: 'Continue'
    }
  };

  const t = texts[language];

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % t.funFacts.length);
    }, 3000);

    return () => clearInterval(factInterval);
  }, [t.funFacts.length]);

  const getJapanTime = () => {
    return new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleInteractiveClick = () => {
    setClickCount(prev => prev + 1);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };

  const getKawaiiExpression = () => {
    if (clickCount === 0) return '(・∀・)';
    if (clickCount < 5) return '(´∀｀)';
    if (clickCount < 10) return '(＾◡＾)';
    if (clickCount < 20) return '(≧▽≦)';
    return '(◕‿◕)♡';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      highContrastMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cyber-bg-pattern opacity-20"></div>
        <div className="cyber-grid-pattern opacity-10"></div>
        
        {/* Floating Sakura Petals */}
        {!highContrastMode && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-2xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        {/* Main Loading Card */}
        <Card className={`backdrop-blur-sm shadow-2xl ${
          highContrastMode
            ? 'border-4 border-white bg-black/95'
            : 'border-cyber-pink/30 bg-cyber-dark-secondary/95 shadow-cyber-pink/20'
        }`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`text-6xl ${showAnimation ? 'animate-bounce' : ''}`}>
                {language === 'ja' ? '🎌' : '🗾'}
              </div>
            </div>
            <CardTitle className={`text-2xl mb-2 ${
              highContrastMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-cyber-pink to-cyber-purple bg-clip-text text-transparent'
            }`}>
              {t.title}
            </CardTitle>
            <p className={`${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Loading Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  {t.loadingMessage}
                </span>
                <Badge className={`${
                  highContrastMode 
                    ? 'bg-white text-black' 
                    : 'bg-cyber-pink text-white'
                }`}>
                  {Math.round(loadingProgress)}%
                </Badge>
              </div>
              <Progress 
                value={loadingProgress} 
                className={`h-3 ${
                  highContrastMode 
                    ? 'bg-gray-800' 
                    : 'bg-cyber-dark'
                }`}
              />
            </div>

            {/* Time in Japan */}
            <div className={`text-center p-3 rounded-lg ${
              highContrastMode 
                ? 'bg-gray-800' 
                : 'bg-cyber-dark/50'
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Clock className={`w-4 h-4 ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`} />
                <span className={`text-sm ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {t.timeInJapan}
                </span>
              </div>
              <div className={`text-xl font-mono font-bold ${
                highContrastMode ? 'text-white' : 'text-cyber-pink'
              }`}>
                {getJapanTime()}
              </div>
            </div>

            {/* Fun Facts Carousel */}
            <div className={`p-4 rounded-lg border-l-4 transition-all duration-500 ${
              highContrastMode
                ? 'border-white bg-gray-800'
                : 'border-cyber-pink bg-cyber-pink/10'
            }`}>
              <div className="flex items-start space-x-3">
                <Sparkles className={`w-5 h-5 mt-0.5 ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`} />
                <p className={`font-medium ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  {t.funFacts[currentFact]}
                </p>
              </div>
            </div>

            {/* Interactive Element */}
            <div className={`p-4 rounded-lg ${
              highContrastMode 
                ? 'bg-gray-800' 
                : 'bg-cyber-dark/30'
            }`}>
              <h4 className={`font-bold mb-3 ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.interactiveElements.title}
              </h4>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleInteractiveClick}
                  className={`font-bold transition-all duration-300 ${
                    showAnimation ? 'scale-110' : 'scale-100'
                  } ${
                    highContrastMode
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gradient-to-r from-cyber-pink to-cyber-purple hover:from-cyber-pink/80 hover:to-cyber-purple/80'
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {t.interactiveElements.clickMe}
                </Button>
                
                <div className="text-center">
                  <div className="text-2xl mb-1">{getKawaiiExpression()}</div>
                  <Badge variant="outline" className="text-xs">
                    {t.interactiveElements.clickCount}: {clickCount}
                  </Badge>
                </div>
              </div>

              {clickCount >= 10 && (
                <div className={`mt-3 p-2 rounded text-center ${
                  highContrastMode 
                    ? 'bg-green-800 text-white' 
                    : 'bg-cyber-neon-green/20 text-cyber-neon-green'
                }`}>
                  <Star className="w-4 h-4 inline mr-1" />
                  {t.interactiveElements.achievement} {t.interactiveElements.kawaii}
                </div>
              )}
            </div>

            {/* Special Features Preview */}
            <div className="space-y-3">
              <h4 className={`font-bold ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.specialFeatures.title}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {t.specialFeatures.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm ${
                      highContrastMode 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-cyber-dark/50 text-cyber-cyan/80'
                    }`}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button (when loading is complete) */}
            {loadingProgress >= 100 && (
              <div className="text-center pt-4">
                <div className={`mb-4 font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-neon-green'
                }`}>
                  {t.almostReady}
                </div>
                <Button
                  onClick={onComplete}
                  size="lg"
                  className={`font-bold transition-all duration-300 hover:scale-105 ${
                    highContrastMode
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gradient-to-r from-cyber-neon-green to-cyber-cyan hover:from-cyber-neon-green/80 hover:to-cyber-cyan/80'
                  }`}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  {t.continue}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}