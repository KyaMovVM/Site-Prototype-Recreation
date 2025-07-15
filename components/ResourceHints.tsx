// @ts-nocheck
import { useEffect } from 'react';

interface ResourceHintsProps {
  connectionSpeed: 'fast' | 'slow' | 'very-slow';
}

export default function ResourceHints({ connectionSpeed }: ResourceHintsProps) {
  useEffect(() => {
    // Only add resource hints if not already present
    const existingHints = document.querySelectorAll('link[data-resource-hint]');
    if (existingHints.length > 0) return;

    const head = document.head;
    
    // Critical CSS preload
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = '/styles/critical.css';
    criticalCSS.as = 'style';
    criticalCSS.setAttribute('data-resource-hint', 'critical-css');
    head.appendChild(criticalCSS);

    // Hero image preload - highest priority
    const heroImagePreload = document.createElement('link');
    heroImagePreload.rel = 'preload';
    heroImagePreload.as = 'image';
    heroImagePreload.setAttribute('fetchpriority', 'high');
    heroImagePreload.setAttribute('data-resource-hint', 'hero-image');
    
    // Use different images based on connection speed
    if (connectionSpeed === 'fast') {
      // Preload the main hero image for fast connections
      heroImagePreload.href = '/favicon.svg';
      heroImagePreload.type = 'image/png';
    } else {
      // For slow connections, we'll use SVG so no image preload needed
      heroImagePreload.remove();
    }
    
    if (connectionSpeed === 'fast') {
      head.appendChild(heroImagePreload);
    }

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap';
    fontPreload.as = 'style';
    fontPreload.setAttribute('data-resource-hint', 'font');
    head.appendChild(fontPreload);

    // DNS prefetch for external resources
    const dnsPrefetches = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.github.com'
    ];

    dnsPrefetches.forEach(domain => {
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      dnsPrefetch.setAttribute('data-resource-hint', 'dns-prefetch');
      head.appendChild(dnsPrefetch);
    });

    // Preconnect to critical origins
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnects.forEach(origin => {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = origin;
      preconnect.crossOrigin = 'anonymous';
      preconnect.setAttribute('data-resource-hint', 'preconnect');
      head.appendChild(preconnect);
    });

    // Module preload for critical JavaScript (if needed)
    if (connectionSpeed === 'fast') {
      const modulePreload = document.createElement('link');
      modulePreload.rel = 'modulepreload';
      modulePreload.href = '/src/main.tsx';
      modulePreload.setAttribute('data-resource-hint', 'module');
      head.appendChild(modulePreload);
    }

    // Viewport meta tag optimization
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');

    // Add performance hints meta tags
    const performanceHints = [
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#0a0a0f' },
      { name: 'color-scheme', content: 'dark light' },
      { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' }
    ];

    performanceHints.forEach(hint => {
      const existingMeta = document.querySelector(
        hint['http-equiv'] 
          ? `meta[http-equiv="${hint['http-equiv']}"]`
          : `meta[name="${hint.name}"]`
      );
      
      if (!existingMeta) {
        const meta = document.createElement('meta');
        if (hint['http-equiv']) {
          meta.setAttribute('http-equiv', hint['http-equiv']);
        } else {
          meta.setAttribute('name', hint.name);
        }
        meta.setAttribute('content', hint.content);
        meta.setAttribute('data-resource-hint', 'performance');
        head.appendChild(meta);
      }
    });

    // Add preload for critical CSS if not inlined
    const criticalCSSLink = document.createElement('style');
    criticalCSSLink.setAttribute('data-critical', 'true');
    criticalCSSLink.textContent = `
      /* Critical above-the-fold styles for immediate LCP */
      body { 
        font-family: 'Inter', system-ui, sans-serif; 
        background: #0a0a0f; 
        color: #ffffff; 
        margin: 0;
        visibility: visible;
      }
      .hero-container { 
        position: relative; 
        padding: 2rem 1rem; 
        min-height: 100vh; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
      }
      .hero-image { 
        width: 100%; 
        height: 300px; 
        object-fit: cover; 
        border-radius: 8px; 
        display: block;
      }
      .layout-stable { 
        min-height: 300px; 
        max-height: 400px; 
        margin-bottom: 2rem; 
      }
    `;
    head.appendChild(criticalCSSLink);

    // Cleanup function
    return () => {
      const hints = document.querySelectorAll('[data-resource-hint]');
      hints.forEach(hint => hint.remove());
      
      const criticalStyle = document.querySelector('style[data-critical]');
      if (criticalStyle) criticalStyle.remove();
    };
  }, [connectionSpeed]);

  useEffect(() => {
    // Optimize image loading priority
    const heroImages = document.querySelectorAll('.hero-image');
    heroImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'eager';
        img.fetchPriority = 'high';
        img.decoding = 'sync'; // Synchronous decoding for LCP
      }
    });

    // Add intersection observer for non-critical images
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      lazyImages.forEach(img => imageObserver.observe(img));

      return () => {
        lazyImages.forEach(img => imageObserver.unobserve(img));
      };
    }
  }, []);

  // Performance monitoring for LCP
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            
            // Auto-optimize if LCP is poor
            if (entry.startTime > 2500) {
              console.warn('Poor LCP detected:', entry.startTime);
              // Could trigger optimizations here
            }
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP observer not supported');
      }

      return () => observer.disconnect();
    }
  }, []);

  // Return null as this component only manages head elements
  return null;
}