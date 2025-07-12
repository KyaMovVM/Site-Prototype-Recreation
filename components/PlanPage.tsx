import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Zap, 
  Target, 
  Rocket, 
  Brain,
  Database,
  Shield,
  Code,
  Users,
  Settings,
  GitBranch,
  Eye,
  Calendar,
  Star
} from "lucide-react";

interface PlanPageProps {
  language: 'ja' | 'ru' | 'en';
  isUmlOpen: boolean;
  setIsUmlOpen: (open: boolean) => void;
  highContrastMode?: boolean;
}

export default function PlanPage({ language, isUmlOpen, setIsUmlOpen, highContrastMode = false }: PlanPageProps) {
  const [activeTab, setActiveTab] = useState('roadmap');

  const texts = {
    ja: {
      title: '開発計画',
      subtitle: 'KyaMovVM プロジェクトのロードマップ',
      roadmap: 'ロードマップ',
      architecture: 'アーキテクチャ',
      features: '機能',
      timeline: 'タイムライン',
      phase1: 'フェーズ 1: 基盤',
      phase2: 'フェーズ 2: 開発',
      phase3: 'フェーズ 3: スケーリング',
      phase4: 'フェーズ 4: 最適化',
      completed: '完了',
      inProgress: '進行中',
      planned: '計画済み',
      coreInfrastructure: 'コア インフラストラクチャ',
      coreInfrastructureDesc: '基本システム アーキテクチャとコア コンポーネントのセットアップ',
      frontendDevelopment: 'フロントエンド開発',
      frontendDevelopmentDesc: 'React と Tailwind CSS を使用したユーザー インターフェイスの構築',
      databaseDesign: 'データベース設計',
      databaseDesignDesc: 'UML スキーマとデータベース構造の作成',
      apiIntegration: 'API 統合',
      apiIntegrationDesc: 'RESTful API とフロントエンド統合の開発',
      securityImplementation: 'セキュリティ実装',
      securityImplementationDesc: 'SSH 認証、MFA、セキュリティ システム',
      testingFramework: 'テスト フレームワーク',
      testingFrameworkDesc: '自動および手動システム テスト',
      performanceOptimization: 'パフォーマンス最適化',
      performanceOptimizationDesc: '速度と応答性の向上',
      scalabilityEnhancements: 'スケーラビリティ向上',
      scalabilityEnhancementsDesc: 'ロード増加とユーザー数増加への準備',
      architectureOverview: 'アーキテクチャ概要',
      architectureDesc: 'KyaMovVM は現代的なモジュラー アーキテクチャに基づいて構築されています',
      frontendLayer: 'フロントエンド レイヤー',
      backendLayer: 'バックエンド レイヤー',
      databaseLayer: 'データベース レイヤー',
      integrationLayer: '統合レイヤー',
      frontendLayerDesc: 'TypeScript、Tailwind CSS、shadcn/ui コンポーネントを使用した React 18',
      backendLayerDesc: 'Python + Django、RESTful API、認証システム',
      databaseLayerDesc: 'UML スキーマ、最適化されたクエリを備えた PostgreSQL',
      integrationLayerDesc: 'API 統合、外部サービス、監視',
      keyFeatures: '主要機能',
      userManagement: 'ユーザー管理',
      dataVisualization: 'データ視覚化',
      realTimeMonitoring: 'リアルタイム監視',
      cloudIntegration: 'クラウド統合',
      userManagementDesc: 'ロールと権限を備えた完全なユーザー管理システム',
      dataVisualizationDesc: 'データ分析のためのインタラクティブなチャートと図表',
      realTimeMonitoringDesc: '通知付きリアルタイム システム監視',
      cloudIntegrationDesc: 'クラウド サービスと API との統合',
      currentQuarter: '現在の四半期',
      nextQuarter: '次の四半期',
      futureQuarters: '将来の四半期',
      viewUML: 'UML スキーマを表示'
    },
    ru: {
      title: 'План Разработки',
      subtitle: 'Дорожная карта проекта KyaMovVM',
      roadmap: 'Дорожная карта',
      architecture: 'Архитектура',
      features: 'Функции',
      timeline: 'Временная шкала',
      phase1: 'Фаза 1: Основы',
      phase2: 'Фаза 2: Развитие',
      phase3: 'Фаза 3: Масштабирование',
      phase4: 'Фаза 4: Оптимизация',
      completed: 'Завершено',
      inProgress: 'В процессе',
      planned: 'Запланировано',
      coreInfrastructure: 'Базовая инфраструктура',
      coreInfrastructureDesc: 'Настройка базовой архитектуры системы и основных компонентов',
      frontendDevelopment: 'Разработка Frontend',
      frontendDevelopmentDesc: 'Создание пользовательского интерфейса на React с Tailwind CSS',
      databaseDesign: 'Проектирование БД',
      databaseDesignDesc: 'Создание UML схемы и структуры базы данных',
      apiIntegration: 'Интеграция API',
      apiIntegrationDesc: 'Разработка RESTful API и интеграция с frontend',
      securityImplementation: 'Реализация безопасности',
      securityImplementationDesc: 'SSH аутентификация, MFA и системы защиты',
      testingFramework: 'Тестовый фреймворк',
      testingFrameworkDesc: 'Автоматическое и ручное тестирование системы',
      performanceOptimization: 'Оптимизация производительности',
      performanceOptimizationDesc: 'Улучшение скорости работы и отзывчивости',
      scalabilityEnhancements: 'Улучшения масштабируемости',
      scalabilityEnhancementsDesc: 'Подготовка к росту нагрузки и пользователей',
      architectureOverview: 'Обзор архитектуры',
      architectureDesc: 'KyaMovVM построен на современной модульной архитектуре',
      frontendLayer: 'Frontend слой',
      backendLayer: 'Backend слой',
      databaseLayer: 'Слой БД',
      integrationLayer: 'Слой интеграции',
      frontendLayerDesc: 'React 18 с TypeScript, Tailwind CSS, компоненты shadcn/ui',
      backendLayerDesc: 'Python + Django, RESTful API, система аутентификации',
      databaseLayerDesc: 'PostgreSQL с UML схемой, оптимизированные запросы',
      integrationLayerDesc: 'API интеграции, внешние сервисы, мониторинг',
      keyFeatures: 'Ключевые функции',
      userManagement: 'Управление пользователями',
      dataVisualization: 'Визуализация данных',
      realTimeMonitoring: 'Мониторинг в реальном времени',
      cloudIntegration: 'Облачная интеграция',
      userManagementDesc: 'Полная система управления пользователями с ролями и правами',
      dataVisualizationDesc: 'Интерактивные графики и диаграммы для анализа данных',
      realTimeMonitoringDesc: 'Мониторинг системы в реальном времени с уведомлениями',
      cloudIntegrationDesc: 'Интеграция с облачными сервисами и API',
      currentQuarter: 'Текущий квартал',
      nextQuarter: 'Следующий квартал',
      futureQuarters: 'Будущие кварталы',
      viewUML: 'Посмотреть UML схему'
    },
    en: {
      title: 'Development Plan',
      subtitle: 'KyaMovVM project roadmap',
      roadmap: 'Roadmap',
      architecture: 'Architecture',
      features: 'Features',
      timeline: 'Timeline',
      phase1: 'Phase 1: Foundation',
      phase2: 'Phase 2: Development',
      phase3: 'Phase 3: Scaling',
      phase4: 'Phase 4: Optimization',
      completed: 'Completed',
      inProgress: 'In Progress',
      planned: 'Planned',
      coreInfrastructure: 'Core Infrastructure',
      coreInfrastructureDesc: 'Setting up basic system architecture and core components',
      frontendDevelopment: 'Frontend Development',
      frontendDevelopmentDesc: 'Building user interface with React and Tailwind CSS',
      databaseDesign: 'Database Design',
      databaseDesignDesc: 'Creating UML schema and database structure',
      apiIntegration: 'API Integration',
      apiIntegrationDesc: 'Developing RESTful API and frontend integration',
      securityImplementation: 'Security Implementation',
      securityImplementationDesc: 'SSH authentication, MFA and security systems',
      testingFramework: 'Testing Framework',
      testingFrameworkDesc: 'Automated and manual system testing',
      performanceOptimization: 'Performance Optimization',
      performanceOptimizationDesc: 'Improving speed and responsiveness',
      scalabilityEnhancements: 'Scalability Enhancements',
      scalabilityEnhancementsDesc: 'Preparing for load growth and users',
      architectureOverview: 'Architecture Overview',
      architectureDesc: 'KyaMovVM is built on modern modular architecture',
      frontendLayer: 'Frontend Layer',
      backendLayer: 'Backend Layer',
      databaseLayer: 'Database Layer',
      integrationLayer: 'Integration Layer',
      frontendLayerDesc: 'React 18 with TypeScript, Tailwind CSS, shadcn/ui components',
      backendLayerDesc: 'Python + Django, RESTful API, authentication system',
      databaseLayerDesc: 'PostgreSQL with UML schema, optimized queries',
      integrationLayerDesc: 'API integrations, external services, monitoring',
      keyFeatures: 'Key Features',
      userManagement: 'User Management',
      dataVisualization: 'Data Visualization',
      realTimeMonitoring: 'Real-time Monitoring',
      cloudIntegration: 'Cloud Integration',
      userManagementDesc: 'Complete user management system with roles and permissions',
      dataVisualizationDesc: 'Interactive charts and diagrams for data analysis',
      realTimeMonitoringDesc: 'Real-time system monitoring with notifications',
      cloudIntegrationDesc: 'Integration with cloud services and APIs',
      currentQuarter: 'Current Quarter',
      nextQuarter: 'Next Quarter',
      futureQuarters: 'Future Quarters',
      viewUML: 'View UML Schema'
    }
  };

  const t = texts[language];

  const roadmapItems = [
    {
      phase: t.phase1,
      status: 'completed' as const,
      items: [
        { name: t.coreInfrastructure, description: t.coreInfrastructureDesc, status: 'completed' as const },
        { name: t.frontendDevelopment, description: t.frontendDevelopmentDesc, status: 'completed' as const },
        { name: t.databaseDesign, description: t.databaseDesignDesc, status: 'completed' as const },
      ]
    },
    {
      phase: t.phase2,
      status: 'inProgress' as const,
      items: [
        { name: t.apiIntegration, description: t.apiIntegrationDesc, status: 'inProgress' as const },
        { name: t.securityImplementation, description: t.securityImplementationDesc, status: 'inProgress' as const },
        { name: t.testingFramework, description: t.testingFrameworkDesc, status: 'planned' as const },
      ]
    },
    {
      phase: t.phase3,
      status: 'planned' as const,
      items: [
        { name: t.performanceOptimization, description: t.performanceOptimizationDesc, status: 'planned' as const },
        { name: t.scalabilityEnhancements, description: t.scalabilityEnhancementsDesc, status: 'planned' as const },
      ]
    }
  ];

  const architectureLayers = [
    {
      name: t.frontendLayer,
      description: t.frontendLayerDesc,
      icon: Code,
      color: 'cyber-cyan'
    },
    {
      name: t.backendLayer,
      description: t.backendLayerDesc,
      icon: Settings,
      color: 'cyber-pink'
    },
    {
      name: t.databaseLayer,
      description: t.databaseLayerDesc,
      icon: Database,
      color: 'cyber-purple'
    },
    {
      name: t.integrationLayer,
      description: t.integrationLayerDesc,
      icon: GitBranch,
      color: 'cyber-neon-green'
    }
  ];

  const keyFeatures = [
    {
      name: t.userManagement,
      description: t.userManagementDesc,
      icon: Users,
      color: 'cyber-cyan',
      priority: 'high' as const
    },
    {
      name: t.dataVisualization,
      description: t.dataVisualizationDesc,
      icon: Target,
      color: 'cyber-pink',
      priority: 'high' as const
    },
    {
      name: t.realTimeMonitoring,
      description: t.realTimeMonitoringDesc,
      icon: Zap,
      color: 'cyber-purple',
      priority: 'medium' as const
    },
    {
      name: t.cloudIntegration,
      description: t.cloudIntegrationDesc,
      icon: Rocket,
      color: 'cyber-neon-green',
      priority: 'medium' as const
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'inProgress':
        return 'text-yellow-500';
      case 'planned':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'planned':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
          <p className={`text-xl font-medium max-w-3xl mx-auto ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            onClick={() => setIsUmlOpen(true)}
            className={`font-bold ${
              highContrastMode
                ? 'bg-white text-black hover:bg-gray-200 border-4 border-white shadow-xl'
                : 'bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:from-cyber-purple/80 hover:to-cyber-cyan/80 text-white border-0'
            }`}
          >
            <Database className="w-4 h-4 mr-2" />
            {t.viewUML}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-4 mb-8 p-2 ${
            highContrastMode
              ? 'bg-black border-4 border-white shadow-2xl'
              : 'bg-cyber-dark-secondary/50 border-2 border-cyber-cyan/30 shadow-xl shadow-cyber-cyan/10'
          }`}>
            <TabsTrigger 
              value="roadmap" 
              className={`font-bold transition-all duration-300 py-3 px-4 ${
                highContrastMode
                  ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                  : 'text-cyber-cyan/80 data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-dark hover:bg-cyber-cyan/20 border border-transparent data-[state=active]:border-cyber-cyan/50'
              }`}
            >
              {t.roadmap}
            </TabsTrigger>
            <TabsTrigger 
              value="architecture" 
              className={`font-bold transition-all duration-300 py-3 px-4 ${
                highContrastMode
                  ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                  : 'text-cyber-cyan/80 data-[state=active]:bg-cyber-pink data-[state=active]:text-cyber-dark hover:bg-cyber-pink/20 border border-transparent data-[state=active]:border-cyber-pink/50'
              }`}
            >
              {t.architecture}
            </TabsTrigger>
            <TabsTrigger 
              value="features" 
              className={`font-bold transition-all duration-300 py-3 px-4 ${
                highContrastMode
                  ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                  : 'text-cyber-cyan/80 data-[state=active]:bg-cyber-purple data-[state=active]:text-cyber-dark hover:bg-cyber-purple/20 border border-transparent data-[state=active]:border-cyber-purple/50'
              }`}
            >
              {t.features}
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className={`font-bold transition-all duration-300 py-3 px-4 ${
                highContrastMode
                  ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                  : 'text-cyber-cyan/80 data-[state=active]:bg-cyber-neon-green data-[state=active]:text-cyber-dark hover:bg-cyber-neon-green/20 border border-transparent data-[state=active]:border-cyber-neon-green/50'
              }`}
            >
              {t.timeline}
            </TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            <div className="space-y-8">
              {roadmapItems.map((phase, phaseIndex) => (
                <Card key={phaseIndex} className={`backdrop-blur-sm shadow-2xl ${
                  highContrastMode
                    ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                    : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`font-bold flex items-center space-x-3 ${
                        highContrastMode ? 'text-white' : 'text-cyber-cyan'
                      }`}>
                        {getStatusIcon(phase.status)}
                        <span>{phase.phase}</span>
                      </CardTitle>
                      <Badge className={`font-bold ${
                        phase.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : phase.status === 'inProgress'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        {phase.status === 'completed' ? t.completed 
                         : phase.status === 'inProgress' ? t.inProgress 
                         : t.planned}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={`p-4 rounded-lg border ${
                          highContrastMode
                            ? 'bg-gray-800 border-white/40'
                            : 'bg-cyber-dark/50 border-cyber-cyan/20'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(item.status)}
                              <h4 className={`font-bold ${
                                highContrastMode ? 'text-white' : 'text-cyber-cyan'
                              }`}>
                                {item.name}
                              </h4>
                            </div>
                            <Badge variant="outline" className={`text-xs ${getStatusColor(item.status)} ${
                              highContrastMode ? 'border-white/30' : 'border-current'
                            }`}>
                              {item.status === 'completed' ? t.completed 
                               : item.status === 'inProgress' ? t.inProgress 
                               : t.planned}
                            </Badge>
                          </div>
                          <p className={`text-sm ${
                            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold text-center ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  {t.architectureOverview}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-center mb-8 font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
                }`}>
                  {t.architectureDesc}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {architectureLayers.map((layer, index) => (
                    <Card key={index} className={`border ${
                      highContrastMode
                        ? 'border-white/40 bg-gray-800'
                        : `border-${layer.color}/20 bg-cyber-dark/50`
                    }`}>
                      <CardHeader className="text-center">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          highContrastMode
                            ? 'bg-gray-700'
                            : `bg-${layer.color}/20`
                        }`}>
                          <layer.icon className={`w-6 h-6 ${
                            highContrastMode ? 'text-white' : `text-${layer.color}`
                          }`} />
                        </div>
                        <CardTitle className={`font-bold ${
                          highContrastMode ? 'text-white' : `text-${layer.color}`
                        }`}>
                          {layer.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-sm text-center ${
                          highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
                        }`}>
                          {layer.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => setIsUmlOpen(true)}
                    variant="outline"
                    className={`font-bold ${
                      highContrastMode
                        ? 'border-4 border-white text-white hover:bg-white hover:text-black shadow-lg'
                        : 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10'
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t.viewUML}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card className={`backdrop-blur-sm shadow-2xl ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold text-center ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`}>
                  {t.keyFeatures}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {keyFeatures.map((feature, index) => (
                    <Card key={index} className={`border transition-all duration-300 hover:scale-105 ${
                      highContrastMode
                        ? 'border-white/40 bg-gray-800 hover:bg-gray-700/90'
                        : `border-${feature.color}/20 bg-cyber-dark/50 hover:shadow-${feature.color}/20`
                    }`}>
                      <CardHeader className="text-center">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                          highContrastMode
                            ? 'bg-gray-700'
                            : `bg-${feature.color}/20`
                        }`}>
                          <feature.icon className={`w-6 h-6 ${
                            highContrastMode ? 'text-white' : `text-${feature.color}`
                          }`} />
                        </div>
                        <CardTitle className={`font-bold ${
                          highContrastMode ? 'text-white' : `text-${feature.color}`
                        }`}>
                          {feature.name}
                        </CardTitle>
                        <Badge className={`w-fit mx-auto ${getPriorityColor(feature.priority)}`}>
                          {feature.priority.toUpperCase()}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-sm text-center ${
                          highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
                        }`}>
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className={`backdrop-blur-sm shadow-2xl ${
                highContrastMode
                  ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                  : 'border-cyber-neon-green/30 bg-cyber-dark-secondary/90 shadow-green-500/20'
              }`}>
                <CardHeader>
                  <CardTitle className={`font-bold text-center flex items-center justify-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-neon-green'
                  }`}>
                    <Calendar className="w-5 h-5" />
                    <span>{t.currentQuarter}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          Frontend UI
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? 'メイン インターフェイス完了' : language === 'ru' ? 'Основной интерфейс готов' : 'Main interface ready'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          API Integration
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? '開発中' : language === 'ru' ? 'В процессе разработки' : 'In development'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`backdrop-blur-sm shadow-2xl ${
                highContrastMode
                  ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                  : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
              }`}>
                <CardHeader>
                  <CardTitle className={`font-bold text-center flex items-center justify-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    <Star className="w-5 h-5" />
                    <span>{t.nextQuarter}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          Security System
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? 'SSH と MFA 認証' : language === 'ru' ? 'SSH и MFA аутентификация' : 'SSH and MFA authentication'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          Testing Framework
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? '自動テスト' : language === 'ru' ? 'Автоматическое тестирование' : 'Automated testing'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`backdrop-blur-sm shadow-2xl ${
                highContrastMode
                  ? 'border-4 border-white bg-gray-900/90 shadow-xl'
                  : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20'
              }`}>
                <CardHeader>
                  <CardTitle className={`font-bold text-center flex items-center justify-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-pink'
                  }`}>
                    <Rocket className="w-5 h-5" />
                    <span>{t.futureQuarters}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          Performance
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? 'パフォーマンス最適化' : language === 'ru' ? 'Оптимизация производительности' : 'Performance optimization'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      highContrastMode ? 'bg-gray-800' : 'bg-cyber-dark/50'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className={`font-medium text-sm ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          Scalability
                        </span>
                      </div>
                      <p className={`text-xs ${
                        highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/60'
                      }`}>
                        {language === 'ja' ? 'システム スケーリング' : language === 'ru' ? 'Масштабирование системы' : 'System scaling'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}