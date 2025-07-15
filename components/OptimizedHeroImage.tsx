// @ts-nocheck
import { useState, useEffect, useRef } from 'react';

interface OptimizedHeroImageProps {
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'eager' | 'lazy';
  connectionSpeed: 'fast' | 'slow' | 'very-slow';
}

export default function OptimizedHeroImage({ 
  alt, 
  className = '', 
  style, 
  loading = 'eager',
  connectionSpeed 
}: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create optimized SVG placeholder for very slow connections
  const createSVGPlaceholder = () => {
    const svg = `
      <svg width="800" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyberpunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#fb04ff;stop-opacity:0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="800" height="300" fill="#0a0a0f"/>
        <rect width="800" height="300" fill="url(#cyberpunkGrad)" opacity="0.3"/>
        
        <!-- Grid pattern -->
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="800" height="300" fill="url(#grid)"/>
        
        <!-- Central car silhouette -->
        <g transform="translate(400,150)" filter="url(#glow)">
          <!-- Simplified car shape -->
          <path d="M-80,20 L-60,0 L-40,-10 L40,-10 L60,0 L80,20 L80,40 L-80,40 Z" 
                fill="#00e5ff" opacity="0.8"/>
          
          <!-- Wheels -->
          <circle cx="-50" cy="35" r="12" fill="#fb04ff" opacity="0.9"/>
          <circle cx="50" cy="35" r="12" fill="#fb04ff" opacity="0.9"/>
          
          <!-- Lights -->
          <circle cx="70" cy="10" r="4" fill="#39ff14" opacity="0.9"/>
          <circle cx="70" cy="25" r="4" fill="#39ff14" opacity="0.9"/>
          
          <!-- Windshield -->
          <path d="M-40,-10 L-20,-15 L20,-15 L40,-10 L30,0 L-30,0 Z" 
                fill="#8b5cf6" opacity="0.6"/>
        </g>
        
        <!-- Animated elements for very slow connections -->
        ${connectionSpeed !== 'very-slow' ? `
          <g opacity="0.7">
            <circle cx="100" cy="50" r="2" fill="#00e5ff">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="250" r="2" fill="#fb04ff">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="200" r="1.5" fill="#39ff14">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>
        ` : ''}
        
        <!-- Title text -->
        <text x="400" y="280" text-anchor="middle" fill="#00e5ff" 
              font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
              opacity="0.8">KyaMovVM Cyberpunk Racing</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Create low-quality placeholder using canvas
  const createCanvasPlaceholder = () => {
    if (!canvasRef.current) return '';
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = 40;
    canvas.height = 15;

    // Create a very low-res version
    const gradient = ctx.createLinearGradient(0, 0, 40, 15);
    gradient.addColorStop(0, '#00e5ff');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#fb04ff');

    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, 40, 15);
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, 40, 15);

    // Simple car shape
    ctx.fillStyle = '#00e5ff';
    ctx.globalAlpha = 0.8;
    ctx.fillRect(10, 6, 20, 6);
    ctx.fillRect(12, 4, 16, 8);

    return canvas.toDataURL('image/webp', 0.1);
  };

  useEffect(() => {
    // Preload the image for fast connections
    if (connectionSpeed === 'fast' && !error) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
      img.src = '/favicon.svg';
    } else {
      // For slow connections, mark as loaded immediately
      setIsLoaded(true);
    }
  }, [connectionSpeed, error]);

  // Performance optimizations
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.loading = loading;
      imgRef.current.fetchPriority = loading === 'eager' ? 'high' : 'low';
      imgRef.current.decoding = 'sync';
    }
  }, [loading]);

  // For very slow connections or errors, use SVG
  if (connectionSpeed === 'very-slow' || error) {
    return (
      <div className="relative w-full h-full">
        <img
          ref={imgRef}
          src={createSVGPlaceholder()}
          alt={alt}
          className={`${className} w-full h-full object-cover`}
          style={style}
          loading={loading}
          decoding="sync"
          onLoad={() => setIsLoaded(true)}
        />
        <canvas 
          ref={canvasRef} 
          className="hidden" 
          aria-hidden="true"
        />
      </div>
    );
  }

  // For slow connections, use canvas placeholder first
  if (connectionSpeed === 'slow') {
    return (
      <div className="relative w-full h-full">
        {!isLoaded && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 via-cyber-purple/20 to-cyber-pink/20 animate-pulse"
            style={{ aspectRatio: '16/9' }}
          />
        )}
        <img
          ref={imgRef}
          src={createSVGPlaceholder()}
          alt={alt}
          className={`${className} w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          style={style}
          loading={loading}
          decoding="sync"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
        <canvas 
          ref={canvasRef} 
          className="hidden" 
          aria-hidden="true"
        />
      </div>
    );
  }

  // For fast connections, try to load the actual image with placeholder
  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/30 via-cyber-purple/30 to-cyber-pink/30 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={isLoaded ? '/favicon.svg' : createSVGPlaceholder()}
        alt={alt}
        className={`${className} w-full h-full object-cover transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-80'
        }`}
        style={style}
        loading={loading}
        decoding="sync"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
      <canvas 
        ref={canvasRef} 
        className="hidden" 
        aria-hidden="true"
      />
    </div>
  );
}