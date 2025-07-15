// @ts-nocheck
import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Maximize2, Minimize2, Download, Search, Database, Grid3X3, Layers, Code2 } from "lucide-react";
import UMLModal from "./UMLModal";
import Uml from "../imports/Uml";

interface UMLPageProps {
  language: 'ja' | 'ru' | 'en';
  isUmlOpen: boolean;
  setIsUmlOpen: (open: boolean) => void;
  highContrastMode?: boolean;
}

export default function UMLPage({ language, isUmlOpen, setIsUmlOpen, highContrastMode = false }: UMLPageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const texts = {
    ja: {
      title: 'UML データベース スキーマ',
      subtitle: 'KyaMovVM プロジェクトの完全なデータベース構造',
      description: 'この図は、KyaMovVM プロジェクトで使用される PostgreSQL データベースの完全な構造を示しています。テーブル間の関係、主キー、外部キー、およびデータ型が含まれています。',
      backButton: 'ホームに戻る',
      fullscreen: 'フルスクリーン',
      exitFullscreen: 'フルスクリーン終了',
      downloadSchema: 'スキーマをダウンロード',
      searchPlaceholder: 'テーブルまたはフィールドを検索...',
      features: {
        comprehensive: '包括的な設計',
        comprehensiveDesc: 'すべてのテーブル、関係、制約を完全に可視化',
        interactive: 'インタラクティブ',
        interactiveDesc: 'ズーム、パン、検索機能付きの動的表示',
        exportable: 'エクスポート可能',
        exportableDesc: 'PNG、SVG、SQL形式でダウンロード可能'
      },
      tables: {
        users: 'ユーザー',
        movies: '映画',
        genres: 'ジャンル',
        crew: 'スタッフ',
        favorites: 'お気に入り',
        distributions: '配信'
      },
      zoomInstructions: 'スクロールでズーム、ドラッグで移動'
    },
    ru: {
      title: 'UML Схема базы данных',
      subtitle: 'Полная структура базы данных проекта KyaMovVM',
      description: 'Эта диаграмма показывает полную структуру базы данных PostgreSQL, используемой в проекте KyaMovVM. Включает отношения между таблицами, первичные и внешние ключи, а также типы данных.',
      backButton: 'Вернуться домой',
      fullscreen: 'Полный экран',
      exitFullscreen: 'Выйти из полного экрана',
      downloadSchema: 'Скачать схему',
      searchPlaceholder: 'Поиск таблиц или полей...',
      features: {
        comprehensive: 'Всеобъемлющий дизайн',
        comprehensiveDesc: 'Полная визуализация всех таблиц, отношений и ограничений',
        interactive: 'Интерактивный',
        interactiveDesc: 'Динамический просмотр с функциями масштабирования, панорамирования и поиска',
        exportable: 'Экспортируемый',
        exportableDesc: 'Возможность скачивания в форматах PNG, SVG, SQL'
      },
      tables: {
        users: 'Пользователи',
        movies: 'Фильмы',
        genres: 'Жанры',
        crew: 'Персонал',
        favorites: 'Избранное',
        distributions: 'Дистрибуция'
      },
      zoomInstructions: 'Прокрутите для масштабирования, перетащите для перемещения'
    },
    en: {
      title: 'UML Database Schema',
      subtitle: 'Complete database structure of KyaMovVM project',
      description: 'This diagram shows the complete structure of the PostgreSQL database used in the KyaMovVM project. It includes relationships between tables, primary and foreign keys, and data types.',
      backButton: 'Back to Home',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      downloadSchema: 'Download Schema',
      searchPlaceholder: 'Search tables or fields...',
      features: {
        comprehensive: 'Comprehensive Design',
        comprehensiveDesc: 'Complete visualization of all tables, relationships, and constraints',
        interactive: 'Interactive',
        interactiveDesc: 'Dynamic viewing with zoom, pan, and search capabilities',
        exportable: 'Exportable',
        exportableDesc: 'Downloadable in PNG, SVG, SQL formats'
      },
      tables: {
        users: 'Users',
        movies: 'Movies',
        genres: 'Genres',
        crew: 'Crew',
        favorites: 'Favorites',
        distributions: 'Distributions'
      },
      zoomInstructions: 'Scroll to zoom, drag to move'
    }
  };

  const t = texts[language];

  const handleDownload = () => {
    // Create a simple schema text file
    const schemaContent = `
KyaMovVM Database Schema
=======================

Users Table:
- user_id (Primary Key)
- username
- email
- password_hash
- created_at
- updated_at

Movies Table:
- movie_id (Primary Key)
- title
- description
- release_date
- duration
- genre_id (Foreign Key)

Genres Table:
- genre_id (Primary Key)
- genre_name
- description

Crew Table:
- crew_id (Primary Key)
- movie_id (Foreign Key)
- person_name
- role
- character_name

Favorites Table:
- favorite_id (Primary Key)
- user_id (Foreign Key)
- movie_id (Foreign Key)
- added_at

Distributions Table:
- distribution_id (Primary Key)
- movie_id (Foreign Key)
- platform
- release_date
- region
`;

    const blob = new Blob([schemaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kyamovvm-database-schema.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navigateToHome = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-home'));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`min-h-screen-safe ${
      highContrastMode 
        ? 'bg-black text-white' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      {/* Restored Cyberpunk Background */}
      <div className="absolute inset-0 cyber-bg-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark"></div>
        <div className="cyber-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-cyan/10"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={navigateToHome}
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
          <p className={`text-lg max-w-3xl font-medium ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              highContrastMode ? 'text-gray-400' : 'text-cyber-cyan/60'
            }`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                highContrastMode
                  ? 'bg-gray-800 border-white/20 text-white focus:ring-white'
                  : 'bg-cyber-dark-secondary/50 border-cyber-cyan/30 text-cyber-cyan focus:ring-cyber-cyan'
              }`}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={toggleFullscreen}
              className={`font-medium ${
                highContrastMode
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
              }`}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 mr-2" />
                  {t.exitFullscreen}
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {t.fullscreen}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className={`font-medium ${
                highContrastMode
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/10'
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              {t.downloadSchema}
            </Button>
          </div>
        </div>

        {/* Main UML Container */}
        <Card className={`backdrop-blur-sm shadow-2xl mb-8 overflow-hidden ${
          highContrastMode
            ? 'border-4 border-white bg-gray-900/90'
            : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
        } ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
          <CardHeader className="flex-shrink-0">
            <CardTitle className={`text-center font-bold flex items-center justify-center space-x-2 ${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              <Database className="w-6 h-6" />
              <span>{t.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 overflow-hidden">
            {/* UML Container - Single scroll container */}
            <div className={`relative w-full ${isFullscreen ? 'h-[80vh]' : 'h-[70vh]'} bg-white rounded-lg border-2 ${
              highContrastMode 
                ? 'border-white bg-white'
                : 'border-cyber-cyan/20 bg-white'
            }`}>
              {/* Zoom Instructions */}
              <div className={`absolute top-2 right-2 z-10 px-3 py-1.5 rounded-md text-xs font-medium ${
                highContrastMode
                  ? 'bg-black/80 text-white border border-white/30'
                  : 'bg-cyber-dark/80 text-cyber-cyan border border-cyber-cyan/30'
              }`}>
                {t.zoomInstructions}
              </div>

              {/* UML Diagram - Single container with proper overflow */}
              <div className="uml-page-diagram w-full h-full overflow-auto p-4">
                <div className="w-max min-w-full min-h-full flex items-center justify-center">
                  <Uml />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90'
              : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20 hover:shadow-cyber-cyan/30'
          }`}>
            <CardHeader>
              <CardTitle className={`font-bold flex items-center justify-center space-x-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                <Grid3X3 className="w-5 h-5" />
                <span>{t.features.comprehensive}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`font-medium ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
              }`}>
                {t.features.comprehensiveDesc}
              </p>
            </CardContent>
          </Card>
          
          <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90'
              : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20 hover:shadow-cyber-pink/30'
          }`}>
            <CardHeader>
              <CardTitle className={`font-bold flex items-center justify-center space-x-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-pink'
              }`}>
                <Layers className="w-5 h-5" />
                <span>{t.features.interactive}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`font-medium ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
              }`}>
                {t.features.interactiveDesc}
              </p>
            </CardContent>
          </Card>
          
          <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90'
              : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20 hover:shadow-cyber-purple/30'
          }`}>
            <CardHeader>
              <CardTitle className={`font-bold flex items-center justify-center space-x-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-purple'
              }`}>
                <Code2 className="w-5 h-5" />
                <span>{t.features.exportable}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`font-medium ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
              }`}>
                {t.features.exportableDesc}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className={`backdrop-blur-sm shadow-2xl ${
          highContrastMode
            ? 'border-4 border-white bg-gray-900/90'
            : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
        }`}>
          <CardContent className="p-6">
            <p className={`leading-relaxed font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/90'
            }`}>
              {t.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* UML Modal */}
      <UMLModal 
        isOpen={isUmlOpen} 
        onClose={() => setIsUmlOpen(false)} 
        language={language} 
        highContrastMode={highContrastMode}
      />
    </div>
  );
}