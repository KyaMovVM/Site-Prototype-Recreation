import { useState, useEffect } from 'react';

interface AnimatedCarHeroProps {
  className?: string;
}

export default function AnimatedCarHero({ className = "" }: AnimatedCarHeroProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Keep animation running for engagement
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 10000); // Stop after 10 seconds to save battery

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          
          {/* Neon Glow Effects */}
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Car Gradient */}
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#fb04ff"/>
            <stop offset="100%" stopColor="#00e5ff"/>
          </linearGradient>
          
          {/* Hair Gradient */}
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb04ff"/>
            <stop offset="100%" stopColor="#f48fb1"/>
          </linearGradient>
          
          {/* Speed Lines */}
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0"/>
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="800" height="400" fill="#0a0a0f"/>
        <rect width="800" height="400" fill="url(#grid)" opacity="0.5"/>
        
        {/* Speed Lines (animated) */}
        {isAnimating && [...Array(6)].map((_, i) => (
          <g key={i}>
            <line
              x1="0"
              y1={100 + i * 40}
              x2="200"
              y2={100 + i * 40}
              stroke="url(#speedGradient)"
              strokeWidth="2"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 800,0; 0,0"
                dur={`${1.5 + i * 0.2}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}
        
        {/* Car Base */}
        <g transform="translate(350, 200)">
          {/* Car Shadow */}
          <ellipse cx="0" cy="80" rx="120" ry="15" fill="#000" opacity="0.3"/>
          
          {/* Car Body */}
          <path
            d="M -100 0 L 100 0 L 120 20 L 120 60 L -120 60 L -120 20 Z"
            fill="url(#carGradient)"
            filter="url(#neonGlow)"
          />
          
          {/* Car Top */}
          <path
            d="M -60 0 L 60 0 L 80 -40 L -80 -40 Z"
            fill="url(#carGradient)"
            opacity="0.9"
            filter="url(#neonGlow)"
          />
          
          {/* Windows */}
          <path
            d="M -55 -5 L 55 -5 L 75 -35 L -75 -35 Z"
            fill="#4dd0e1"
            opacity="0.7"
          />
          
          {/* Wheels */}
          <circle cx="-60" cy="60" r="25" fill="#1a1a2e" stroke="#00e5ff" strokeWidth="3"/>
          <circle cx="60" cy="60" r="25" fill="#1a1a2e" stroke="#00e5ff" strokeWidth="3"/>
          
          {/* Wheel Centers */}
          <circle cx="-60" cy="60" r="8" fill="#00e5ff"/>
          <circle cx="60" cy="60" r="8" fill="#00e5ff"/>
          
          {/* Headlights */}
          <circle cx="100" cy="10" r="8" fill="#39ff14" opacity="0.9"/>
          <circle cx="100" cy="35" r="8" fill="#39ff14" opacity="0.9"/>
          
          {/* Neon Underglow */}
          <ellipse cx="0" cy="65" rx="110" ry="8" fill="#00e5ff" opacity="0.5">
            {isAnimating && (
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
            )}
          </ellipse>
          
          {/* Character - Girl with Pink Hair */}
          <g transform="translate(-20, -20)">
            {/* Head */}
            <circle cx="0" cy="0" r="18" fill="#fdb4c4" stroke="#fb04ff" strokeWidth="1"/>
            
            {/* Hair */}
            <path
              d="M -18 -10 Q -25 -20 -15 -25 Q 0 -30 15 -25 Q 25 -20 18 -10"
              fill="url(#hairGradient)"
              filter="url(#neonGlow)"
            />
            
            {/* Hair Strands */}
            <path d="M 15 -15 Q 25 -10 20 0" fill="url(#hairGradient)" opacity="0.8"/>
            <path d="M -15 -15 Q -25 -10 -20 0" fill="url(#hairGradient)" opacity="0.8"/>
            
            {/* Eyes */}
            <ellipse cx="-6" cy="-2" rx="3" ry="4" fill="#00e5ff"/>
            <ellipse cx="6" cy="-2" rx="3" ry="4" fill="#00e5ff"/>
            <circle cx="-6" cy="-2" r="1.5" fill="#fff"/>
            <circle cx="6" cy="-2" r="1.5" fill="#fff"/>
            
            {/* Mouth */}
            <ellipse cx="0" cy="5" rx="3" ry="2" fill="#fb04ff" opacity="0.7"/>
            
            {/* Body */}
            <rect x="-12" y="18" width="24" height="30" rx="12" fill="#8b5cf6" opacity="0.8"/>
            
            {/* Arms */}
            <ellipse cx="-18" cy="25" rx="6" ry="15" fill="#fdb4c4"/>
            <ellipse cx="18" cy="25" rx="6" ry="15" fill="#fdb4c4"/>
            
            {/* Hands on Steering Wheel */}
            <circle cx="-15" cy="35" r="4" fill="#fdb4c4"/>
            <circle cx="15" cy="35" r="4" fill="#fdb4c4"/>
          </g>
          
          {/* Steering Wheel */}
          <circle cx="-20" cy="15" r="15" fill="none" stroke="#00e5ff" strokeWidth="3" opacity="0.8"/>
          <circle cx="-20" cy="15" r="3" fill="#00e5ff"/>
          
          {/* Dashboard Lights */}
          <rect x="-80" y="5" width="4" height="2" fill="#39ff14" rx="1">
            {isAnimating && (
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
            )}
          </rect>
          <rect x="-70" y="5" width="4" height="2" fill="#fb04ff" rx="1">
            {isAnimating && (
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
            )}
          </rect>
          <rect x="-60" y="5" width="4" height="2" fill="#00e5ff" rx="1">
            {isAnimating && (
              <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite"/>
            )}
          </rect>
        </g>
        
        {/* Floating Particles */}
        {isAnimating && [...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={100 + i * 80}
            cy={50 + i * 30}
            r="2"
            fill={i % 3 === 0 ? "#00e5ff" : i % 3 === 1 ? "#fb04ff" : "#39ff14"}
            opacity="0.6"
          >
            <animate
              attributeName="cy"
              values={`${50 + i * 30}; ${30 + i * 30}; ${50 + i * 30}`}
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.8;0.2"
              dur={`${1.5 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        
        {/* Title Text */}
        <text
          x="400"
          y="350"
          textAnchor="middle"
          fill="#00e5ff"
          fontSize="24"
          fontWeight="bold"
          filter="url(#neonGlow)"
        >
          KyaMovVM - Cyberpunk Racing
        </text>
        
        {/* Subtitle */}
        <text
          x="400"
          y="375"
          textAnchor="middle"
          fill="#fb04ff"
          fontSize="14"
          opacity="0.8"
        >
          High-Speed Virtual Machine Development
        </text>
      </svg>
    </div>
  );
}