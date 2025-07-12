import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CalendarDays, GitCommit, ArrowLeft, Bug, Sparkles, Zap, Shield, Globe, Info, Wifi } from "lucide-react";

interface VersionHistoryPageProps {
  language: 'ja' | 'ru' | 'en';
  onBack: () => void;
  highContrastMode?: boolean;
}

export default function VersionHistoryPage({ language, onBack, highContrastMode = false }: VersionHistoryPageProps) {
  const texts = {
    ja: {
      title: 'バージョン履歴',
      subtitle: 'KyaMovVM プロジェクトの更新履歴',
      backButton: '戻る',
      currentVersion: '現在のバージョン',
      releaseDate: 'リリース日',
      features: '新機能',
      bugfixes: 'バグ修正',
      improvements: '改善',
      security: 'セキュリティ',
      breaking: '重要な変更',
      note: '注意',
      performance: 'パフォーマンス'
    },
    ru: {
      title: 'История версий',
      subtitle: 'История обновлений проекта KyaMovVM',
      backButton: 'Назад',
      currentVersion: 'Текущая версия',
      releaseDate: 'Дата релиза',
      features: 'Новые функции',
      bugfixes: 'Исправления ошибок',
      improvements: 'Улучшения',
      security: 'Безопасность',
      breaking: 'Критические изменения',
      note: 'Примечание',
      performance: 'Производительность'
    },
    en: {
      title: 'Version History',
      subtitle: 'Update history of KyaMovVM project',
      backButton: 'Back',
      currentVersion: 'Current Version',
      releaseDate: 'Release Date',
      features: 'New Features',
      bugfixes: 'Bug Fixes',
      improvements: 'Improvements',
      security: 'Security',
      breaking: 'Breaking Changes',
      note: 'Note',
      performance: 'Performance'
    }
  };

  const t = texts[language];

  const versions = [
    {
      version: "v0.42",
      date: "2025-01-12",
      isCurrent: true,
      changes: {
        performance: [
          language === 'ja' ? '日本向けピング最適化（6-8秒の高ピング対応）' : language === 'ru' ? 'Оптимизация пинга для Японии (поддержка высокого пинга 6-8 сек)' : 'Japan Ping Optimization (6-8s high ping support)',
          language === 'ja' ? '接続速度ベースの自動最適化機能' : language === 'ru' ? 'Автоматическая оптимизация на основе скорости соединения' : 'Connection Speed-Based Auto Optimization',
          language === 'ja' ? 'クライアント側ピングテストの実装' : language === 'ru' ? 'Реализация клиентского пинг-теста' : 'Client-side Ping Test Implementation',
          language === 'ja' ? '日本のユーザー向け専用ローディングページ' : language === 'ru' ? 'Специальная страница загрузки для японских пользователей' : 'Dedicated Loading Page for Japanese Users'
        ],
        bugfixes: [
          language === 'ja' ? 'UML ページの背景とサイバーパンクテーマの復元' : language === 'ru' ? 'Восстановлен фон UML страницы и киберпанк тема' : 'UML Page Background and Cyberpunk Theme Restored',
          language === 'ja' ? '全言語（日本語、ロシア語、英語）の翻訳修正' : language === 'ru' ? 'Исправлены переводы для всех языков (японский, русский, английский)' : 'Fixed Translations for All Languages (Japanese, Russian, English)',
          language === 'ja' ? 'ナビゲーションメニューの翻訳一貫性の改善' : language === 'ru' ? 'Улучшена согласованность переводов навигационного меню' : 'Improved Navigation Menu Translation Consistency'
        ],
        improvements: [
          language === 'ja' ? '重いファイルの遅延読み込み（特に3D コンポーネント）' : language === 'ru' ? 'Отложенная загрузка тяжелых файлов (особенно 3D компонентов)' : 'Lazy Loading of Heavy Files (especially 3D components)',
          language === 'ja' ? 'より正確な接続速度検出アルゴリズム' : language === 'ru' ? 'Более точный алгоритм определения скорости соединения' : 'More Accurate Connection Speed Detection Algorithm',
          language === 'ja' ? '日本のタイムゾーンとブラウザ言語の検出改善' : language === 'ru' ? 'Улучшено определение японского часового пояса и языка браузера' : 'Enhanced Japanese Timezone and Browser Language Detection'
        ]
      }
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'features': return <Sparkles className="w-4 h-4" />;
      case 'bugfixes': return <Bug className="w-4 h-4" />;
      case 'improvements': return <Zap className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'breaking': return <Globe className="w-4 h-4" />;
      case 'performance': return <Wifi className="w-4 h-4" />;
      default: return <GitCommit className="w-4 h-4" />;
    }
  };

  const getChangeColor = (type: string) => {
    if (highContrastMode) return 'text-white';
    switch (type) {
      case 'features': return 'text-cyber-neon-green';
      case 'bugfixes': return 'text-cyber-pink';
      case 'improvements': return 'text-cyber-cyan';
      case 'security': return 'text-cyber-purple';
      case 'breaking': return 'text-cyber-electric-blue';
      case 'performance': return 'text-cyber-light-cyan';
      default: return 'text-cyber-cyan';
    }
  };

  return (
    <div className={`min-h-screen-safe px-4 py-8 ${
      highContrastMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      <div className="absolute inset-0 cyber-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className={`mb-6 font-medium ${
              highContrastMode
                ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backButton}
          </Button>
          
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple bg-clip-text text-transparent'
          }`}>
            {t.title}
          </h1>
          <p className={`text-lg font-medium ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* Current Version */}
        <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-300 border-2 border-cyber-cyan bg-cyber-dark-secondary/95 shadow-cyber-cyan/30 ring-2 ring-cyber-cyan/50 mb-8`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className="text-sm font-mono px-3 py-1 bg-cyber-cyan text-cyber-dark">
                  v0.42
                </Badge>
                <Badge variant="outline" className="text-xs border-cyber-neon-green text-cyber-neon-green">
                  {t.currentVersion}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-cyber-cyan/70">
                <CalendarDays className="w-4 h-4" />
                <span className="font-mono">2025-01-12</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {Object.entries(versions[0].changes).map(([changeType, changes]) => (
              <div key={changeType}>
                <h4 className={`flex items-center space-x-2 font-bold mb-3 ${getChangeColor(changeType)}`}>
                  {getChangeIcon(changeType)}
                  <span>{t[changeType as keyof typeof t] || changeType}</span>
                </h4>
                <ul className="space-y-2">
                  {changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start space-x-3 text-cyber-cyan/80">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-${getChangeColor(changeType).replace('text-', '')}`}></div>
                      <span className="font-medium">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Card className="backdrop-blur-sm border-cyber-purple/20 bg-cyber-dark-secondary/80">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 text-cyber-purple/80">
              <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  <strong>{t.note}:</strong> {
                    language === 'ja' 
                      ? 'v0.42では日本のユーザー向けに6-8秒のピング最適化、UML背景の復元、すべての言語翻訳の修正が追加されました。'
                      : language === 'ru'
                        ? 'В v0.42 добавлена оптимизация пинга 6-8 сек для японских пользователей, восстановлен фон UML и исправлены переводы всех языков.'
                        : 'v0.42 adds 6-8s ping optimization for Japanese users, UML background restoration, and fixed all language translations.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}