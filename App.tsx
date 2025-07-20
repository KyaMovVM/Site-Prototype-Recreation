// @ts-nocheck
import { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Github, Menu, X, Eye, Languages, ExternalLink, Accessibility, Database, ChevronDown, Home, FileText, Settings, Shield, Code, TestTube, Globe } from "lucide-react";
import KyaMovVMLogo from "./components/KyaMovVMLogo";
import VersionIndicator from "./components/VersionIndicator";
import MobileLanguageToggle from "./components/MobileLanguageToggle";
import LoadingTimer from "./components/LoadingTimer";
import GlobalLoadingIndicator from "./components/GlobalLoadingIndicator";
import AnimatedCarHero from "./components/AnimatedCarHero";
import OptimizedHeroImage from "./components/OptimizedHeroImage";
import ResourceHints from "./components/ResourceHints";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Import the original hero image as fallback
import newHeroImage from '/favicon.svg';

// Lazy load heavy components for better performance
const PlanPage = lazy(() => import("./components/PlanPage"));
const CarDemo = lazy(() => import("./components/CarDemo"));
const ManualTestsPage = lazy(() => import("./components/ManualTestsPage"));
const DocumentationPage = lazy(() => import("./components/DocumentationPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const UMLPage = lazy(() => import("./components/UMLPage"));
const UMLModal = lazy(() => import("./components/UMLModal"));
const VersionHistoryPage = lazy(() => import("./components/VersionHistoryPage"));
const PerformanceOptimizer = lazy(() => import("./components/PerformanceOptimizer"));
const JapaneseEngagementPage = lazy(() => import("./components/JapaneseEngagementPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));
const DomainDiagnostics = lazy(() => import("./components/DomainDiagnostics"));
const RobotsHandler = lazy(() => import("./components/RobotsHandler"));

// Loading fallback component
const ComponentLoader = ({ highContrastMode = false }: { highContrastMode?: boolean }) => (
  <div className={`flex items-center justify-center p-8 ${
    highContrastMode ? 'text-white' : 'text-cyber-cyan'
  }`}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
  </div>
);

export default function App() {
  const [isUmlOpen, setIsUmlOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'ja' | 'ru' | 'en'>('ja');
  const [currentPage, setCurrentPage] = useState('home');
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [showPerformanceOptimizer, setShowPerformanceOptimizer] = useState(false);
  const [showJapaneseEngagement, setShowJapaneseEngagement] = useState(false);
  const [showDomainDiagnostics, setShowDomainDiagnostics] = useState(false);
  const [japaneseLoadingProgress, setJapaneseLoadingProgress] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow' | 'very-slow'>('slow');
  const [useAnimatedHero, setUseAnimatedHero] = useState(false);
  const [pingTime, setPingTime] = useState<number | null>(null);
  const [heroImageError, setHeroImageError] = useState(false);
  const [requestedPath, setRequestedPath] = useState('');
  const [lcpOptimized, setLcpOptimized] = useState(false);

  // Check if user is likely from Japan (rough detection)
  const [isLikelyJapanese, setIsLikelyJapanese] = useState(false);

  // ENHANCED LCP Optimization - inject critical CSS immediately with preload strategy v5.0
  useEffect(() => {
    if (!lcpOptimized) {
      const criticalCSS = document.createElement('style');
      criticalCSS.innerHTML = `
        /* Critical LCP optimization styles v5.0 - ULTRA-ENHANCED for maximum LCP */
        body { 
          font-family: system-ui, sans-serif; 
          background: #0a0a0f; 
          color: #fff; 
          visibility: visible; 
          margin: 0; 
          padding: 0;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeSpeed;
          /* ULTRA CRITICAL: Prevent all layout shifts */
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }
        .hero-container { 
          position: relative; 
          padding: 2rem 1rem; 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          contain: layout style paint;
          /* CRITICAL: Prevent container shifts */
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .hero-image { 
          width: 100% !important; 
          height: 300px !important; 
          object-fit: cover !important; 
          border-radius: 8px !important; 
          display: block !important; 
          contain: strict !important;
          max-width: 100% !important;
          image-rendering: -webkit-optimize-contrast !important;
          /* ULTRA CRITICAL: Prevent image shifts */
          aspect-ratio: 16/9 !important;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
        }
        .layout-stable { 
          min-height: 300px !important; 
          max-height: 400px !important; 
          margin-bottom: 2rem !important; 
          contain: layout size style paint !important;
          aspect-ratio: 16/9 !important;
          /* CRITICAL: Prevent all layout changes */
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .lcp-element { 
          contain: strict !important; 
          will-change: auto !important;
          content-visibility: auto !important;
          /* ULTRA CRITICAL: Immediate visibility */
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }
        .container { 
          width: 100% !important; 
          margin-left: auto !important; 
          margin-right: auto !important; 
          padding-left: 1rem !important; 
          padding-right: 1rem !important;
          contain: layout !important;
          /* CRITICAL: Prevent container overflow */
          max-width: 100vw !important;
          box-sizing: border-box !important;
          overflow-x: hidden !important;
        }
        img[loading="eager"] { 
          content-visibility: auto !important;
          image-rendering: -webkit-optimize-contrast !important;
          max-width: 100% !important;
          height: auto !important;
          /* CRITICAL: Force immediate rendering */
          opacity: 1 !important;
          visibility: visible !important;
        }
        /* ULTRA-Conservative iPhone X/small screen fix */
        @media (max-width: 414px) {
          body { 
            overflow-x: hidden !important; 
            width: 100% !important;
            max-width: 100vw !important;
          }
          .container { 
            padding-left: 0.75rem !important; 
            padding-right: 0.75rem !important; 
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
          }
          .hero-container { 
            padding: 1.5rem 0.75rem !important; 
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          .hero-image {
            height: 250px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .layout-stable {
            min-height: 250px !important;
            max-height: 300px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
        /* CRITICAL: Immediate visibility for all LCP candidates */
        .hero-image, .lcp-element, .layout-stable {
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          transform: none !important;
          transition: none !important;
        }
        /* ULTRA CRITICAL: Prevent any width overflow */
        * {
          box-sizing: border-box !important;
        }
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
      `;
      document.head.insertBefore(criticalCSS, document.head.firstChild);
      
      // ULTRA-ENHANCED preload critical resources immediately
      const preloadHints = [
        { rel: 'preload', as: 'style', href: '/styles/globals.css' },
        { rel: 'preload', as: 'image', href: newHeroImage, fetchPriority: 'high' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//github.com' },
        { rel: 'preconnect', href: 'https://figma.com', crossOrigin: 'anonymous' },
        { rel: 'prefetch', as: 'script', href: '/sw.js' }
      ];
      
      preloadHints.forEach(hint => {
        const link = document.createElement('link');
        Object.assign(link, hint);
        document.head.appendChild(link);
      });
      
      // Additional ultra-performance optimizations
      const performanceHints = [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' },
        { httpEquiv: 'x-dns-prefetch-control', content: 'on' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#0a0a0f' },
        { name: 'color-scheme', content: 'dark light' }
      ];
      
      performanceHints.forEach(hint => {
        const meta = document.createElement('meta');
        if (hint.httpEquiv) {
          meta.httpEquiv = hint.httpEquiv;
        } else {
          meta.name = hint.name;
        }
        meta.content = hint.content;
        document.head.appendChild(meta);
      });
      
      setLcpOptimized(true);
    }
  }, [lcpOptimized]);

  // ULTRA-Conservative viewport meta tag setup with CLS prevention
  useEffect(() => {
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // ULTRA-Conservative viewport settings for maximum stability
    viewportMeta.setAttribute('content', 
      'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no'
    );

    // Enhanced mobile meta tags for stability
    const mobileMetaTags = [
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#0a0a0f' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ];

    mobileMetaTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });
  }, []);

  // Register service worker for robots.txt handling with enhanced error handling
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then((registration) => {
            console.log('SW registered for robots.txt v5.0: ', registration);
            
            // Update service worker when new version is available
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New service worker available for robots.txt v5.0');
                  }
                });
              }
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed for robots.txt: ', registrationError);
          });
      });
    }
  }, []);

  // Enhanced URL handling for robots.txt and 404 detection
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;
      setRequestedPath(path + hash + search);
      
      // Handle robots.txt requests with proper routing
      if (path === '/robots.txt') {
        setCurrentPage('robots');
        return;
      }
      
      // Simple routing based on hash or pathname
      if (path === '/' && !hash) {
        setCurrentPage('home');
      } else if (hash) {
        const page = hash.substring(1); // Remove #
        setCurrentPage(page);
      } else if (path !== '/') {
        // Enhanced valid paths checking
        const validPaths = [
          '/index.html',
          '/uml.html',
          '/docs.html', 
          '/plan.html',
          '/manual_tests.html',
          '/login.html',
          '/robots.txt',
          '/sitemap.xml',
          '/favicon.ico',
          '/sw.js'
        ];
        
        if (!validPaths.includes(path)) {
          setCurrentPage('404');
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Enhanced error handling with better logging
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('KyaMovVM Application error v5.0:', event.error);
      // Enhanced error logging for debugging
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('KyaMovVM Unhandled promise rejection v5.0:', event.reason);
      // Enhanced promise rejection logging
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Enhanced ping test for connection speed with better accuracy
  const performPingTest = async (): Promise<number> => {
    const startTime = performance.now();
    try {
      // Use favicon for more accurate ping measurement
      const response = await fetch('/favicon.svg', { 
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors'
      });
      const endTime = performance.now();
      return endTime - startTime;
    } catch (error) {
      // Fallback ping test with penalty
      const endTime = performance.now();
      return endTime - startTime + 1000;
    }
  };

  // ULTRA-ENHANCED LCP - Immediate hero image preload with multiple strategies
  useEffect(() => {
    // Multiple preload strategies for maximum LCP optimization
    const preloadHeroImage = () => {
      // Strategy 1: Link preload
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = newHeroImage;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      // Strategy 2: Image preload
      const img = new Image();
      img.src = newHeroImage;
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.onload = () => {
        console.log('Hero image preloaded successfully for LCP v5.0');
      };
      img.onerror = () => {
        console.warn('Hero image preload failed v5.0');
        setHeroImageError(true);
      };
      
      // Strategy 3: Preload via fetch for cache warmup
      fetch(newHeroImage, { 
        method: 'GET',
        priority: 'high',
        cache: 'force-cache'
      }).catch(() => {
        console.warn('Hero image fetch preload failed v5.0');
      });
    };
    
    preloadHeroImage();
  }, []);

  // ULTRA-Enhanced connection speed detection with comprehensive testing
  useEffect(() => {
    const detectConnectionSpeed = async () => {
      // Enhanced ping test
      const ping = await performPingTest();
      setPingTime(ping);
      
      console.log(`KyaMovVM v5.0 - Ping time: ${ping}ms`);

      // Enhanced user location detection
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isJapanTimeZone = timeZone === 'Asia/Tokyo';
      const browserLang = navigator.language;
      const isJapaneseBrowser = browserLang.startsWith('ja');
      const isFromJapan = isJapanTimeZone || isJapaneseBrowser;
      
      setIsLikelyJapanese(isFromJapan);

      let speed: 'fast' | 'slow' | 'very-slow' = 'slow';

      // Enhanced speed detection logic
      if (isFromJapan && ping > 2000) {
        speed = 'very-slow';
        setIsOptimized(true); // Auto-enable for Japan
      } else if (ping > 1500) {
        speed = 'very-slow';
      } else if (ping > 800) {
        speed = 'slow';
      } else {
        // Check navigator.connection with better logic
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection) {
            const effectiveType = connection.effectiveType;
            const downlink = connection.downlink || 0;
            const rtt = connection.rtt || ping;
            
            if (effectiveType === '4g' && downlink > 10 && rtt < 200) {
              speed = 'fast';
            } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 1.5)) {
              speed = 'slow';
            } else {
              speed = 'very-slow';
            }
            
            console.log(`KyaMovVM v5.0 - Connection: ${effectiveType}, Speed: ${downlink}Mbps, RTT: ${rtt}ms`);
          } else {
            speed = ping < 300 ? 'fast' : 'slow';
          }
        } else {
          speed = ping < 300 ? 'fast' : 'slow';
        }
      }

      setConnectionSpeed(speed);
      
      // Enhanced hero selection logic
      const shouldUseAnimated = speed !== 'fast' || isOptimized;
      setUseAnimatedHero(shouldUseAnimated);
      
      console.log(`KyaMovVM v5.0 - Final speed: ${speed}, Use animated: ${shouldUseAnimated}`);
    };

    detectConnectionSpeed();
  }, [isOptimized]);

  useEffect(() => {
    // Enhanced Japanese engagement logic
    if (isLikelyJapanese && !isOptimized && isInitialLoad && connectionSpeed !== 'fast') {
      setShowJapaneseEngagement(true);
      
      // Enhanced loading simulation with better timing
      let progress = 0;
      const incrementTime = pingTime ? Math.max(150, pingTime / 12) : 600;
      
      const progressInterval = setInterval(() => {
        progress += Math.random() * 12 + 3; // Random increment between 3-15%
        setJapaneseLoadingProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowJapaneseEngagement(false);
            setIsInitialLoad(false);
          }, 800);
        }
      }, incrementTime);

      return () => clearInterval(progressInterval);
    } else {
      setIsInitialLoad(false);
    }
  }, [isLikelyJapanese, isOptimized, isInitialLoad, connectionSpeed, pingTime]);

  // ULTRA-ENHANCED Performance monitoring with aggressive CLS prevention
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      let lastLCP = 0;
      let clsScore = 0;
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcpTime = entry.startTime;
            lastLCP = lcpTime;
            console.log(`KyaMovVM v5.0 - LCP: ${lcpTime}ms`);
            
            // Enhanced LCP tracking
            if (lcpTime > 4000) {
              console.error(`KyaMovVM v5.0 - Poor LCP detected: ${lcpTime}ms`);
            }
            
            // More aggressive auto-optimization
            if (lcpTime > 1500 && !isOptimized) {
              console.log('KyaMovVM v5.0 - Enabling optimizations for poor LCP');
              setIsOptimized(true);
              setUseAnimatedHero(true);
            }
            
            // Track LCP improvements
            if (lcpTime < 2000) {
              console.log(`KyaMovVM v5.0 - Excellent LCP achieved: ${lcpTime}ms`);
            }
          }
          
          // Enhanced CLS tracking
          if (entry.entryType === 'layout-shift') {
            const cls = entry.value;
            clsScore += cls;
            console.log(`KyaMovVM v5.0 - CLS event: ${cls}, Total: ${clsScore}`);
            if (cls > 0.05) {
              console.warn(`KyaMovVM v5.0 - High CLS event detected: ${cls}`);
            }
          }
          
          // Enhanced FID tracking
          if (entry.entryType === 'first-input') {
            const fid = entry.processingStart - entry.startTime;
            console.log(`KyaMovVM v5.0 - FID: ${fid}ms`);
            if (fid > 100) {
              console.warn(`KyaMovVM v5.0 - High FID detected: ${fid}ms`);
            }
          }
        });
      });

      try {
        observer.observe({ 
          entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] 
        });
        
        // Enhanced navigation timing observer
        const navObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.navigationStart;
              const loadComplete = navEntry.loadEventEnd - navEntry.navigationStart;
              console.log(`KyaMovVM v5.0 - DOMContentLoaded: ${domContentLoaded}ms, Load: ${loadComplete}ms`);
            }
          });
        });
        
        navObserver.observe({ entryTypes: ['navigation'] });
        
        return () => {
          observer.disconnect();
          navObserver.disconnect();
        };
      } catch (e) {
        console.log('KyaMovVM v5.0 - PerformanceObserver not supported');
      }
      
      // Enhanced timeout check for performance issues
      const timeoutCheck = setTimeout(() => {
        if (lastLCP === 0 || lastLCP > 4000) {
          console.warn('KyaMovVM v5.0 - LCP timeout or critical performance issue');
          setIsOptimized(true);
          setUseAnimatedHero(true);
        }
      }, 4000);
      
      return () => clearTimeout(timeoutCheck);
    }
  }, [isOptimized]);

  // Enhanced document meta management with better SEO
  useEffect(() => {
    const title = language === 'ja'
      ? 'KyaMovVM - 現代開発のための革新的な仮想マシン'
      : language === 'ru' 
        ? 'KyaMovVM - Инновационная виртуальная машина для современной разработки'
        : 'KyaMovVM - Innovative virtual machine for modern development';
    
    const description = language === 'ja'
      ? 'KyaMovVM - React、TypeScript、Python バックエンド、UML データベース スキーマを備えた Web インターフェイス付きの現代的な仮想マシン。オープンソース プロジェクト。'
      : language === 'ru'
        ? 'KyaMovVM - современная виртуальная машина с веб-интерфейсом, React, TypeScript, Python backend и UML схемой базы данных. Открытый код.'
        : 'KyaMovVM - modern virtual machine with web interface, React, TypeScript, Python backend and UML database schema. Open source project.';

    // Set document language with proper locale
    document.documentElement.lang = language === 'ja' ? 'ja-JP' : language === 'ru' ? 'ru-RU' : 'en-US';
    
    // Enhanced title management
    if (currentPage === '404') {
      const notFoundTitle = language === 'ja'
        ? '404 - ページが見つかりません | KyaMovVM'
        : language === 'ru'
          ? '404 - Страница не найдена | KyaMovVM'
          : '404 - Page Not Found | KyaMovVM';
      document.title = notFoundTitle;
    } else if (currentPage === 'robots') {
      document.title = 'robots.txt | KyaMovVM';
    } else {
      document.title = title;
    }
    
    // Enhanced meta tag management
    const addMetaTag = (name: string, content: string, httpEquiv?: string) => {
      let meta = document.querySelector(`meta[${httpEquiv ? 'http-equiv' : 'name'}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(httpEquiv ? 'http-equiv' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Enhanced performance and caching meta tags
    addMetaTag('Cache-Control', 'public, max-age=31536000, immutable', 'http-equiv');
    addMetaTag('Expires', new Date(Date.now() + 31536000000).toUTCString(), 'http-equiv');
    addMetaTag('Pragma', 'public', 'http-equiv');
    
    // Enhanced meta description
    const pageDescription = currentPage === '404' 
      ? (language === 'ja' 
          ? 'ページが見つかりません。KyaMovVMの他のページをご覧ください。' 
          : language === 'ru'
            ? 'Страница не найдена. Посетите другие страницы KyaMovVM.'
            : 'Page not found. Visit other KyaMovVM pages.')
      : currentPage === 'robots'
        ? 'robots.txt - SEO and web crawler configuration file for KyaMovVM'
        : description;
    addMetaTag('description', pageDescription);

    // Enhanced keywords - Updated to v5.0
    const keywords = language === 'ja'
      ? 'KyaMovVM, 仮想マシン, React, TypeScript, Python, Django, PostgreSQL, UML, データベース, ウェブ開発, サイバーパンク, オープンソース, v5.0'
      : language === 'ru'
        ? 'KyaMovVM, виртуальная машина, React, TypeScript, Python, Django, PostgreSQL, UML, база данных, веб-разработка, киберпанк, открытый код, v5.0'
        : 'KyaMovVM, virtual machine, React, TypeScript, Python, Django, PostgreSQL, UML, database, web development, cyberpunk, open source, v5.0';
    addMetaTag('keywords', keywords);

    // Enhanced performance hints
    addMetaTag('dns-prefetch-control', 'on', 'http-equiv');
    addMetaTag('x-dns-prefetch-control', 'on', 'http-equiv');

    // Enhanced Open Graph meta tags - Updated to v5.0
    const ogTags = [
      { property: 'og:title', content: currentPage === '404' ? (language === 'ja' ? '404 - ページが見つかりません' : language === 'ru' ? '404 - Страница не найдена' : '404 - Page Not Found') : currentPage === 'robots' ? 'robots.txt' : title },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'KyaMovVM v5.0' },
      { property: 'og:locale', content: language === 'ja' ? 'ja_JP' : language === 'ru' ? 'ru_RU' : 'en_US' }
    ];

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    // Enhanced Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: currentPage === '404' ? (language === 'ja' ? '404 - ページが見つかりません' : language === 'ru' ? '404 - Страница не найдена' : '404 - Page Not Found') : currentPage === 'robots' ? 'robots.txt' : title },
      { name: 'twitter:description', content: pageDescription }
    ];

    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    // Enhanced canonical URL - REMOVED personal domain references
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    // Set canonical URL based on current page - GENERIC APPROACH
    const canonicalUrl = currentPage === 'robots' 
      ? window.location.origin + '/robots.txt'
      : window.location.origin + '/';
    canonical.setAttribute('href', canonicalUrl);

  }, [language, currentPage]);

  // Listen for UML navigation events
  useEffect(() => {
    const handleUMLNavigation = () => {
      setCurrentPage('uml');
    };

    window.addEventListener('navigate-to-uml', handleUMLNavigation);
    return () => window.removeEventListener('navigate-to-uml', handleUMLNavigation);
  }, []);

  // Enhanced navigation groups with icons and better organization - CLEANED TRANSLATIONS
  const navigationGroups = {
    main: [
      { 
        id: 'home', 
        href: "index.html", 
        title: "Home", 
        label: language === 'ja' ? 'ホーム' : language === 'ru' ? 'Главная' : 'Home',
        icon: Home,
        color: 'primary'
      },
      { 
        id: 'uml', 
        href: "uml.html", 
        title: "UML Database Schema", 
        label: "UML DB", 
      icon: Database,
        color: 'accent',
        highlight: true 
      },
      { 
        id: 'docs', 
        href: "docs.html", 
        title: "Documentation", 
        label: language === 'ja' ? 'ドキュメント' : language === 'ru' ? 'Документация' : 'Documentation',
        icon: FileText,
        color: 'accent'
      },
      { 
        id: 'plan', 
        href: "plan.html", 
        title: "Development Plan", 
        label: language === 'ja' ? 'プラン' : language === 'ru' ? 'План' : 'Plan',
        icon: Settings,
        color: 'secondary'
      },
      { 
        id: 'manual_tests', 
        href: "manual_tests.html", 
        title: "Manual Tests", 
        label: language === 'ja' ? '手動テスト' : language === 'ru' ? 'Ручные тесты' : 'Manual Tests',
        icon: TestTube,
        color: 'accent'
      }
    ],
    development: [
      { id: 'api', href: "api.html", title: "API Logs", label: language === 'ja' ? "API ログ" : language === 'ru' ? "API Логи" : "API Logs", icon: Code, color: 'primary' },
      { id: 'django_setup', href: "django_setup.html", title: "Django Setup", label: language === 'ja' ? "Django セットアップ" : language === 'ru' ? "Настройка Django" : "Django Setup", icon: Settings, color: 'accent' },
      { id: 'docker_game', href: "docker_game.html", title: "Docker Game", label: language === 'ja' ? "Docker ゲーム" : language === 'ru' ? "Docker Игра" : "Docker Game", icon: Code, color: 'primary' },
      { id: 'modules', href: "modules.html", title: "Modules", label: language === 'ja' ? 'モジュール' : language === 'ru' ? 'Модули' : 'Modules', icon: Settings, color: 'secondary' },
      { id: 'json_intro', href: "json_intro.html", title: "JSON Schema", label: language === 'ja' ? "JSON スキーマ" : language === 'ru' ? "JSON Схема" : "JSON Schema", icon: Code, color: 'accent' }
    ],
    security: [
      { id: 'fail2ban', href: "fail2ban.html", title: "Fail2Ban", label: "Fail2Ban", icon: Shield, color: 'primary' },
      { id: 'control', href: "control.html", title: "Control", label: language === 'ja' ? 'コントロール' : language === 'ru' ? 'Управление' : 'Control', icon: Settings, color: 'accent' },
      { id: 'login', href: "login.html", title: "Login", label: language === 'ja' ? 'ログイン' : language === 'ru' ? 'Вход' : 'Login', icon: Shield, color: 'secondary' },
      { id: 'crossref', href: "crossref.html", title: "Cross References", label: language === 'ja' ? 'クロスリファレンス' : language === 'ru' ? 'Перекрестные ссылки' : 'Cross References', icon: Database, color: 'primary' }
    ]
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'ja') return 'ru';
      if (prev === 'ru') return 'en';
      return 'ja';
    });
  };

  const toggleHighContrast = () => {
    setHighContrastMode(prev => !prev);
  };

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    setActiveDropdown(null);
    
    // Update URL hash for navigation
    if (pageId === 'home') {
      window.history.pushState(null, '', '/');
    } else if (pageId === 'robots') {
      window.history.pushState(null, '', '/robots.txt');
    } else {
      window.history.pushState(null, '', `#${pageId}`);
    }
  };

  const toggleDropdown = (group: string) => {
    setActiveDropdown(activeDropdown === group ? null : group);
  };

  const handleOptimizationChange = (enabled: boolean) => {
    setIsOptimized(enabled);
    setUseAnimatedHero(enabled || connectionSpeed !== 'fast');
    if (enabled) {
      // Enable various optimizations
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          // Preload next likely components
          import("./components/UMLModal");
        });
      }
    }
  };

  const getLanguageFlag = () => {
    switch (language) {
      case 'ja': return '🇯🇵';
      case 'ru': return '🇷🇺';
      case 'en': return '🇺🇸';
      default: return '🇯🇵';
    }
  };

  const getLanguageCode = () => {
    switch (language) {
      case 'ja': return 'JA';
      case 'ru': return 'RU';
      case 'en': return 'EN';
      default: return 'JA';
    }
  };

  // CLEANED TRANSLATIONS - Removed personal references
  const texts = {
    ja: {
      project: 'KyaMovVM',
      subtitle: '現代開発のための革新的な仮想マシン',
      demo3d: '3D デモンストレーション',
      demo3dDesc: 'サイバーパンクスタイルのインタラクティブな3D車モデル',
      car3d: '3D 車',
      modelDesc: 'ネオンライティングで自動回転するモデル',
      aboutProject: 'KyaMovVM プロジェクトについて',
      innovations: 'イノベーション',
      innovationsDesc: '最先端技術を使用した仮想マシン開発への現代的なアプローチ。',
      performance: 'パフォーマンス',
      performanceDesc: '最大限のパフォーマンスと効率性のために最適化されたアーキテクチャ。',
      openSource: 'オープンソース',
      openSourceDesc: '学習と貢献のために利用可能なオープンソースプロジェクト。',
      umlDiagram: 'UML DB スキーマ',
      umlDesc: 'KyaMovVM プロジェクトのデータベース スキーマ',
      copyright: '© 2025 KyaMovVM プロジェクト. すべての権利予約。',
      pageNotFound: 'ページ開発中',
      pageNotFoundDesc: 'このページは開発中で、まもなく利用可能になります。',
      features: '機能',
      featuresDesc: 'KyaMovVM プロジェクトの主要機能を探索',
      backend: 'バックエンド ツール',
      backendDesc: 'SSH と HTTP インタラクション用の Python スクリプト',
      security: 'セキュリティ',
      securityDesc: 'Fail2Ban による監視と保護システム',
      testing: 'テスト',
      testingDesc: '手動および自動システムテストのための包括的ツール',
      githubRepo: 'GitHub リポジトリ',
      accessibility: 'アクセシビリティ',
      highContrast: 'ハイコントラスト',
      database: 'データベース',
      databaseDesc: 'データベース スキーマとシステム アーキテクチャを探索',
      mainPages: 'メイン',
      development: '開発',
      securityPages: 'セキュリティ',
      menu: 'メニュー',
      close: '閉じる',
      optimizePerformance: 'パフォーマンス最適化',
      exploreSchema: 'DB スキーマを探索',
      developmentPlan: '開発計画',
      domainDiagnostics: 'ドメイン診断'
    },
    ru: {
      project: 'KyaMovVM',
      subtitle: 'Инновационная виртуальная машина для современной разработки',
      demo3d: '3D Демонстрация',
      demo3dDesc: 'Интерактивная 3D модель автомобиля в киберпанк стиле',
      car3d: '3D Автомобиль',
      modelDesc: 'Модель автоматически вращается с неоновой подсветкой',
      aboutProject: 'О проекте KyaMovVM',
      innovations: 'Инновации',
      innovationsDesc: 'Современные подходы к разработке виртуальных машин с использованием передовых технологий.',
      performance: 'Производительность',
      performanceDesc: 'Оптимизированная архитектура для максимальной производительности и эффективности.',
      openSource: 'Открытый код',
      openSourceDesc: 'Проект с открытым исходным кодом, доступный для изучения и внесения вкладов.',
      umlDiagram: 'UML Схема БД',
      umlDesc: 'Схема базы данных проекта KyaMovVM',
      copyright: '© 2025 Проект KyaMovVM. Все права защищены.',
      pageNotFound: 'Страница в разработке',
      pageNotFoundDesc: 'Эта страница находится в разработке и скоро будет доступна.',
      features: 'Возможности',
      featuresDesc: 'Изучите ключевые функции проекта KyaMovVM',
      backend: 'Инструменты Backend',
      backendDesc: 'Python скрипты для взаимодействия с SSH и HTTP',
      security: 'Безопасность',
      securityDesc: 'Система мониторинга и защиты с Fail2Ban',
      testing: 'Тестирование',
      testingDesc: 'Комплексные инструменты для ручного и автоматического тестирования',
      githubRepo: 'GitHub репозиторий',
      accessibility: 'Доступность',
      highContrast: 'Высокий контраст',
      database: 'База данных',
      databaseDesc: 'Изучите схему базы данных и архитектуру системы',
      mainPages: 'Основные',
      development: 'Разработка',
      securityPages: 'Безопасность',
      menu: 'Меню',
      close: 'Закрыть',
      optimizePerformance: 'Оптимизация производительности',
      exploreSchema: 'Изучить схему БД',
      developmentPlan: 'План разработки',
      domainDiagnostics: 'Диагностика доменов'
    },
    en: {
      project: 'KyaMovVM',
      subtitle: 'Innovative virtual machine for modern development',
      demo3d: '3D Demonstration',
      demo3dDesc: 'Interactive 3D car model in cyberpunk style',
      car3d: '3D Car',
      modelDesc: 'Model rotates automatically with neon lighting',
      aboutProject: 'About KyaMovVM Project',
      innovations: 'Innovations',
      innovationsDesc: 'Modern approaches to virtual machine development using advanced technologies.',
      performance: 'Performance',
      performanceDesc: 'Optimized architecture for maximum performance and efficiency.',
      openSource: 'Open Source',
      openSourceDesc: 'Open source project available for study and contributions.',
      umlDiagram: 'UML DB Schema',
      umlDesc: 'Database schema of KyaMovVM project',
      copyright: '© 2025 KyaMovVM Project. All rights reserved.',
      pageNotFound: 'Page Under Development',
      pageNotFoundDesc: 'This page is under development and will be available soon.',
      features: 'Features',
      featuresDesc: 'Explore key features of KyaMovVM project',
      backend: 'Backend Tools',
      backendDesc: 'Python scripts for SSH and HTTP interaction',
      security: 'Security',
      securityDesc: 'Monitoring and protection system with Fail2Ban',
      testing: 'Testing',
      testingDesc: 'Comprehensive tools for manual and automatic testing',
      githubRepo: 'GitHub Repository',
      accessibility: 'Accessibility',
      highContrast: 'High Contrast',
      database: 'Database',
      databaseDesc: 'Explore database schema and system architecture',
      mainPages: 'Main',
      development: 'Development',
      securityPages: 'Security',
      menu: 'Menu',
      close: 'Close',
      optimizePerformance: 'Optimize Performance',
      exploreSchema: 'Explore DB Schema',
      developmentPlan: 'Development Plan',
      domainDiagnostics: 'Domain Diagnostics'
    }
  };

  const t = texts[language];

  const renderPlaceholderPage = (title: string) => (
    <div className="min-h-screen-safe">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className={`text-4xl font-bold mb-6 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent'
          }`}>
            {title}
          </h1>
          <Card className={`backdrop-blur-sm shadow-2xl ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90'
              : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
          }`}>
            <CardContent className="p-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.pageNotFound}
              </h2>
              <p className={`${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
              }`}>
                {t.pageNotFoundDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
      <Suspense fallback={<ComponentLoader highContrastMode={highContrastMode} />}>
        {children}
      </Suspense>
    );

    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'robots':
        return (
          <SuspenseWrapper>
            <RobotsHandler onComplete={() => {}} />
          </SuspenseWrapper>
        );
      case '404':
        return (
          <SuspenseWrapper>
            <NotFoundPage 
              language={language}
              onNavigateHome={() => handleNavigation('home')}
              onNavigateToUML={() => handleNavigation('uml')}
              highContrastMode={highContrastMode}
              requestedPath={requestedPath}
            />
          </SuspenseWrapper>
        );
      case 'uml':
        return (
          <SuspenseWrapper>
            <UMLPage language={language} isUmlOpen={isUmlOpen} setIsUmlOpen={setIsUmlOpen} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      case 'plan':
        return (
          <SuspenseWrapper>
            <PlanPage language={language} isUmlOpen={isUmlOpen} setIsUmlOpen={setIsUmlOpen} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      case 'docs':
        return (
          <SuspenseWrapper>
            <DocumentationPage language={language} isUmlOpen={isUmlOpen} setIsUmlOpen={setIsUmlOpen} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      case 'manual_tests':
        return (
          <SuspenseWrapper>
            <ManualTestsPage language={language} isUmlOpen={isUmlOpen} setIsUmlOpen={setIsUmlOpen} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      case 'login':
        return (
          <SuspenseWrapper>
            <LoginPage language={language} isUmlOpen={isUmlOpen} setIsUmlOpen={setIsUmlOpen} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      case 'api':
        return renderPlaceholderPage(language === 'ja' ? 'API ログ' : language === 'ru' ? 'API Логи' : 'API Logs');
      case 'fail2ban':
        return renderPlaceholderPage('Fail2Ban');
      case 'django_setup':
        return renderPlaceholderPage(language === 'ja' ? 'Django セットアップ' : language === 'ru' ? 'Настройка Django' : 'Django Setup');
      case 'docker_game':
        return renderPlaceholderPage(language === 'ja' ? 'Docker ゲーム' : language === 'ru' ? 'Docker Игра' : 'Docker Game');
      case 'modules':
        return renderPlaceholderPage(language === 'ja' ? 'モジュール' : language === 'ru' ? 'Модули' : 'Modules');
      case 'control':
        return renderPlaceholderPage(language === 'ja' ? 'コントロール' : language === 'ru' ? 'Управление' : 'Control');
      case 'crossref':
        return renderPlaceholderPage(language === 'ja' ? 'クロスリファレンス' : language === 'ru' ? 'Перекрестные ссылки' : 'Cross References');
      case 'json_intro':
        return renderPlaceholderPage(language === 'ja' ? 'JSON スキーマ' : language === 'ru' ? 'JSON Схема' : 'JSON Schema');
      case 'version_history':
        return (
          <SuspenseWrapper>
            <VersionHistoryPage language={language} onBack={() => handleNavigation('home')} highContrastMode={highContrastMode} />
          </SuspenseWrapper>
        );
      default:
        return (
          <SuspenseWrapper>
            <NotFoundPage 
              language={language}
              onNavigateHome={() => handleNavigation('home')}
              onNavigateToUML={() => handleNavigation('uml')}
              highContrastMode={highContrastMode}
              requestedPath={requestedPath}
            />
          </SuspenseWrapper>
        );
    }
  };

  const renderHomePage = () => (
    <div>
      {/* Hero Section with ULTRA-Optimized Image - LCP Critical */}
      <section className="section-spacing px-gutter relative hero-container lcp-element">
        {/* Enhanced Animated Background - FIXED: No rotation */}
        <div className="cyber-bg-pattern">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark"></div>
          <div className="cyber-grid-pattern opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-transparent to-cyber-pink/10"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* ULTRA-ENHANCED Hero Image/Animation with FIXED Dimensions - LCP Optimized */}
          <div 
            className="mb-8 layout-stable"
            style={{ 
              '--stable-height': '300px',
              '--stable-max-height': '400px',
              minHeight: '300px !important', // Fixed height prevents layout shift
              maxHeight: '400px !important',
              contain: 'layout size style paint',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div className="relative group w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* ULTRA-ENHANCED LCP Priority - Always load hero image immediately */}
              <div 
                className="w-full max-w-4xl mx-auto relative z-10 lcp-element"
                style={{ 
                  height: '300px !important', // Fixed height prevents CLS
                  aspectRatio: '16/9',
                  contain: 'strict',
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* ULTRA LCP Element - Hero Image with MAXIMUM priority */}
                {!heroImageError ? (
                  <ImageWithFallback
                    src={newHeroImage}
                    alt="KyaMovVM Cyberpunk Racing"
                    className="hero-image rounded-lg shadow-2xl border border-cyber-cyan/40 cyber-image-glow"
                    style={{ 
                      objectFit: 'cover',
                      contain: 'size layout style',
                      maxWidth: '100%',
                      width: '100%',
                      height: '300px',
                      aspectRatio: '16/9',
                      imageRendering: '-webkit-optimize-contrast',
                      opacity: '1',
                      visibility: 'visible',
                      display: 'block'
                    }}
                    width={800}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    onError={() => setHeroImageError(true)}
                    onLoad={() => {
                      console.log('KyaMovVM v5.0 - Hero image loaded - LCP candidate');
                    }}
                  />
                ) : (
                  /* Fallback to animated hero only on error */
                  <div 
                    className="w-full h-full bg-cyber-dark-secondary flex items-center justify-center"
                    style={{
                      height: '300px',
                      aspectRatio: '16/9',
                      contain: 'size layout style',
                      width: '100%',
                      maxWidth: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <AnimatedCarHero 
                      className="w-full h-full" 
                      connectionSpeed={connectionSpeed}
                    />
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/40 via-transparent to-transparent rounded-lg z-20"></div>
            </div>
          </div>
          
          {/* Enhanced Logo Display with Fixed Height - Quick render for LCP */}
          <div className="mb-6" style={{ 
            '--logo-width': '280px',
            '--logo-height': '70px',
            minHeight: '70px', 
            contain: 'layout size',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <KyaMovVMLogo 
              width={280} 
              height={70} 
              animated={!highContrastMode && connectionSpeed !== 'very-slow'} 
              highContrastMode={highContrastMode}
              className="mx-auto cyber-logo-stable"
            />
          </div>
          
          <p className={`text-lg md:text-xl font-semibold mb-6 max-w-3xl mx-auto hero-text-priority text-stable ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/90'
          }`}
            style={{
              minHeight: '1.5em', // Reserve space to prevent CLS
              lineHeight: '1.5',
              contain: 'layout style'
            }}
          >
            {t.subtitle}
          </p>

          {/* Enhanced Animated Heart - Simplified for slow connections */}
          <div className="mb-8 relative" style={{ minHeight: '60px', contain: 'layout' }}>
            <div className="heart-container flex justify-center">
              <div className={`heart text-3xl md:text-4xl ${
                connectionSpeed !== 'very-slow' ? 'cyber-pulse' : ''
              } relative ${
                highContrastMode ? 'text-red-500' : 'text-cyber-pink'
              }`}>
                ❤️
                {!highContrastMode && connectionSpeed !== 'very-slow' && (
                  <div className="absolute inset-0 text-cyber-pink blur-sm opacity-50">❤️</div>
                )}
              </div>
            </div>
          </div>

          {/* ULTRA-Enhanced Quick Navigation - Responsive Layout - Critical for LCP */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-12 pt-6"
            style={{
              minHeight: '120px', // Reserve space for buttons to prevent CLS
              contain: 'layout style'
            }}
          >
            <Button 
              onClick={() => handleNavigation('uml')} 
              size="lg"
              className={`btn btn-primary btn-stable font-bold shadow-lg transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto ${
                highContrastMode
                  ? 'bg-white text-black hover:bg-gray-200 border-4 border-white shadow-xl'
                  : 'bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-cyber-purple/80 hover:to-cyber-pink/80 hover:shadow-cyber-purple/25 text-white border-0'
              }`}
              style={{
                '--btn-min-width': '160px',
                '--btn-min-height': '48px'
              }}
            >
              <Database className="w-4 h-4 mr-2" />
              {t.database}
            </Button>
            <Button 
              onClick={() => handleNavigation('docs')} 
              variant="outline"
              size="lg"
              className={`btn btn-outline btn-stable font-bold transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto ${
                highContrastMode
                  ? 'border-4 border-white text-white hover:bg-white hover:text-black bg-transparent shadow-lg'
                  : 'border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-cyber-cyan/25'
              }`}
              style={{
                '--btn-min-width': '160px',
                '--btn-min-height': '48px'
              }}
            >
              {navigationGroups.main.find(link => link.id === 'docs')?.label}
            </Button>
            <Button 
              onClick={() => handleNavigation('plan')} 
              variant="outline" 
              size="lg"
              className={`btn btn-outline btn-stable font-bold transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto ${
                highContrastMode
                  ? 'border-4 border-white text-white hover:bg-white hover:text-black bg-transparent shadow-lg'
                  : 'border-2 border-cyber-pink text-cyber-pink hover:bg-cyber-pink/10 hover:shadow-cyber-pink/25'
              }`}
              style={{
                '--btn-min-width': '160px',
                '--btn-min-height': '48px'
              }}
            >
              {t.developmentPlan}
            </Button>
          </div>
        </div>
      </section>

      {/* Database Schema Preview Section */}
      <section className="section-spacing px-gutter relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-cyan/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              highContrastMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent'
            }`}>
              {t.database}
            </h2>
            <p className={`font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.databaseDesc}
            </p>
          </div>
          
          <Card className={`max-w-4xl mx-auto backdrop-blur-sm shadow-2xl transition-all duration-300 cursor-pointer group card-stable ${
            highContrastMode
              ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
              : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20 hover:shadow-cyber-purple/30'
          }`}
                onClick={() => setIsUmlOpen(true)}
                style={{
                  '--card-min-height': '300px',
                  contain: 'layout style'
                }}>
            <CardHeader>
              <CardTitle className={`text-center font-bold flex items-center justify-center space-x-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-purple'
              }`}>
                <Database className="w-5 h-5 md:w-6 md:h-6" />
                <span>{t.umlDiagram}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <div className={`rounded-lg p-3 md:p-4 shadow-lg ${
                  highContrastMode 
                    ? 'bg-white border-4 border-gray-400'
                    : 'bg-white border border-cyber-purple/20'
                }`}>
                  <div className="transform scale-75 origin-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-cyan text-cyber-dark'
                      }`}>Users</div>
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-pink text-white'
                      }`}>Movies</div>
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-purple text-white'
                      }`}>Crew</div>
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-neon-green text-cyber-dark'
                      }`}>Favorites</div>
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-electric-blue text-white'
                      }`}>Genres</div>
                      <div className={`p-2 rounded text-center font-bold ${
                        highContrastMode
                          ? 'bg-black text-white border-4 border-gray-600'
                          : 'bg-cyber-light-pink text-cyber-dark'
                      }`}>Distribution</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className={`text-center text-sm mt-4 font-medium ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
              }`}>
                {t.umlDesc}
              </p>
              <div className="text-center mt-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('uml');
                  }}
                  className={`btn btn-primary font-bold w-full sm:w-auto ${
                    highContrastMode
                      ? 'bg-white text-black hover:bg-gray-200 border-4 border-white shadow-lg'
                      : 'bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:from-cyber-purple/80 hover:to-cyber-cyan/80'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t.exploreSchema}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing px-gutter relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark/80 to-cyber-dark-secondary/80"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              highContrastMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent'
            }`}>
              {t.features}
            </h2>
            <p className={`max-w-2xl mx-auto font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.featuresDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8"
            style={{
              minHeight: '300px', // Reserve space for cards to prevent CLS
              contain: 'layout style'
            }}
          >
            <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 card-stable ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20 hover:shadow-cyber-cyan/30'
            }`}
              style={{
                '--card-min-height': '200px'
              }}>
              <CardHeader>
                <CardTitle className={`font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  {t.backend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {t.backendDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 card-stable ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20 hover:shadow-cyber-pink/30'
            }`}
              style={{
                '--card-min-height': '200px'
              }}>
              <CardHeader>
                <CardTitle className={`font-bold text-stable ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  {t.security}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium text-stable ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
                }`}>
                  {t.securityDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className={`text-center backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 card-stable ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20 hover:shadow-cyber-purple/30'
            }`}
              style={{
                '--card-min-height': '200px'
              }}>
              <CardHeader>
                <CardTitle className={`font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`}>
                  {t.testing}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
                }`}>
                  {t.testingDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3D Car Demo Section - Lazy loaded */}
      <section className="section-spacing px-gutter relative">
        <div className="cyber-grid-pattern opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              highContrastMode 
                ? 'text-white' 
                : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent'
            }`}>
              {t.demo3d}
            </h2>
            <p className={`font-medium ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.demo3dDesc}
            </p>
          </div>
          
          <Suspense fallback={<ComponentLoader highContrastMode={highContrastMode} />}>
            <CarDemo title={t.car3d} description={t.modelDesc} />
          </Suspense>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing px-gutter relative">
        <div className="absolute inset-0 bg-gradient-to-l from-cyber-dark/80 to-cyber-dark-secondary/80"></div>
        <div className="container mx-auto relative z-10">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent'
          }`}>
            {t.aboutProject}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20 hover:shadow-cyber-cyan/30'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-cyan'
                }`}>
                  {t.innovations}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
                }`}>
                  {t.innovationsDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-pink/30 bg-cyber-dark-secondary/90 shadow-cyber-pink/20 hover:shadow-cyber-pink/30'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-pink'
                }`}>
                  {t.performance}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-pink/80'
                }`}>
                  {t.performanceDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className={`backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 ${
              highContrastMode
                ? 'border-4 border-white bg-gray-900/90 hover:bg-gray-800/90 shadow-xl'
                : 'border-cyber-purple/30 bg-cyber-dark-secondary/90 shadow-cyber-purple/20 hover:shadow-cyber-purple/30'
            }`}>
              <CardHeader>
                <CardTitle className={`font-bold ${
                  highContrastMode ? 'text-white' : 'text-cyber-purple'
                }`}>
                  {t.openSource}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`font-medium ${
                  highContrastMode ? 'text-gray-300' : 'text-cyber-purple/80'
                }`}>
                  {t.openSourceDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );

  // ULTRA-Enhanced dropdown management with perfect positioning - FIXED horizontal drift
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Don't close if clicking inside dropdown or dropdown button
      if (
        target &&
        !target.closest('.dropdown-menu') &&
        !target.closest('.dropdown-container')
      ) {
        setActiveDropdown(null);
      }
    };

    const handleScroll = () => {
      // Close dropdown on scroll to prevent positioning issues
      setActiveDropdown(null);
    };

    const handleResize = () => {
      // Close dropdown on resize to prevent positioning issues
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [activeDropdown]);

  // ULTRA-Enhanced dropdown positioning when they open - FIXED horizontal and vertical positioning
  useEffect(() => {
    if (activeDropdown) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        const button = document.querySelector(`[data-dropdown="${activeDropdown}"]`);
        const dropdown = document.getElementById(`${activeDropdown}-dropdown`);
        
        if (button && dropdown) {
          const rect = button.getBoundingClientRect();
          const dropdownRect = dropdown.getBoundingClientRect();
          const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
          };
          
          // FIXED: Calculate optimal position with NO horizontal drift
          let top = rect.bottom + 8;
          let left = rect.left; // Start exactly at button position
          
          // FIXED: Adjust only if dropdown would go completely off screen
          if (left + dropdownRect.width > viewport.width - 16) {
            // Align right edge of dropdown with right edge of button instead of shifting left
            left = rect.right - dropdownRect.width;
          }
          
          // FIXED: Only adjust top if dropdown would go off bottom of screen
          if (top + dropdownRect.height > viewport.height - 16) {
            top = rect.top - dropdownRect.height - 8;
          }
          
          // FIXED: Ensure dropdown doesn't go off left edge (minimum margin)
          if (left < 16) {
            left = 16;
          }
          
          // FIXED: Ensure dropdown doesn't go off top edge (minimum margin)
          if (top < 16) {
            top = rect.bottom + 8;
          }
          
          // Apply position with important to override any conflicting styles
          dropdown.style.setProperty('top', `${top}px`, 'important');
          dropdown.style.setProperty('left', `${left}px`, 'important');
          dropdown.style.setProperty('position', 'fixed', 'important');
          dropdown.style.setProperty('z-index', '9999', 'important');
          dropdown.style.setProperty('transform', 'none', 'important'); // Prevent any transforms
        }
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [activeDropdown]);

  // Show Japanese engagement page
  if (showJapaneseEngagement) {
    return (
      <Suspense fallback={<ComponentLoader highContrastMode={highContrastMode} />}>
        <JapaneseEngagementPage
          language={language}
          highContrastMode={highContrastMode}
          loadingProgress={japaneseLoadingProgress}
          onComplete={() => setShowJapaneseEngagement(false)}
        />
      </Suspense>
    );
  }

  // Enhanced high contrast mode application
  useEffect(() => {
    if (highContrastMode) {
      document.body.classList.add('high-contrast');
      document.documentElement.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
      document.documentElement.classList.remove('high-contrast');
    }
    
    return () => {
      document.body.classList.remove('high-contrast');
      document.documentElement.classList.remove('high-contrast');
    };
  }, [highContrastMode]);

  return (
    <div className={`min-h-screen-safe flex flex-col ${highContrastMode ? 'bg-black text-white' : 'bg-background'}`}>
      {/* Resource Hints for Performance - LCP Critical */}
      <ResourceHints connectionSpeed={connectionSpeed} />

      {/* Global Loading Indicator */}
      {isInitialLoad && (
        <GlobalLoadingIndicator
          language={language}
          highContrastMode={highContrastMode}
          isOptimized={isOptimized}
        />
      )}

      {/* ULTRA-Enhanced Header with improved navigation and perfect dropdown positioning */}
      <header className={`header fixed top-0 left-0 right-0 backdrop-blur-sm border-b z-50 ${
        highContrastMode 
          ? 'bg-black/95 border-white/20' 
          : 'bg-surface/95 border-primary/20'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleNavigation('home')}
                className="hover:opacity-80 transition-opacity flex items-center space-x-2"
                title="KyaMovVM - ホーム"
              >
                <KyaMovVMLogo 
                  width={120} 
                  height={28} 
                  animated={false} 
                  highContrastMode={highContrastMode}
                />
              </button>
            </div>
            
            {/* ULTRA-Enhanced Desktop Navigation with perfect contrast and positioning */}
            <nav className="hidden xl:block" role="navigation" aria-label="メインメニュー">
              {/* Main Row - Core Pages with Icons */}
              <div className="flex items-center space-x-1 mb-1">
                {navigationGroups.main.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = currentPage === link.id;
                  const activeStyles = highContrastMode
                    ? 'text-black bg-white border-2 border-white shadow-lg'
                    : link.highlight
                    ? `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`
                    : `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`;
                  const inactiveStyles = highContrastMode
                    ? 'text-white hover:bg-white/20 border-2 border-white/50'
                    : `text-${link.color} hover:bg-${link.color}/10 border border-transparent hover:border-${link.color}/30`;

                  return (
                    <button
                      key={link.id}
                      className={`nav-button-enhanced flex items-center space-x-2 ${
                        isActive ? activeStyles : inactiveStyles
                      }`}
                      onClick={() => handleNavigation(link.id)}
                      title={link.title}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Secondary Row - ULTRA-Enhanced Dropdowns with FIXED positioning */}
              <div className="flex items-center space-x-1">
                {/* Development Dropdown with FIXED positioning */}
                <div className="dropdown-container relative">
                  <button
                    data-dropdown="development"
                    className={`nav-button-enhanced flex items-center space-x-2 ${
                      highContrastMode
                        ? 'text-white hover:bg-white/20 border-2 border-white/50'
                        : 'text-primary hover:bg-primary/10 border border-transparent hover:border-primary/30'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('development');
                    }}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>{t.development}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === 'development' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'development' && (
                    <div 
                      id="development-dropdown"
                      className={`dropdown-menu dropdown-menu-fixed ${
                        highContrastMode ? 'high-contrast' : ''
                      }`}
                    >
                      {navigationGroups.development.map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <button 
                            key={link.id}
                            className={`dropdown-menu-item ${
                              currentPage === link.id ? 'active' : ''
                            }`}
                            onClick={() => handleNavigation(link.id)}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{link.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Security Dropdown with FIXED positioning */}
                <div className="dropdown-container relative">
                  <button 
                    data-dropdown="security"
                    className={`nav-button-enhanced hover:opacity-90 transition-all duration-300 whitespace-nowrap text-xs px-3 py-2 rounded-lg font-bold flex items-center space-x-1 ${
                      highContrastMode 
                        ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                        : 'text-cyber-pink hover:bg-cyber-pink/10 border border-transparent hover:border-cyber-pink/30'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown('security');
                    }}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{t.securityPages}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === 'security' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === 'security' && (
                    <div 
                      id="security-dropdown"
                      className={`dropdown-menu dropdown-menu-fixed security-dropdown ${
                        highContrastMode ? 'high-contrast' : ''
                      }`}
                    >
                      {navigationGroups.security.map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <button 
                            key={link.id}
                            className={`dropdown-menu-item ${
                              currentPage === link.id ? 'active' : ''
                            }`}
                            onClick={() => handleNavigation(link.id)}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{link.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Compact Navigation for smaller screens */}
            <nav className="hidden lg:flex xl:hidden space-x-1" role="navigation" aria-label="メインメニュー">
              {navigationGroups.main.slice(0, 3).map((link) => {
                const IconComponent = link.icon;
                return (
                  <button 
                    key={link.id}
                    className={`hover:opacity-90 transition-all duration-300 whitespace-nowrap text-xs px-2 py-2 rounded-lg font-bold flex items-center space-x-1 ${
                      currentPage === link.id 
                        ? (highContrastMode 
                            ? 'text-black bg-white border-2 border-white shadow-lg' 
                            : link.highlight 
                              ? `text-white bg-${link.color} border border-${link.color}/20`
                              : `text-white bg-${link.color} border border-${link.color}/20`
                          )
                        : (highContrastMode 
                            ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                            : `text-${link.color} hover:bg-${link.color}/10 border border-transparent hover:border-${link.color}/30`
                          )
                    }`}
                    onClick={() => handleNavigation(link.id)}
                    title={link.title}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{link.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsUmlOpen(true)}
                className={`hidden sm:flex text-sm font-bold ${
                  highContrastMode 
                    ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                    : 'text-cyber-cyan hover:bg-cyber-cyan/10 border border-transparent hover:border-cyber-cyan/30'
                }`}
                title="UML データベース スキーマ"
              >
                <Database className="w-4 h-4 mr-1" />
                DB
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleLanguage}
                className={`hidden sm:flex text-sm font-bold ${
                  highContrastMode 
                    ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                    : 'text-cyber-pink hover:bg-cyber-pink/10 border border-transparent hover:border-cyber-pink/30'
                }`}
                title={language === 'ja' ? "ロシア語に切り替え" : language === 'ru' ? "英語に切り替え" : "日本語に切り替え"}
              >
                <Languages className="w-4 h-4 mr-1" />
                <span className="text-xs">{getLanguageFlag()}</span>
                <span className="ml-1">{getLanguageCode()}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleHighContrast}
                className={`hidden sm:flex text-sm font-bold ${
                  highContrastMode 
                    ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                    : 'text-cyber-purple hover:bg-cyber-purple/10 border border-transparent hover:border-cyber-purple/30'
                }`}
                title={t.accessibility}
              >
                <Accessibility className="w-4 h-4 mr-1" />
                A11y
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowPerformanceOptimizer(true)}
                className={`hidden sm:flex text-sm font-bold ${
                  isOptimized
                    ? (highContrastMode 
                        ? 'text-black bg-white border-2 border-white' 
                        : 'text-cyber-dark bg-cyber-neon-green border border-cyber-neon-green/30')
                    : (highContrastMode 
                        ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                        : 'text-cyber-neon-green hover:bg-cyber-neon-green/10 border border-transparent hover:border-cyber-neon-green/30')
                }`}
                title={t.optimizePerformance}
              >
                <Settings className="w-4 h-4 mr-1" />
                OPT
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowDomainDiagnostics(true)}
                className={`hidden sm:flex text-sm font-bold ${
                  highContrastMode 
                    ? 'text-white hover:bg-white/20 border-2 border-white/50 hover:border-white' 
                    : 'text-cyber-electric-blue hover:bg-cyber-electric-blue/10 border border-transparent hover:border-cyber-electric-blue/30'
                }`}
                title={t.domainDiagnostics}
              >
                <Globe className="w-4 h-4 mr-1" />
                DNS
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`lg:hidden font-bold ${
                  highContrastMode 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title={isMenuOpen ? t.close : t.menu}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Menu with better navigation */}
          {isMenuOpen && (
            <div className={`lg:hidden mt-4 pb-4 border-t bg-surface ${
              highContrastMode ? 'border-white/20' : 'border-primary/20'
            }`}>
              <nav className="pt-4" role="navigation" aria-label="モバイルメニュー">
                {/* Main Pages */}
                <div className="mb-6">
                  <h3 className={`text-xs font-bold mb-3 px-3 flex items-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    <Home className="w-4 h-4" />
                    <span>{t.mainPages}</span>
                  </h3>
                  <div className="space-y-1">
                    {navigationGroups.main.map((link) => {
                      const IconComponent = link.icon;
                      const isActive = currentPage === link.id;
                      const activeStyles = highContrastMode
                        ? 'text-black bg-white border-2 border-white shadow-lg'
                        : link.highlight
                        ? `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`
                        : `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`;
                      const inactiveStyles = highContrastMode
                        ? 'text-white hover:bg-white/20 border-2 border-white/50'
                        : `text-${link.color} hover:bg-${link.color}/10 border border-transparent`;

                      return (
                        <button
                          key={link.id}
                          className={`nav-button-enhanced w-full justify-start flex items-center space-x-2 ${
                            isActive ? activeStyles : inactiveStyles
                          }`}
                          onClick={() => handleNavigation(link.id)}
                          title={link.title}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{link.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Development Pages */}
                <div className="mb-6">
                  <h3 className={`text-xs font-bold mb-3 px-3 flex items-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-cyan'
                  }`}>
                    <Code className="w-4 h-4" />
                    <span>{t.development}</span>
                  </h3>
                  <div className="space-y-1">
                    {navigationGroups.development.map((link) => {
                      const IconComponent = link.icon;
                      const isActive = currentPage === link.id;
                      const activeStyles = highContrastMode
                        ? 'text-black bg-white border-2 border-white shadow-lg'
                        : `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`;
                      const inactiveStyles = highContrastMode
                        ? 'text-white hover:bg-white/20 border-2 border-white/50'
                        : `text-${link.color} hover:bg-${link.color}/10 border border-transparent`;

                      return (
                        <button
                          key={link.id}
                          className={`nav-button-enhanced w-full justify-start flex items-center space-x-2 ${
                            isActive ? activeStyles : inactiveStyles
                          }`}
                          onClick={() => handleNavigation(link.id)}
                          title={link.title}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{link.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Security Pages */}
                <div className="mb-6">
                  <h3 className={`text-xs font-bold mb-3 px-3 flex items-center space-x-2 ${
                    highContrastMode ? 'text-white' : 'text-cyber-pink'
                  }`}>
                    <Shield className="w-4 h-4" />
                    <span>{t.securityPages}</span>
                  </h3>
                  <div className="space-y-1">
                    {navigationGroups.security.map((link) => {
                      const IconComponent = link.icon;
                      const isActive = currentPage === link.id;
                      const activeStyles = highContrastMode
                        ? 'text-black bg-white border-2 border-white shadow-lg'
                        : `text-white bg-${link.color} border border-${link.color}/20 shadow-lg`;
                      const inactiveStyles = highContrastMode
                        ? 'text-white hover:bg-white/20 border-2 border-white/50'
                        : `text-${link.color} hover:bg-${link.color}/10 border border-transparent`;

                      return (
                        <button
                          key={link.id}
                          className={`nav-button-enhanced w-full justify-start flex items-center space-x-2 ${
                            isActive ? activeStyles : inactiveStyles
                          }`}
                          onClick={() => handleNavigation(link.id)}
                          title={link.title}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span>{link.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2 px-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsUmlOpen(true)}
                    className={`text-xs font-bold flex items-center space-x-2 ${
                      highContrastMode 
                        ? 'border-2 border-white text-white hover:bg-white/20' 
                        : 'border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10'
                    }`}
                  >
                    <Database className="w-3 h-3" />
                    <span>データベース</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleLanguage}
                    className={`text-xs font-bold flex items-center space-x-2 ${
                      highContrastMode 
                        ? 'border-2 border-white text-white hover:bg-white/20' 
                        : 'border-cyber-pink/30 text-cyber-pink hover:bg-cyber-pink/10'
                    }`}
                  >
                    <Languages className="w-3 h-3" />
                    <span className="text-xs">{getLanguageFlag()}</span>
                    <span>{getLanguageCode()}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPerformanceOptimizer(true)}
                    className={`text-xs font-bold flex items-center space-x-2 ${
                      highContrastMode 
                        ? 'border-2 border-white text-white hover:bg-white/20' 
                        : 'border-cyber-neon-green/30 text-cyber-neon-green hover:bg-cyber-neon-green/10'
                    }`}
                  >
                    <Settings className="w-3 h-3" />
                    <span>最適化</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDomainDiagnostics(true)}
                    className={`text-xs font-bold flex items-center space-x-2 ${
                      highContrastMode 
                        ? 'border-2 border-white text-white hover:bg-white/20' 
                        : 'border-cyber-electric-blue/30 text-cyber-electric-blue hover:bg-cyber-electric-blue/10'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>DNS</span>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow pt-20">
        {renderCurrentPage()}
      </main>

      {/* UML Modal for all pages */}
      <Suspense fallback={null}>
        <UMLModal isOpen={isUmlOpen} onClose={() => setIsUmlOpen(false)} language={language} highContrastMode={highContrastMode} />
      </Suspense>

      {/* Performance Optimizer Modal - FIXED positioning */}
      {showPerformanceOptimizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-auto">
            <Suspense fallback={<ComponentLoader highContrastMode={highContrastMode} />}>
              <PerformanceOptimizer
                language={language}
                highContrastMode={highContrastMode}
                isOptimized={isOptimized}
                onOptimizationChange={handleOptimizationChange}
                onClose={() => setShowPerformanceOptimizer(false)}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Domain Diagnostics Modal - FIXED positioning */}
      {showDomainDiagnostics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto">
            <Suspense fallback={<ComponentLoader highContrastMode={highContrastMode} />}>
              <DomainDiagnostics
                language={language}
                highContrastMode={highContrastMode}
                onClose={() => setShowDomainDiagnostics(false)}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Mobile Language Toggle */}
      <MobileLanguageToggle 
        language={language} 
        onToggle={toggleLanguage} 
        highContrastMode={highContrastMode} 
      />

      {/* Loading Timer */}
      <LoadingTimer
        language={language}
        highContrastMode={highContrastMode}
        onOptimizationToggle={handleOptimizationChange}
        isOptimized={isOptimized}
      />

      {/* Version Indicator */}
      <VersionIndicator
        language={language}
        onVersionHistoryClick={() => handleNavigation('version_history')}
        highContrastMode={highContrastMode}
      />

      {/* CLEANED Footer - Removed personal information */}
      <footer className={`mt-auto border-t ${
        highContrastMode ? 'border-white/20 bg-black' : 'border-cyber-cyan/20 bg-cyber-dark-secondary'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mb-4">
              <KyaMovVMLogo 
                width={160} 
                height={40} 
                animated={false} 
                highContrastMode={highContrastMode}
                className="mx-auto opacity-80"
              />
            </div>
            <p className={`text-sm mb-4 ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.copyright}
            </p>
            <div className="flex justify-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://github.com', '_blank')}
                className={`text-xs font-bold ${
                  highContrastMode
                    ? 'text-white hover:bg-white/20'
                    : 'text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
              >
                <Github className="w-4 h-4 mr-2" />
                {t.githubRepo}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
