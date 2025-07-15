// @ts-nocheck
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CarDemoProps {
  title: string;
  description: string;
}

export default function CarDemo({ title, description }: CarDemoProps) {
  return (
    <Card className="max-w-4xl mx-auto border-cyber-cyan/30 bg-cyber-dark-secondary/90 backdrop-blur-sm shadow-2xl shadow-cyber-cyan/20 hover:shadow-cyber-cyan/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent cyber-text-glow">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-96 bg-gradient-to-br from-cyber-dark via-cyber-dark-secondary to-cyber-dark rounded-lg flex items-center justify-center overflow-hidden perspective-1000 border border-cyber-cyan/30 relative">
          <div className="absolute inset-0 cyber-grid-pattern opacity-30"></div>
          <div className="car-container transform-gpu relative z-10">
            <div className="car-3d">
              {/* Car Body - Fixed positioning */}
              <div className="car-body absolute inset-0 flex items-center justify-center">
                <div className="car-main bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-lg cyber-glow-cyan"></div>
                <div className="car-roof bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-md"></div>
                
                {/* Wheels - Fixed positioning */}
                <div className="wheel wheel-front-left bg-cyber-dark rounded-full border-2 border-cyber-cyan cyber-glow-cyan"></div>
                <div className="wheel wheel-front-right bg-cyber-dark rounded-full border-2 border-cyber-cyan cyber-glow-cyan"></div>
                <div className="wheel wheel-rear-left bg-cyber-dark rounded-full border-2 border-cyber-cyan cyber-glow-cyan"></div>
                <div className="wheel wheel-rear-right bg-cyber-dark rounded-full border-2 border-cyber-cyan cyber-glow-cyan"></div>
                
                {/* Details - Fixed to stay within bounds */}
                <div className="car-window bg-cyber-cyan/20 rounded-sm border border-cyber-cyan/40"></div>
                <div className="car-headlight bg-cyber-cyan rounded-full cyber-glow-cyan"></div>
                <div className="car-taillight bg-cyber-pink rounded-full cyber-glow-pink"></div>
                
                {/* Additional Details */}
                <div className="car-spoiler bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-sm"></div>
                <div className="car-stripe bg-cyber-cyan/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-cyber-cyan/80 mt-4 font-medium">
          {description}
        </p>
      </CardContent>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .car-container {
          transform-style: preserve-3d;
          animation: rotateY 8s linear infinite;
          width: 200px;
          height: 100px;
        }
        
        .car-3d {
          position: relative;
          width: 200px;
          height: 100px;
          transform-style: preserve-3d;
        }
        
        .car-body {
          width: 200px;
          height: 100px;
          transform-style: preserve-3d;
          position: relative;
        }
        
        .car-main {
          width: 160px;
          height: 60px;
          position: absolute;
          top: 20px;
          left: 20px;
          transform: translateZ(15px);
        }
        
        .car-roof {
          width: 80px;
          height: 40px;
          position: absolute;
          top: 0px;
          left: 60px;
          transform: translateZ(15px);
        }
        
        .wheel {
          width: 24px;
          height: 24px;
          position: absolute;
          animation: rotateWheel 2s linear infinite;
        }
        
        .wheel-front-left {
          top: 50px;
          left: 30px;
          transform: translateZ(30px);
        }
        
        .wheel-front-right {
          top: 50px;
          right: 30px;
          transform: translateZ(30px);
        }
        
        .wheel-rear-left {
          top: 50px;
          left: 30px;
          transform: translateZ(-30px);
        }
        
        .wheel-rear-right {
          top: 50px;
          right: 30px;
          transform: translateZ(-30px);
        }
        
        .car-window {
          width: 50px;
          height: 20px;
          position: absolute;
          top: 5px;
          left: 75px;
          transform: translateZ(16px);
        }
        
        .car-headlight {
          width: 6px;
          height: 6px;
          position: absolute;
          top: 35px;
          right: 25px;
          transform: translateZ(16px);
        }
        
        .car-taillight {
          width: 4px;
          height: 4px;
          position: absolute;
          top: 35px;
          left: 25px;
          transform: translateZ(16px);
        }
        
        .car-spoiler {
          width: 25px;
          height: 6px;
          position: absolute;
          top: -8px;
          left: 45px;
          transform: translateZ(16px);
        }
        
        .car-stripe {
          width: 100px;
          height: 2px;
          position: absolute;
          top: 42px;
          left: 50px;
          transform: translateZ(16px);
        }
        
        /* Add car sides for 3D effect with cyberpunk colors */
        .car-main::before {
          content: '';
          position: absolute;
          top: 0;
          right: -15px;
          width: 15px;
          height: 60px;
          background: linear-gradient(to right, var(--cyber-cyan), transparent);
          transform: rotateY(90deg);
          transform-origin: left;
        }
        
        .car-main::after {
          content: '';
          position: absolute;
          top: 0;
          left: -15px;
          width: 15px;
          height: 60px;
          background: linear-gradient(to left, var(--cyber-pink), transparent);
          transform: rotateY(-90deg);
          transform-origin: right;
        }
        
        @keyframes rotateY {
          from {
            transform: rotateY(0deg) rotateX(15deg);
          }
          to {
            transform: rotateY(360deg) rotateX(15deg);
          }
        }
        
        @keyframes rotateWheel {
          from {
            transform: translateZ(30px) rotateX(0deg);
          }
          to {
            transform: translateZ(30px) rotateX(360deg);
          }
        }
        
        .wheel-rear-left,
        .wheel-rear-right {
          animation: rotateWheelRear 2s linear infinite;
        }
        
        @keyframes rotateWheelRear {
          from {
            transform: translateZ(-30px) rotateX(0deg);
          }
          to {
            transform: translateZ(-30px) rotateX(360deg);
          }
        }
        
        /* Improved hover effect without brightness filter */
        .car-container:hover {
          animation-duration: 4s;
        }
        
        .car-container:hover .car-main {
          box-shadow: 0 0 30px var(--cyber-cyan), 0 0 60px var(--cyber-cyan);
        }
        
        .car-container:hover .car-roof {
          box-shadow: 0 0 20px var(--cyber-pink), 0 0 40px var(--cyber-pink);
        }
        
        .car-container:hover .wheel {
          box-shadow: 0 0 15px var(--cyber-cyan);
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .car-3d, .car-container, .car-body {
            transform: scale(0.8);
          }
        }
      `}</style>
    </Card>
  );
}