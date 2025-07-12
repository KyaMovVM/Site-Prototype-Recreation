import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  Database,
  TestTube,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Zap,
  CheckSquare,
  X
} from "lucide-react";

interface ManualTestsPageProps {
  language: 'ja' | 'ru' | 'en';
  isUmlOpen: boolean;
  setIsUmlOpen: (open: boolean) => void;
  highContrastMode?: boolean;
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
  status: 'pending' | 'passed' | 'failed';
  category: 'api' | 'auth' | 'ui' | 'db';
}

export default function ManualTestsPage({ language, isUmlOpen, setIsUmlOpen, highContrastMode = false }: ManualTestsPageProps) {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const texts = {
    ja: {
      title: '手動テスト',
      subtitle: 'KyaMovVM システム機能の包括的テスト',
      progress: 'テスト進行状況',
      completed: '完了',
      total: '合計',
      categories: 'カテゴリ',
      all: 'すべてのテスト',
      api: 'API テスト',
      auth: '認証',
      ui: 'ユーザーインターフェース',
      db: 'データベース',
      status: 'ステータス',
      pending: '待機中',
      passed: '合格',
      failed: '失敗',
      steps: 'ステップ',
      expected: '期待される結果',
      runTest: 'テスト実行',
      markPassed: '合格としてマーク',
      markFailed: '失敗としてマーク',
      resetTest: 'リセット',
      runAll: 'すべてのテストを実行',
      pauseAll: '一時停止',
      resetAll: 'すべてリセット',
      viewUML: 'UML スキーマを表示',
      congratulations: '素晴らしい！',
      allTestsPassed: 'すべてのテストが正常に完了しました！',
      testResults: 'テスト結果',
      passRate: '合格率',
      closeNotification: '閉じる',
      testingComplete: 'テスト完了',
      successMessage: 'おめでとうございます！すべてのテストが正常に完了しました。システムは使用可能です。'
    },
    ru: {
      title: 'Ручные тесты',
      subtitle: 'Комплексное тестирование функций системы KyaMovVM',
      progress: 'Прогресс тестирования',
      completed: 'Завершено',
      total: 'Всего',
      categories: 'Категории',
      all: 'Все тесты',
      api: 'API тесты',
      auth: 'Аутентификация',
      ui: 'Интерфейс',
      db: 'База данных',
      status: 'Статус',
      pending: 'Ожидает',
      passed: 'Пройден',
      failed: 'Провален',
      steps: 'Шаги',
      expected: 'Ожидаемый результат',
      runTest: 'Запустить тест',
      markPassed: 'Отметить как пройденный',
      markFailed: 'Отметить как проваленный',
      resetTest: 'Сбросить',
      runAll: 'Запустить все тесты',
      pauseAll: 'Приостановить',
      resetAll: 'Сбросить все',
      viewUML: 'Показать UML схему',
      congratulations: 'Отлично!',
      allTestsPassed: 'Все тесты успешно пройдены!',
      testResults: 'Результаты тестирования',
      passRate: 'Процент успешности',
      closeNotification: 'Закрыть',
      testingComplete: 'Тестирование завершено',
      successMessage: 'Поздравляем! Все тесты прошли успешно. Система готова к использованию.'
    },
    en: {
      title: 'Manual Tests',
      subtitle: 'Comprehensive testing of KyaMovVM system functions',
      progress: 'Testing Progress',
      completed: 'Completed',
      total: 'Total',
      categories: 'Categories',
      all: 'All Tests',
      api: 'API Tests',
      auth: 'Authentication',
      ui: 'User Interface',
      db: 'Database',
      status: 'Status',
      pending: 'Pending',
      passed: 'Passed',
      failed: 'Failed',
      steps: 'Steps',
      expected: 'Expected Result',
      runTest: 'Run Test',
      markPassed: 'Mark as Passed',
      markFailed: 'Mark as Failed',
      resetTest: 'Reset',
      runAll: 'Run All Tests',
      pauseAll: 'Pause',
      resetAll: 'Reset All',
      viewUML: 'Show UML Schema',
      congratulations: 'Awesome!',
      allTestsPassed: 'All tests passed successfully!',
      testResults: 'Test Results',
      passRate: 'Pass Rate',
      closeNotification: 'Close',
      testingComplete: 'Testing Complete',
      successMessage: 'Congratulations! All tests passed successfully. System is ready for use.'
    }
  };

  const t = texts[language];

  // Initialize test cases
  useEffect(() => {
    const initialTests: TestCase[] = [
      {
        id: 'api-001',
        name: language === 'ja' ? 'API 接続テスト' : language === 'ru' ? 'Проверка API подключения' : 'API Connection Test',
        description: language === 'ja' ? 'メイン API 接続のテスト' : language === 'ru' ? 'Тестирование основного API подключения' : 'Testing main API connection',
        steps: [
          language === 'ja' ? 'API Logs ページを開く' : language === 'ru' ? 'Открыть API Logs страницу' : 'Open API Logs page',
          language === 'ja' ? '接続ステータスを確認' : language === 'ru' ? 'Проверить статус подключения' : 'Check connection status',
          language === 'ja' ? 'テストリクエストを送信' : language === 'ru' ? 'Отправить тестовый запрос' : 'Send test request'
        ],
        expectedResult: language === 'ja' ? 'API への正常な接続' : language === 'ru' ? 'Успешное подключение к API' : 'Successful API connection',
        status: 'pending',
        category: 'api'
      },
      {
        id: 'auth-001',
        name: language === 'ja' ? '認証テスト' : language === 'ru' ? 'Тест аутентификации' : 'Authentication Test',
        description: language === 'ja' ? 'ログイン システムのテスト' : language === 'ru' ? 'Проверка системы входа' : 'Testing login system',
        steps: [
          language === 'ja' ? 'ログイン ページに移動' : language === 'ru' ? 'Перейти на страницу входа' : 'Navigate to login page',
          language === 'ja' ? '認証情報を入力' : language === 'ru' ? 'Ввести учетные данные' : 'Enter credentials',
          language === 'ja' ? 'ログイン ボタンをクリック' : language === 'ru' ? 'Нажать кнопку входа' : 'Click login button'
        ],
        expectedResult: language === 'ja' ? '認証成功' : language === 'ru' ? 'Успешная авторизация' : 'Successful authentication',
        status: 'pending',
        category: 'auth'
      },
      {
        id: 'ui-001',
        name: language === 'ja' ? 'ナビゲーション テスト' : language === 'ru' ? 'Тест навигации' : 'Navigation Test',
        description: language === 'ja' ? 'ナビゲーション機能のテスト' : language === 'ru' ? 'Проверка работы навигации' : 'Testing navigation functionality',
        steps: [
          language === 'ja' ? 'すべてのメニュー項目を確認' : language === 'ru' ? 'Проверить все пункты меню' : 'Check all menu items',
          language === 'ja' ? '言語切り替えをテスト' : language === 'ru' ? 'Протестировать переключение языка' : 'Test language switching',
          language === 'ja' ? 'レスポンシブ性を確認' : language === 'ru' ? 'Проверить адаптивность' : 'Check responsiveness'
        ],
        expectedResult: language === 'ja' ? '適切なナビゲーション機能' : language === 'ru' ? 'Корректная работа навигации' : 'Proper navigation functionality',
        status: 'pending',
        category: 'ui'
      },
      {
        id: 'db-001',
        name: language === 'ja' ? 'データベース スキーマ テスト' : language === 'ru' ? 'Тест схемы БД' : 'Database Schema Test',
        description: language === 'ja' ? 'UML データベース スキーマのテスト' : language === 'ru' ? 'Проверка UML схемы базы данных' : 'Testing UML database schema',
        steps: [
          language === 'ja' ? 'UML ダイアグラムを開く' : language === 'ru' ? 'Открыть UML диаграмму' : 'Open UML diagram',
          language === 'ja' ? 'テーブル関係を確認' : language === 'ru' ? 'Проверить связи таблиц' : 'Check table relationships',
          language === 'ja' ? '構造を検証' : language === 'ru' ? 'Валидировать структуру' : 'Validate structure'
        ],
        expectedResult: language === 'ja' ? '正しいデータベース スキーマ' : language === 'ru' ? 'Корректная схема БД' : 'Correct database schema',
        status: 'pending',
        category: 'db'
      },
      {
        id: 'ui-002',
        name: language === 'ja' ? 'モーダル ウィンドウ テスト' : language === 'ru' ? 'Тест модальных окон' : 'Modal Windows Test',
        description: language === 'ja' ? 'モーダル ウィンドウ機能のテスト' : language === 'ru' ? 'Проверка работы модальных окон' : 'Testing modal windows functionality',
        steps: [
          language === 'ja' ? 'UML モーダル ウィンドウを開く' : language === 'ru' ? 'Открыть UML модальное окно' : 'Open UML modal window',
          language === 'ja' ? 'ESC キーによる閉じるをテスト' : language === 'ru' ? 'Проверить закрытие по ESC' : 'Test ESC key closing',
          language === 'ja' ? '外側クリックをテスト' : language === 'ru' ? 'Проверить клик вне окна' : 'Test click outside'
        ],
        expectedResult: language === 'ja' ? '適切なモーダル機能' : language === 'ru' ? 'Корректная работа модалок' : 'Proper modal functionality',
        status: 'pending',
        category: 'ui'
      },
      {
        id: 'api-002',
        name: language === 'ja' ? 'エラー処理テスト' : language === 'ru' ? 'Тест обработки ошибок' : 'Error Handling Test',
        description: language === 'ja' ? 'API エラー処理のテスト' : language === 'ru' ? 'Проверка обработки ошибок API' : 'Testing API error handling',
        steps: [
          language === 'ja' ? '無効なリクエストを送信' : language === 'ru' ? 'Отправить некорректный запрос' : 'Send invalid request',
          language === 'ja' ? 'エラー メッセージを確認' : language === 'ru' ? 'Проверить сообщение об ошибке' : 'Check error message',
          language === 'ja' ? 'フォールバック メカニズムを確認' : language === 'ru' ? 'Проверить fallback механизмы' : 'Check fallback mechanisms'
        ],
        expectedResult: language === 'ja' ? '適切なエラー処理' : language === 'ru' ? 'Корректная обработка ошибок' : 'Proper error handling',
        status: 'pending',
        category: 'api'
      }
    ];

    setTestCases(initialTests);
  }, [language]);

  const updateTestStatus = (testId: string, status: 'passed' | 'failed' | 'pending') => {
    setTestCases(prev => prev.map(test => 
      test.id === testId ? { ...test, status } : test
    ));
  };

  const resetAllTests = () => {
    setTestCases(prev => prev.map(test => ({ ...test, status: 'pending' })));
    setShowSuccessNotification(false);
  };

  const filteredTests = activeCategory === 'all' 
    ? testCases 
    : testCases.filter(test => test.category === activeCategory);

  const completedTests = testCases.filter(test => test.status !== 'pending').length;
  const passedTests = testCases.filter(test => test.status === 'passed').length;
  const failedTests = testCases.filter(test => test.status === 'failed').length;
  const totalTests = testCases.length;
  const progressPercentage = totalTests > 0 ? (completedTests / totalTests) * 100 : 0;
  const passRate = completedTests > 0 ? (passedTests / completedTests) * 100 : 0;

  // Check for 100% completion with subtle notification
  useEffect(() => {
    if (passedTests === totalTests && totalTests > 0 && !showSuccessNotification) {
      setShowSuccessNotification(true);
    } else if (passedTests !== totalTests) {
      setShowSuccessNotification(false);
    }
  }, [passedTests, totalTests, showSuccessNotification]);

  const runAllTests = async () => {
    setIsRunning(true);
    
    // Simulate running tests with delays
    for (let i = 0; i < testCases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const randomSuccess = Math.random() > 0.2; // 80% success rate
      updateTestStatus(testCases[i].id, randomSuccess ? 'passed' : 'failed');
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const categories = [
    { id: 'all', label: t.all, icon: TestTube, count: totalTests },
    { id: 'api', label: t.api, icon: Zap, count: testCases.filter(t => t.category === 'api').length },
    { id: 'auth', label: t.auth, icon: TestTube, count: testCases.filter(t => t.category === 'auth').length },
    { id: 'ui', label: t.ui, icon: TestTube, count: testCases.filter(t => t.category === 'ui').length },
    { id: 'db', label: t.db, icon: Database, count: testCases.filter(t => t.category === 'db').length }
  ];

  // Handler for closing notification - properly closes the modal
  const handleCloseNotification = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowSuccessNotification(false);
  };

  return (
    <div className={`min-h-screen-safe px-4 py-8 ${
      highContrastMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark'
    }`}>
      {/* Subtle Side Notification */}
      {showSuccessNotification && (
        <div className="fixed top-24 right-4 z-50 max-w-sm">
          <Card className={`border shadow-lg slide-in-right ${
            highContrastMode 
              ? 'bg-gray-900 border-4 border-white text-white shadow-2xl'
              : 'bg-cyber-dark-secondary/95 border-cyber-cyan/30 backdrop-blur-sm shadow-2xl shadow-cyber-cyan/20'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    highContrastMode ? 'bg-green-800' : 'bg-cyber-cyan/20'
                  }`}>
                    <CheckSquare className={`w-5 h-5 ${
                      highContrastMode ? 'text-green-300' : 'text-cyber-cyan'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm mb-1 ${
                      highContrastMode ? 'text-white' : 'text-cyber-cyan'
                    }`}>
                      {t.testingComplete}
                    </h4>
                    <p className={`text-xs ${
                      highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                    }`}>
                      {t.successMessage}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCloseNotification()}
                  className={`p-1 ml-2 flex-shrink-0 rounded transition-colors ${
                    highContrastMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-cyber-cyan/60 hover:text-cyber-cyan hover:bg-cyber-cyan/10'
                  }`}
                  title={t.closeNotification}
                  aria-label={t.closeNotification}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fixed Progress Bar */}
      <div className={`fixed top-20 left-0 right-0 z-40 backdrop-blur-sm border-b py-4 ${
        highContrastMode 
          ? 'bg-black/95 border-white/20'
          : 'bg-cyber-dark-secondary/95 border-cyber-cyan/20'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-bold ${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              {t.progress}
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {completedTests}/{totalTests} {t.completed}
              </span>
              <span className={`${
                highContrastMode ? 'text-gray-300' : 'text-cyber-pink'
              }`}>
                {passRate.toFixed(1)}% {t.passRate}
              </span>
            </div>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-3 ${
              highContrastMode 
                ? 'bg-gray-800 border border-white/30'
                : 'bg-cyber-dark border border-cyber-cyan/30'
            }`}
          />
          {progressPercentage === 100 && (
            <div className="flex items-center justify-center mt-2">
              <Badge className={`font-bold ${
                highContrastMode
                  ? 'bg-green-700 text-white'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink text-white'
              }`}>
                <Trophy className="w-4 h-4 mr-1" />
                {t.allTestsPassed}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with top margin for fixed progress bar */}
      <div className="mt-24 container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className={`font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                highContrastMode
                  ? 'bg-white text-black hover:bg-gray-200 border-4 border-white shadow-xl'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:opacity-80 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? t.pauseAll : t.runAll}
            </Button>
            <Button 
              onClick={resetAllTests}
              variant="outline"
              className={`font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                highContrastMode
                  ? 'border-4 border-white text-white hover:bg-white hover:text-black shadow-lg'
                  : 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10'
              }`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.resetAll}
            </Button>
            <Button 
              onClick={() => setIsUmlOpen(true)}
              variant="outline"
              className={`font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${
                highContrastMode
                  ? 'border-4 border-white text-white hover:bg-white hover:text-black shadow-lg'
                  : 'border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10'
              }`}
            >
              <Database className="w-4 h-4 mr-2" />
              {t.viewUML}
            </Button>
          </div>
        </div>

        {/* Test Categories and Content */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className={`grid w-full grid-cols-5 mb-8 p-2 ${
            highContrastMode
              ? 'bg-black border-4 border-white shadow-2xl'
              : 'bg-cyber-dark-secondary/80 border-2 border-cyber-cyan/20 shadow-xl shadow-cyber-cyan/10'
          }`}>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className={`font-bold flex items-center space-x-2 transition-all duration-300 py-3 px-4 ${
                  highContrastMode
                    ? 'text-white data-[state=active]:bg-white data-[state=active]:text-black hover:bg-gray-800 border-2 border-transparent data-[state=active]:border-white data-[state=active]:shadow-lg'
                    : 'text-cyber-cyan/80 data-[state=active]:bg-cyber-cyan data-[state=active]:text-cyber-dark hover:bg-cyber-cyan/20 border border-transparent data-[state=active]:border-cyber-cyan/50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="space-y-6">
            {filteredTests.map((test) => (
              <Card 
                key={test.id} 
                className={`backdrop-blur-sm shadow-2xl transition-all duration-300 ${
                  highContrastMode
                    ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                    : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 hover:shadow-cyber-cyan/20'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center space-x-3 ${
                      highContrastMode ? 'text-white' : 'text-cyber-cyan'
                    }`}>
                      {getStatusIcon(test.status)}
                      <span>{test.name}</span>
                    </CardTitle>
                    <Badge className={`${getStatusColor(test.status)} font-bold`}>
                      {test.status === 'pending' ? t.pending : test.status === 'passed' ? t.passed : t.failed}
                    </Badge>
                  </div>
                  <p className={`${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                  }`}>
                    {test.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Test Steps */}
                  <div>
                    <h4 className={`font-bold mb-2 ${
                      highContrastMode ? 'text-white' : 'text-cyber-pink'
                    }`}>
                      {t.steps}:
                    </h4>
                    <ol className={`list-decimal list-inside space-y-1 ${
                      highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                    }`}>
                      {test.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Expected Result */}
                  <div>
                    <h4 className={`font-bold mb-2 ${
                      highContrastMode ? 'text-white' : 'text-cyber-purple'
                    }`}>
                      {t.expected}:
                    </h4>
                    <p className={`${
                      highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
                    }`}>
                      {test.expectedResult}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    <Button 
                      onClick={() => updateTestStatus(test.id, 'passed')}
                      size="sm"
                      className="bg-green-600/80 hover:bg-green-600 font-bold transition-all duration-200 hover:scale-105 active:scale-95 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t.markPassed}
                    </Button>
                    <Button 
                      onClick={() => updateTestStatus(test.id, 'failed')}
                      size="sm"
                      variant="destructive"
                      className="font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      {t.markFailed}
                    </Button>
                    <Button 
                      onClick={() => updateTestStatus(test.id, 'pending')}
                      size="sm"
                      variant="outline"
                      className={`font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                        highContrastMode
                          ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                          : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      {t.resetTest}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Test Results Summary */}
        {completedTests > 0 && (
          <Card className={`mt-8 backdrop-blur-sm shadow-2xl ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90 shadow-xl'
              : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20'
          }`}>
            <CardHeader>
              <CardTitle className={`${
                highContrastMode ? 'text-white' : 'text-cyber-purple'
              }`}>
                {t.testResults}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className={`p-4 rounded-lg border ${
                  highContrastMode
                    ? 'bg-gray-800 border-white/20'
                    : 'bg-cyber-cyan/10 border-cyber-cyan/20'
                }`}>
                  <div className={`text-2xl font-bold ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    {totalTests}
                  </div>
                  <div className={`${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                  }`}>
                    {t.total}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">{passedTests}</div>
                  <div className="text-green-400/80">{t.passed}</div>
                </div>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-2xl font-bold text-red-400">{failedTests}</div>
                  <div className="text-red-400/80">{t.failed}</div>
                </div>
                <div className={`p-4 rounded-lg border ${
                  highContrastMode
                    ? 'bg-gray-800 border-white/20'
                    : 'bg-cyber-pink/10 border-cyber-pink/20'
                }`}>
                  <div className={`text-2xl font-bold ${
                    highContrastMode ? 'text-white' : 'text-cyber-pink'
                  }`}>
                    {passRate.toFixed(1)}%
                  </div>
                  <div className={`${
                    highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
                  }`}>
                    {t.passRate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}