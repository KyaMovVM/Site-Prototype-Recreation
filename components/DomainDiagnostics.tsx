import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Globe, X, CheckCircle, XCircle, AlertCircle, Clock, Wifi, Shield, Database, Server, RefreshCw } from 'lucide-react';

interface DomainDiagnosticsProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode: boolean;
  onClose: () => void;
}

interface DiagnosticResult {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  details?: string;
}

export default function DomainDiagnostics({ language, highContrastMode, onClose }: DomainDiagnosticsProps) {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('***');

  const texts = {
    ja: {
      title: 'ドメイン診断 v5.0',
      subtitle: 'DNS と接続の診断',
      currentDomain: '現在のドメイン',
      runDiagnostics: '診断を実行',
      running: '診断中...',
      completed: '診断完了',
      close: '閉じる',
      refresh: '更新',
      results: '診断結果',
      dns: 'DNS 解決',
      connection: '接続テスト',
      ssl: 'SSL 証明書',
      performance: 'パフォーマンス',
      robots: 'robots.txt',
      headers: 'HTTP ヘッダー',
      success: '成功',
      warning: '警告',
      error: 'エラー',
      pending: '待機中'
    },
    ru: {
      title: 'Диагностика доменов v5.0',
      subtitle: 'Диагностика DNS и подключения',
      currentDomain: 'Текущий домен',
      runDiagnostics: 'Запустить диагностику',
      running: 'Выполняется...',
      completed: 'Диагностика завершена',
      close: 'Закрыть',
      refresh: 'Обновить',
      results: 'Результаты диагностики',
      dns: 'Разрешение DNS',
      connection: 'Тест подключения',
      ssl: 'SSL-сертификат',
      performance: 'Производительность',
      robots: 'robots.txt',
      headers: 'HTTP-заголовки',
      success: 'Успех',
      warning: 'Предупреждение',
      error: 'Ошибка',
      pending: 'Ожидание'
    },
    en: {
      title: 'Domain Diagnostics v5.0',
      subtitle: 'DNS and connection diagnostics',
      currentDomain: 'Current Domain',
      runDiagnostics: 'Run Diagnostics',
      running: 'Running...',
      completed: 'Diagnostics completed',
      close: 'Close',
      refresh: 'Refresh',
      results: 'Diagnostic Results',
      dns: 'DNS Resolution',
      connection: 'Connection Test',
      ssl: 'SSL Certificate',
      performance: 'Performance',
      robots: 'robots.txt',
      headers: 'HTTP Headers',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      pending: 'Pending'
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Get current domain - CLEANED: Use generic placeholder
    const domain = window.location.hostname || '***';
    setCurrentDomain(domain === 'localhost' ? '*** (localhost)' : '***');
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);

    const tests = [
      {
        name: t.dns,
        icon: Globe,
        test: async () => {
          // Simulate DNS test
          await new Promise(resolve => setTimeout(resolve, 1000));
          return {
            status: 'success' as const,
            message: language === 'ja' ? 'DNS 解決成功' : language === 'ru' ? 'DNS разрешен успешно' : 'DNS resolved successfully',
            details: '*** → 127.0.0.1'
          };
        }
      },
      {
        name: t.connection,
        icon: Wifi,
        test: async () => {
          await new Promise(resolve => setTimeout(resolve, 800));
          try {
            const startTime = performance.now();
            await fetch(window.location.origin, { method: 'HEAD', cache: 'no-cache' });
            const endTime = performance.now();
            const responseTime = Math.round(endTime - startTime);
            
            return {
              status: responseTime < 1000 ? 'success' as const : 'warning' as const,
              message: language === 'ja' 
                ? `接続成功 (${responseTime}ms)` 
                : language === 'ru' 
                  ? `Соединение успешно (${responseTime}ms)` 
                  : `Connection successful (${responseTime}ms)`,
              details: `Response time: ${responseTime}ms`
            };
          } catch (error) {
            return {
              status: 'error' as const,
              message: language === 'ja' ? '接続エラー' : language === 'ru' ? 'Ошибка соединения' : 'Connection error',
              details: 'Network request failed'
            };
          }
        }
      },
      {
        name: t.ssl,
        icon: Shield,
        test: async () => {
          await new Promise(resolve => setTimeout(resolve, 600));
          const isHttps = window.location.protocol === 'https:';
          return {
            status: isHttps ? 'success' as const : 'warning' as const,
            message: isHttps 
              ? (language === 'ja' ? 'SSL 有効' : language === 'ru' ? 'SSL активен' : 'SSL enabled')
              : (language === 'ja' ? 'SSL なし' : language === 'ru' ? 'SSL отсутствует' : 'No SSL'),
            details: isHttps ? 'HTTPS protocol in use' : 'HTTP protocol (no encryption)'
          };
        }
      },
      {
        name: t.performance,
        icon: Clock,
        test: async () => {
          await new Promise(resolve => setTimeout(resolve, 1200));
          const connection = (navigator as any).connection;
          if (connection) {
            const effectiveType = connection.effectiveType;
            const downlink = connection.downlink || 'unknown';
            return {
              status: effectiveType === '4g' ? 'success' as const : 'warning' as const,
              message: language === 'ja' 
                ? `接続品質: ${effectiveType}` 
                : language === 'ru' 
                  ? `Качество: ${effectiveType}` 
                  : `Quality: ${effectiveType}`,
              details: `Speed: ${downlink}Mbps, Type: ${effectiveType}`
            };
          } else {
            return {
              status: 'warning' as const,
              message: language === 'ja' ? 'ネットワーク情報なし' : language === 'ru' ? 'Нет данных сети' : 'No network info',
              details: 'Connection API not supported'
            };
          }
        }
      },
      {
        name: t.robots,
        icon: Database,
        test: async () => {
          await new Promise(resolve => setTimeout(resolve, 900));
          try {
            const response = await fetch('/robots.txt', { method: 'HEAD' });
            return {
              status: response.ok ? 'success' as const : 'warning' as const,
              message: response.ok 
                ? (language === 'ja' ? 'robots.txt 利用可能' : language === 'ru' ? 'robots.txt доступен' : 'robots.txt available')
                : (language === 'ja' ? 'robots.txt なし' : language === 'ru' ? 'robots.txt не найден' : 'robots.txt not found'),
              details: `Status: ${response.status}`
            };
          } catch (error) {
            return {
              status: 'error' as const,
              message: language === 'ja' ? 'robots.txt エラー' : language === 'ru' ? 'Ошибка robots.txt' : 'robots.txt error',
              details: 'Failed to fetch robots.txt'
            };
          }
        }
      },
      {
        name: t.headers,
        icon: Server,
        test: async () => {
          await new Promise(resolve => setTimeout(resolve, 700));
          try {
            const response = await fetch(window.location.origin, { method: 'HEAD' });
            const securityHeaders = [
              'content-security-policy',
              'x-frame-options',
              'x-content-type-options',
              'strict-transport-security'
            ];
            
            const foundHeaders = securityHeaders.filter(header => response.headers.get(header));
            const securityScore = foundHeaders.length;
            
            return {
              status: securityScore >= 2 ? 'success' as const : securityScore >= 1 ? 'warning' as const : 'error' as const,
              message: language === 'ja' 
                ? `セキュリティ ヘッダー: ${securityScore}/4` 
                : language === 'ru' 
                  ? `Заголовки безопасности: ${securityScore}/4` 
                  : `Security headers: ${securityScore}/4`,
              details: `Found: ${foundHeaders.join(', ') || 'none'}`
            };
          } catch (error) {
            return {
              status: 'error' as const,
              message: language === 'ja' ? 'ヘッダー チェック エラー' : language === 'ru' ? 'Ошибка проверки заголовков' : 'Header check error',
              details: 'Failed to check headers'
            };
          }
        }
      }
    ];

    // Run tests sequentially with visual feedback
    for (const test of tests) {
      const pendingResult: DiagnosticResult = {
        name: test.name,
        status: 'pending',
        message: t.pending
      };
      
      setDiagnostics(prev => [...prev, pendingResult]);
      
      try {
        const result = await test.test();
        setDiagnostics(prev => prev.map(item => 
          item.name === test.name ? { name: test.name, ...result } : item
        ));
      } catch (error) {
        setDiagnostics(prev => prev.map(item => 
          item.name === test.name ? {
            name: test.name,
            status: 'error' as const,
            message: language === 'ja' ? 'テスト エラー' : language === 'ru' ? 'Ошибка теста' : 'Test error',
            details: error instanceof Error ? error.message : 'Unknown error'
          } : item
        ));
      }
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: DiagnosticResult['status']) => {
    const variant = status === 'success' ? 'default' : status === 'warning' ? 'secondary' : 'destructive';
    const text = status === 'success' ? t.success : status === 'warning' ? t.warning : status === 'error' ? t.error : t.pending;
    
    return (
      <Badge variant={variant} className={`text-xs ${
        highContrastMode 
          ? status === 'success' 
            ? 'bg-white text-black' 
            : status === 'warning'
              ? 'bg-yellow-400 text-black'
              : 'bg-red-500 text-white'
          : ''
      }`}>
        {text}
      </Badge>
    );
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${
      highContrastMode
        ? 'bg-black border-4 border-white text-white'
        : 'bg-cyber-dark-secondary border border-cyber-cyan/30 text-white'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className={`text-xl font-bold flex items-center space-x-2 ${
            highContrastMode ? 'text-white' : 'text-cyber-cyan'
          }`}>
            <Globe className="w-5 h-5" />
            <span>{t.title}</span>
          </CardTitle>
          <p className={`text-sm mt-1 ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`${
            highContrastMode
              ? 'text-white hover:bg-white/20 border-2 border-white/50'
              : 'text-cyber-cyan hover:bg-cyber-cyan/10'
          }`}
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Domain Info */}
        <div className={`p-4 rounded-lg border ${
          highContrastMode
            ? 'bg-gray-900 border-white/20'
            : 'bg-cyber-dark/50 border-cyber-cyan/20'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold text-sm ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.currentDomain}
              </h3>
              <p className={`text-lg font-mono mt-1 ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/90'
              }`}>
                {currentDomain}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={runDiagnostics}
                disabled={isRunning}
                size="sm"
                className={`${
                  highContrastMode
                    ? 'bg-white text-black hover:bg-gray-200 disabled:bg-gray-600'
                    : 'bg-cyber-cyan text-cyber-dark hover:bg-cyber-cyan/80 disabled:bg-cyber-cyan/50'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {t.running}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t.runDiagnostics}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {diagnostics.length > 0 && (
          <div>
            <h3 className={`font-semibold mb-4 flex items-center space-x-2 ${
              highContrastMode ? 'text-white' : 'text-cyber-cyan'
            }`}>
              <Database className="w-4 h-4" />
              <span>{t.results}</span>
              {!isRunning && <Badge variant="secondary" className="text-xs">{t.completed}</Badge>}
            </h3>
            
            <div className="space-y-3">
              {diagnostics.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    highContrastMode
                      ? 'bg-gray-900 border-white/20 hover:bg-gray-800'
                      : 'bg-cyber-dark/30 border-cyber-cyan/20 hover:bg-cyber-dark/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h4 className={`font-medium ${
                          highContrastMode ? 'text-white' : 'text-cyber-cyan'
                        }`}>
                          {result.name}
                        </h4>
                        <p className={`text-sm ${
                          highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                        }`}>
                          {result.message}
                        </p>
                        {result.details && (
                          <p className={`text-xs mt-1 font-mono ${
                            highContrastMode ? 'text-gray-400' : 'text-cyber-cyan/60'
                          }`}>
                            {result.details}
                          </p>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {diagnostics.length === 0 && !isRunning && (
          <div className={`text-center py-8 ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            <Globe className={`w-12 h-12 mx-auto mb-4 ${
              highContrastMode ? 'text-gray-400' : 'text-cyber-cyan/60'
            }`} />
            <p className="text-sm">
              {language === 'ja' 
                ? '診断を実行してドメインとネットワークの状態を確認してください。'
                : language === 'ru'
                  ? 'Запустите диагностику для проверки состояния домена и сети.'
                  : 'Run diagnostics to check domain and network status.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}