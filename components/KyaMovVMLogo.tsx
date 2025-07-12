interface KyaMovVMLogoProps {
  className?: string;
  width?: number;
  height?: number;
  animated?: boolean;
  highContrastMode?: boolean;
}

export default function KyaMovVMLogo({ 
  className = "", 
  width = 120, 
  height = 40, 
  animated = true,
  highContrastMode = false 
}: KyaMovVMLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'cyber-logo-animate' : ''}`}
    >
      <defs>
        {/* Cyberpunk gradient definitions */}
        <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={highContrastMode ? "#ffffff" : "#00e5ff"} />
          <stop offset="50%" stopColor={highContrastMode ? "#ffffff" : "#fb04ff"} />
          <stop offset="100%" stopColor={highContrastMode ? "#ffffff" : "#8b5cf6"} />
        </linearGradient>
        
        <linearGradient id="cyberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={highContrastMode ? "#ffffff" : "#00e5ff"} stopOpacity="0.8" />
          <stop offset="50%" stopColor={highContrastMode ? "#ffffff" : "#fb04ff"} stopOpacity="0.6" />
          <stop offset="100%" stopColor={highContrastMode ? "#ffffff" : "#8b5cf6"} stopOpacity="0.8" />
        </linearGradient>

        {/* Neon glow filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Circuit pattern */}
        <pattern id="circuitPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none"/>
          <path d="M0 10h20M10 0v20" stroke={highContrastMode ? "#ffffff" : "#00e5ff"} strokeWidth="0.5" opacity="0.3"/>
          <circle cx="10" cy="10" r="1.5" fill={highContrastMode ? "#ffffff" : "#fb04ff"} opacity="0.6"/>
        </pattern>
      </defs>

      {/* Background circuit pattern */}
      <rect width="320" height="80" fill="url(#circuitPattern)" opacity="0.1"/>
      
      {/* Background glow */}
      <rect 
        width="320" 
        height="80" 
        fill="url(#cyberGlow)" 
        opacity="0.1" 
        rx="8"
        className={animated ? 'cyber-bg-pulse' : ''}
      />

      {/* Main logo text */}
      <g filter={highContrastMode ? "none" : "url(#neonGlow)"}>
        {/* K */}
        <g className={animated ? 'cyber-letter-k' : ''}>
          <path 
            d="M20 15 L20 65 M20 35 L35 15 M20 40 L35 65" 
            stroke="url(#cyberGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="20" cy="35" r="2" fill={highContrastMode ? "#ffffff" : "#00e5ff"} className={animated ? 'cyber-dot-pulse' : ''}/>
        </g>

        {/* Y */}
        <g className={animated ? 'cyber-letter-y' : ''}>
          <path 
            d="M50 15 L60 35 L70 15 M60 35 L60 65" 
            stroke="url(#cyberGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="60" cy="35" r="2" fill={highContrastMode ? "#ffffff" : "#fb04ff"} className={animated ? 'cyber-dot-pulse' : ''}/>
        </g>

        {/* A */}
        <g className={animated ? 'cyber-letter-a' : ''}>
          <path 
            d="M85 65 L95 15 L105 65 M90 45 L100 45" 
            stroke="url(#cyberGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="95" cy="45" r="2" fill={highContrastMode ? "#ffffff" : "#8b5cf6"} className={animated ? 'cyber-dot-pulse' : ''}/>
        </g>

        {/* Separator */}
        <line 
          x1="115" y1="25" x2="115" y2="55" 
          stroke="url(#cyberGradient)" 
          strokeWidth="2" 
          className={animated ? 'cyber-separator-glow' : ''}
        />

        {/* MOV */}
        <g className={animated ? 'cyber-mov' : ''}>
          <path 
            d="M130 65 L130 15 L140 35 L150 15 L150 65 M165 15 L165 50 A10 10 0 0 0 185 50 L185 15 M200 15 L200 50 L215 15" 
            stroke="url(#cyberGradient)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="140" cy="35" r="1.5" fill={highContrastMode ? "#ffffff" : "#00e5ff"} className={animated ? 'cyber-dot-pulse' : ''}/>
          <circle cx="175" cy="32" r="1.5" fill={highContrastMode ? "#ffffff" : "#fb04ff"} className={animated ? 'cyber-dot-pulse' : ''}/>
          <circle cx="207" cy="32" r="1.5" fill={highContrastMode ? "#ffffff" : "#8b5cf6"} className={animated ? 'cyber-dot-pulse' : ''}/>
        </g>

        {/* VM - исправлено для лучшей читаемости */}
        <g className={animated ? 'cyber-vm' : ''}>
          {/* V - четкая форма */}
          <path 
            d="M235 15 L245 55 L255 15" 
            stroke="url(#cyberGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          {/* M - четкая форма с прямыми линиями */}
          <path 
            d="M270 65 L270 15 L280 40 L290 15 L290 65" 
            stroke="url(#cyberGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="245" cy="30" r="1.5" fill={highContrastMode ? "#ffffff" : "#39ff14"} className={animated ? 'cyber-dot-pulse' : ''}/>
          <circle cx="280" cy="30" r="1.5" fill={highContrastMode ? "#ffffff" : "#0080ff"} className={animated ? 'cyber-dot-pulse' : ''}/>
        </g>
      </g>

      {/* Cyber frame borders */}
      <g className={animated ? 'cyber-frame' : ''}>
        <path d="M5 5 L25 5 M295 5 L315 5 M5 75 L25 75 M295 75 L315 75" 
              stroke="url(#cyberGradient)" 
              strokeWidth="2" 
              strokeLinecap="round"/>
        <path d="M5 5 L5 25 M5 55 L5 75 M315 5 L315 25 M315 55 L315 75" 
              stroke="url(#cyberGradient)" 
              strokeWidth="2" 
              strokeLinecap="round"/>
      </g>

      {/* Animated scan line */}
      {animated && !highContrastMode && (
        <line 
          x1="0" y1="40" x2="320" y2="40" 
          stroke="#00e5ff" 
          strokeWidth="0.5" 
          opacity="0.6"
          className="cyber-scan-line"
        />
      )}

      {/* CSS animations - FIXED: Removed jsx boolean attribute */}
      <style>
        {`
        .cyber-logo-animate {
          animation: cyber-logo-glow 3s ease-in-out infinite;
        }
        
        .cyber-letter-k {
          animation: cyber-letter-pulse 2s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .cyber-letter-y {
          animation: cyber-letter-pulse 2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        .cyber-letter-a {
          animation: cyber-letter-pulse 2s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        .cyber-mov {
          animation: cyber-letter-pulse 2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        
        .cyber-vm {
          animation: cyber-letter-pulse 2s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        
        .cyber-dot-pulse {
          animation: cyber-dot-glow 1.5s ease-in-out infinite;
        }
        
        .cyber-frame {
          animation: cyber-frame-glow 4s ease-in-out infinite;
        }
        
        .cyber-bg-pulse {
          animation: cyber-bg-shift 8s ease-in-out infinite;
        }
        
        .cyber-separator-glow {
          animation: cyber-separator-pulse 2s ease-in-out infinite;
        }
        
        .cyber-scan-line {
          animation: cyber-scan 4s linear infinite;
        }
        
        @keyframes cyber-logo-glow {
          0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
          50% { filter: drop-shadow(0 0 15px currentColor) drop-shadow(0 0 25px currentColor); }
        }
        
        @keyframes cyber-letter-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes cyber-dot-glow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes cyber-frame-glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-bg-shift {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        @keyframes cyber-separator-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-scan {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        `}
      </style>
    </svg>
  );
}