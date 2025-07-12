import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Book, 
  Code, 
  Server, 
  Shield, 
  Database,
  FileText,
  ExternalLink,
  GitBranch,
  Settings
} from "lucide-react";
import UMLModal from "./UMLModal";

interface DocumentationPageProps {
  language: 'ja' | 'ru' | 'en';
  isUmlOpen: boolean;
  setIsUmlOpen: (open: boolean) => void;
  highContrastMode?: boolean;
}

export default function DocumentationPage({ language, isUmlOpen, setIsUmlOpen, highContrastMode = false }: DocumentationPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const texts = {
    ja: {
      title: 'ドキュメント',
      subtitle: 'KyaMovVM プロジェクトの完全なドキュメント',
      overview: '概要',
      architecture: 'アーキテクチャ',
      api: 'API',
      deployment: 'デプロイメント',
      projectOverview: 'プロジェクト概要',
      projectDesc: 'KyaMovVM は、Web インターフェイスと管理システムを備えた現代開発のための革新的な仮想マシンです。',
      keyFeatures: '主要機能',
      technologies: '技術',
      gettingStarted: '始め方',
      prerequisites: '前提条件',
      installation: 'インストール',
      configuration: '設定',
      systemArchitecture: 'システム アーキテクチャ',
      databaseSchema: 'データベース スキーマ',
      viewSchema: 'スキーマを表示',
      components: 'コンポーネント',
      frontend: 'フロントエンド',
      backend: 'バックエンド',
      database: 'データベース',
      apiEndpoints: 'API エンドポイント',
      authentication: '認証',
      dataModels: 'データ モデル',
      deploymentGuide: 'デプロイメント ガイド',
      requirements: '要件',
      dockerSetup: 'Docker セットアップ',
      production: 'プロダクション',
      monitoring: 'モニタリング'
    },
    ru: {
      title: 'Документация',
      subtitle: 'Полная документация проекта KyaMovVM',
      overview: 'Обзор',
      architecture: 'Архитектура',
      api: 'API',
      deployment: 'Развертывание',
      projectOverview: 'Обзор проекта',
      projectDesc: 'KyaMovVM - это инновационная виртуальная машина для современной разработки с веб-интерфейсом и системой управления.',
      keyFeatures: 'Ключевые особенности',
      technologies: 'Технологии',
      gettingStarted: 'Начало работы',
      prerequisites: 'Предварительные требования',
      installation: 'Установка',
      configuration: 'Конфигурация',
      systemArchitecture: 'Архитектура системы',
      databaseSchema: 'Схема базы данных',
      viewSchema: 'Посмотреть схему',
      components: 'Компоненты',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'База данных',
      apiEndpoints: 'API конечные точки',
      authentication: 'Аутентификация',
      dataModels: 'Модели данных',
      deploymentGuide: 'Руководство по развертыванию',
      requirements: 'Требования',
      dockerSetup: 'Настройка Docker',
      production: 'Продакшн',
      monitoring: 'Мониторинг'
    },
    en: {
      title: 'Documentation',
      subtitle: 'Complete documentation for KyaMovVM project',
      overview: 'Overview',
      architecture: 'Architecture',
      api: 'API',
      deployment: 'Deployment',
      projectOverview: 'Project Overview',
      projectDesc: 'KyaMovVM is an innovative virtual machine for modern development with web interface and management system.',
      keyFeatures: 'Key Features',
      technologies: 'Technologies',
      gettingStarted: 'Getting Started',
      prerequisites: 'Prerequisites',
      installation: 'Installation',
      configuration: 'Configuration',
      systemArchitecture: 'System Architecture',
      databaseSchema: 'Database Schema',
      viewSchema: 'View Schema',
      components: 'Components',
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      apiEndpoints: 'API Endpoints',
      authentication: 'Authentication',
      dataModels: 'Data Models',
      deploymentGuide: 'Deployment Guide',
      requirements: 'Requirements',
      dockerSetup: 'Docker Setup',
      production: 'Production',
      monitoring: 'Monitoring'
    }
  };

  const t = texts[language];

  const features = [
    {
      icon: Code,
      title: 'React + TypeScript',
      description: language === 'ja' ? 'TypeScript を使用した現代的な React フロントエンド' : language === 'ru' ? 'Современный frontend на React с TypeScript' : 'Modern React frontend with TypeScript'
    },
    {
      icon: Database,
      title: language === 'ja' ? 'データベース' : language === 'ru' ? 'База данных' : 'Database',
      description: language === 'ja' ? 'UML スキーマを備えたリレーショナル DB' : language === 'ru' ? 'Реляционная БД с UML схемой' : 'Relational database with UML schema'
    },
    {
      icon: Shield,
      title: language === 'ja' ? 'セキュリティ' : language === 'ru' ? 'Безопасность' : 'Security',
      description: language === 'ja' ? 'SSH 認証と MFA' : language === 'ru' ? 'SSH аутентификация и MFA' : 'SSH authentication and MFA'
    },
    {
      icon: Server,
      title: language === 'ja' ? 'API 統合' : language === 'ru' ? 'API интеграция' : 'API Integration',
      description: language === 'ja' ? 'Python バックエンドを備えた RESTful API' : language === 'ru' ? 'RESTful API с Python backend' : 'RESTful API with Python backend'
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/users',
      description: language === 'ja' ? 'ユーザー リストを取得' : language === 'ru' ? 'Получить список пользователей' : 'Get users list',
      auth: true
    },
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: language === 'ja' ? 'ユーザー認証' : language === 'ru' ? 'Аутентификация пользователя' : 'User authentication',
      auth: false
    },
    {
      method: 'GET',
      endpoint: '/api/movies',
      description: language === 'ja' ? '映画リストを取得' : language === 'ru' ? 'Получить список фильмов' : 'Get movies list',
      auth: true
    },
    {
      method: 'GET',
      endpoint: '/api/schema',
      description: language === 'ja' ? 'UML データベース スキーマを取得' : language === 'ru' ? 'Получить UML схему БД' : 'Get UML database schema',
      auth: true
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'POST': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className={`min-h-screen-safe px-4 py-8 ${
      highContrastMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      <div className="absolute inset-0 cyber-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-6xl font-black mb-4 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple bg-clip-text text-transparent cyber-neon'
          }`}>
            {t.title}
          </h1>
          <p className={`text-xl font-medium max-w-3xl mx-auto mb-6 ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setIsUmlOpen(true)}
              className={`font-bold ${
                highContrastMode
                  ? 'bg-white text-black hover:bg-gray-200 border-4 border-white shadow-xl'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:from-cyber-cyan/80 hover:to-cyber-pink/80 text-white border-0'
              }`}
            >
              <Database className="w-4 h-4 mr-2" />
              {t.viewSchema}
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-4 mb-8 p-2 ${
            highContrastMode
              ? 'bg-black border-4 border-white shadow-2xl'
              : 'bg-cyber-dark-secondary/50 border-2 border-cyber-cyan/30 shadow-xl shadow-cyber-cyan/10'
          }`}>
            {['overview', 'architecture', 'api', 'deployment'].map((tab, index) => (
              <TabsTrigger 
                key={tab}
                value={tab}
                className={`font-bold transition-all duration-300 py-3 px-4 ${
                  highContrastMode
                    ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                    : `text-cyber-cyan/80 data-[state=active]:bg-${index === 0 ? 'cyber-cyan' : index === 1 ? 'cyber-pink' : index === 2 ? 'cyber-purple' : 'cyber-neon-green'} data-[state=active]:text-cyber-dark hover:bg-${index === 0 ? 'cyber-cyan' : index === 1 ? 'cyber-pink' : index === 2 ? 'cyber-purple' : 'cyber-neon-green'}/20 border border-transparent data-[state=active]:border-${index === 0 ? 'cyber-cyan' : index === 1 ? 'cyber-pink' : index === 2 ? 'cyber-purple' : 'cyber-neon-green'}/50`
                }`}
              >
                {t[tab as keyof typeof t]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold text-center flex items-center justify-center space-x-2 ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  <Book className="w-6 h-6" />
                  <span>{t.projectOverview}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium text-center mb-8 ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {t.projectDesc}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`font-bold text-xl mb-4 ${
                      highContrastMode ? 'text-white' : 'text-cyber-pink'
                    }`}>
                      {t.keyFeatures}
                    </h3>
                    <div className="space-y-4">
                      {features.map((feature, index) => (
                        <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                          highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                        }`}>
                          <feature.icon className={`w-6 h-6 flex-shrink-0 mt-1 ${
                            highContrastMode ? 'text-white' : 'text-cyber-cyan'
                          }`} />
                          <div>
                            <h4 className={`font-bold ${
                              highContrastMode ? 'text-white' : 'text-cyber-cyan'
                            }`}>
                              {feature.title}
                            </h4>
                            <p className={`text-sm ${
                              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
                            }`}>
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-bold text-xl mb-4 ${
                      highContrastMode ? 'text-white' : 'text-cyber-pink'
                    }`}>
                      {t.technologies}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['React 18', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Python', 'Django', 'PostgreSQL', 'Docker'].map((tech, index) => (
                        <Badge key={index} variant="outline" className={`w-full justify-center py-2 ${
                          highContrastMode
                            ? 'border-white text-white'
                            : 'border-cyber-cyan/30 text-cyber-cyan'
                        }`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold text-center ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`}>
                  {t.apiEndpoints}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      highContrastMode
                        ? 'bg-gray-800 border-white/40'
                        : 'bg-cyber-dark/50 border-cyber-purple/20'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                          <code className={`font-mono ${
                            highContrastMode ? 'text-white' : 'text-cyber-cyan'
                          }`}>
                            {endpoint.endpoint}
                          </code>
                        </div>
                        {endpoint.auth && (
                          <Badge variant="outline" className={`text-xs ${
                            highContrastMode ? 'border-white text-white' : 'border-yellow-500/30 text-yellow-500'
                          }`}>
                            {language === 'ja' ? '認証必要' : language === 'ru' ? 'Требует авторизации' : 'Auth Required'}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
                      }`}>
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture and Deployment tabs with basic content */}
          <TabsContent value="architecture">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20'
            }`}>
              <CardContent className="p-8 text-center">
                <h3 className={`text-2xl font-bold mb-4 ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  {t.systemArchitecture}
                </h3>
                <p className={`${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
                }`}>
                  {language === 'ja' ? 'アーキテクチャの詳細はまもなく追加されます。' : language === 'ru' ? 'Детали архитектуры будут добавлены в ближайшее время.' : 'Architecture details coming soon.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-neon-green/30 bg-cyber-dark-secondary/90 shadow-green-500/20'
            }`}>
              <CardContent className="p-8 text-center">
                <h3 className={`text-2xl font-bold mb-4 ${
                  highContrastMode ? 'text-white' : 'text-cyber-neon-green'
                }`}>
                  {t.deploymentGuide}
                </h3>
                <p className={`${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-neon-green/80'
                }`}>
                  {language === 'ja' ? 'デプロイメント ガイドはまもなく追加されます。' : language === 'ru' ? 'Руководство по развертыванию будет добавлено в ближайшее время.' : 'Deployment guide coming soon.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}