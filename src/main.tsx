import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import '../styles/globals.css'

// Performance monitoring for v65
if ('performance' in window && 'PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`KyaMovVM v65 - LCP: ${entry.startTime}ms`);
        }
      });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.log('KyaMovVM v65 - PerformanceObserver not supported');
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('KyaMovVM v65 - SW registered:', registration);
      })
      .catch((registrationError) => {
        console.log('KyaMovVM v65 - SW registration failed:', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)