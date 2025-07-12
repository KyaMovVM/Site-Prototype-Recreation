import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Home, Search, Database, Code, AlertTriangle, Zap, RefreshCw } from "lucide-react";
import KyaMovVMLogo from "./KyaMovVMLogo";

interface NotFoundPageProps {
  language: 'ja' | 'ru' | 'en';
  onNavigateHome: () => void;
  onNavigateToUML: () => void;
  highContrastMode?: boolean;
  requestedPath?: string;
}

export default function NotFoundPage({ 
  language, 
  onNavigateHome, 
  onNavigateToUML, 
  highContrastMode = false,
  requestedPath = ''
}: NotFoundPageProps) {
  const [glitchText, setGlitchText] = useState('404');
  const [isGlitching, setIsGlitching] = useState(false);

  const texts = {
    ja: {
      title: '404 - ページが見つかりません',
      subtitle: 'リクエストされたページは存在しません',
      description: 'お探しのページは削除、移動、または一時的に利用できない可能性があります。',
      errorCode: 'エラーコード',
      requestedPath: 'リクエストパス',
      suggestions: '提案',
      suggestionList: [
        'URLを確認してください',
        'ホームページから再度お試しください',
        '検索機能を使用してください',
        'ナビゲーションメニューから適切なページを選択してください'
      ],
      quickLinks: 'クイックリンク',
      homeButton: 'ホームに戻る',
      databaseButton: 'データベース スキーマ',
      refreshButton: 'ページを更新',
      reportProblem: '問題を報告',
      lastUpdated: '最終更新',
      serverStatus: 'サーバーステータス: オンライン',
      alternativePages: '代替ページ',
      popularPages: [
        'ホームページ',
        'UML データベース スキーマ',
        'ドキュメント',
        '開発計画'
      ]
    },
    ru: {
      title: '404 - Страница не найдена',
      subtitle: 'Запрашиваемая страница не существует',
      description: 'Страница, которую вы ищете, могла быть удалена, перемещена или временно недоступна.',
      errorCode: 'Код ошибки',
      requestedPath: 'Запрашиваемый путь',
      suggestions: 'Предложения',
      suggestionList: [
        'Проверьте правильность URL',
        'Попробуйте начать с главной страницы',
        'Используйте функцию поиска',
        'Выберите нужную страницу из меню навигации'
      ],
      quickLinks: 'Быстрые ссылки',
      homeButton: 'Вернуться домой',
      databaseButton: 'Схема базы данных',
      refreshButton: 'Обновить страницу',
      reportProblem: 'Сообщить о проблеме',
      lastUpdated: 'Последнее обновление',
      serverStatus: 'Статус сервера: Онлайн',
      alternativePages: 'Альтернативные страницы',
      popularPages: [
        'Главная страница',
        'UML Схема базы данных',
        'Документация',
        'План разработки'
      ]
    },
    en: {
      title: '404 - Page Not Found',
      subtitle: 'The requested page does not exist',
      description: 'The page you are looking for might have been deleted, moved, or is temporarily unavailable.',
      errorCode: 'Error Code',
      requestedPath: 'Requested Path',
      suggestions: 'Suggestions',
      suggestionList: [
        'Check the URL for correct spelling',
        'Try starting from the homepage',
        'Use the search functionality',
        'Select the appropriate page from the navigation menu'
      ],
      quickLinks: 'Quick Links',
      homeButton: 'Return Home',
      databaseButton: 'Database Schema',
      refreshButton: 'Refresh Page',
      reportProblem: 'Report Problem',
      lastUpdated: 'Last Updated',
      serverStatus: 'Server Status: Online',
      alternativePages: 'Alternative Pages',
      popularPages: [
        'Homepage',
        'UML Database Schema',
        'Documentation',
        'Development Plan'
      ]
    }
  };

  const t = texts[language];

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchChars = ['4', '0', '4', '⚡', '●', '◐', '◑', '◒', '◓', '▄', '▀'];
    const originalText = '404';
    
    const startGlitch = () => {
      setIsGlitching(true);
      let glitchCount = 0;
      const maxGlitches = 8;
      
      const glitchInterval = setInterval(() => {
        if (glitchCount < maxGlitches) {
          const glitchedText = originalText
            .split('')
            .map((char, index) => {
              if (Math.random() < 0.3) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join('');
          setGlitchText(glitchedText);
          glitchCount++;
        } else {
          setGlitchText(originalText);
          setIsGlitching(false);
          clearInterval(glitchInterval);
        }
      }, 100);
    };

    const glitchTimer = setInterval(startGlitch, 3000);
    return () => clearInterval(glitchTimer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleReportProblem = () => {
    const subject = encodeURIComponent(`404 Error Report - ${requestedPath}`);
    const body = encodeURIComponent(`Page not found: ${requestedPath}\nTimestamp: ${new Date().toISOString()}\nUser Agent: ${navigator.userAgent}`);
    window.open(`mailto:admin@kyamovvm.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className={`min-h-screen-safe ${
      highContrastMode 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      {/* Cyberpunk Background */}
      <div className="absolute inset-0 cyber-bg-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark"></div>
        <div className="cyber-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-cyber-cyan/10"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <button 
            onClick={onNavigateHome}
            className="hover:opacity-80 transition-opacity"
            title="KyaMovVM - ホーム"
          >
            <KyaMovVMLogo 
              width={200} 
              height={50} 
              animated={!highContrastMode} 
              highContrastMode={highContrastMode}
              className="mx-auto mb-4"
            />
          </button>
        </div>

        {/* Main 404 Error Card */}
        <Card className={`max-w-4xl mx-auto backdrop-blur-sm shadow-2xl mb-8 ${
          highContrastMode
            ? 'border-4 border-white bg-black/95'
            : 'border-2 border-red-500/30 bg-cyber-dark-secondary/95 shadow-red-500/20'
        }`}>
          <CardHeader className="text-center">
            {/* Animated 404 Text */}
            <div className={`text-8xl md:text-9xl font-black mb-4 ${
              isGlitching ? 'animate-pulse' : ''
            } ${
              highContrastMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-red-500 to-cyber-pink bg-clip-text text-transparent'
            }`}>
              {glitchText}
            </div>
            
            <CardTitle className={`text-2xl md:text-3xl font-bold mb-4 ${
              highContrastMode ? 'text-white' : 'text-red-500'
            }`}>
              {t.title}
            </CardTitle>
            
            <p className={`text-lg font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Error Details */}
            <div className={`p-4 rounded-lg border ${
              highContrastMode 
                ? 'bg-gray-900 border-white/20' 
                : 'bg-cyber-dark/50 border-red-500/20'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className={highContrastMode ? 'text-white' : 'text-cyber-cyan'}>
                    {t.errorCode}:
                  </strong>
                  <span className={`ml-2 font-mono ${
                    highContrastMode ? 'text-gray-300' : 'text-red-500'
                  }`}>
                    HTTP 404
                  </span>
                </div>
                {requestedPath && (
                  <div>
                    <strong className={highContrastMode ? 'text-white' : 'text-cyber-cyan'}>
                      {t.requestedPath}:
                    </strong>
                    <span className={`ml-2 font-mono break-all ${
                      highContrastMode ? 'text-gray-300' : 'text-cyber-pink'
                    }`}>
                      {requestedPath}
                    </span>
                  </div>
                )}
                <div>
                  <strong className={highContrastMode ? 'text-white' : 'text-cyber-cyan'}>
                    {t.lastUpdated}:
                  </strong>
                  <span className={`ml-2 ${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                  }`}>
                    {new Date().toLocaleString(language === 'ja' ? 'ja-JP' : language === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                </div>
                <div>
                  <strong className={highContrastMode ? 'text-white' : 'text-cyber-cyan'}>
                    {t.serverStatus}
                  </strong>
                  <Zap className={`inline w-4 h-4 ml-2 ${
                    highContrastMode ? 'text-green-400' : 'text-cyber-neon-green'
                  }`} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-center">
              <p className={`font-medium ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/90'
              }`}>
                {t.description}
              </p>
            </div>

            {/* Suggestions */}
            <div className={`p-6 rounded-lg border ${
              highContrastMode 
                ? 'bg-gray-900 border-white/20' 
                : 'bg-cyber-dark/30 border-cyber-cyan/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                <AlertTriangle className="w-5 h-5 mr-2" />
                {t.suggestions}
              </h3>
              <ul className="space-y-2">
                {t.suggestionList.map((suggestion, index) => (
                  <li 
                    key={index}
                    className={`flex items-start space-x-2 ${
                      highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      highContrastMode ? 'bg-white' : 'bg-cyber-cyan'
                    }`}></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onNavigateHome}
                size="lg"
                className={`font-bold transition-all duration-300 hover:scale-105 ${
                  highContrastMode
                    ? 'bg-white text-black hover:bg-gray-200 border-4 border-white'
                    : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:from-cyber-cyan/80 hover:to-cyber-pink/80 text-white'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                {t.homeButton}
              </Button>
              
              <Button 
                onClick={onNavigateToUML}
                variant="outline"
                size="lg"
                className={`font-bold transition-all duration-300 hover:scale-105 ${
                  highContrastMode
                    ? 'border-4 border-white text-white hover:bg-white hover:text-black'
                    : 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10'
                }`}
              >
                <Database className="w-4 h-4 mr-2" />
                {t.databaseButton}
              </Button>
              
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="lg"
                className={`font-bold transition-all duration-300 hover:scale-105 ${
                  highContrastMode
                    ? 'border-4 border-white text-white hover:bg-white hover:text-black'
                    : 'border-2 border-cyber-neon-green text-cyber-neon-green hover:bg-cyber-neon-green/10'
                }`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refreshButton}
              </Button>
            </div>

            {/* Popular Pages */}
            <div className={`p-6 rounded-lg border ${
              highContrastMode 
                ? 'bg-gray-900 border-white/20' 
                : 'bg-cyber-dark/30 border-cyber-pink/20'
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center ${
                highContrastMode ? 'text-white' : 'text-cyber-pink'
              }`}>
                <Search className="w-5 h-5 mr-2" />
                {t.alternativePages}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {t.popularPages.map((page, index) => (
                  <button
                    key={index}
                    onClick={index === 0 ? onNavigateHome : index === 1 ? onNavigateToUML : onNavigateHome}
                    className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      highContrastMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-cyber-dark-secondary/50 text-cyber-cyan hover:bg-cyber-cyan/10 border border-cyber-cyan/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Problem Button */}
            <div className="text-center">
              <Button 
                onClick={handleReportProblem}
                variant="ghost"
                size="sm"
                className={`font-medium ${
                  highContrastMode
                    ? 'text-white hover:bg-white/20'
                    : 'text-cyber-cyan/80 hover:bg-cyber-cyan/10'
                }`}
              >
                <Code className="w-4 h-4 mr-2" />
                {t.reportProblem}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={onNavigateHome}
            className={`font-medium ${
              highContrastMode
                ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.homeButton}
          </Button>
        </div>
      </div>
    </div>
  );
}