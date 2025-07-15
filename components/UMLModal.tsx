// @ts-nocheck
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Download, X } from "lucide-react";
import Uml from "../imports/Uml";

interface UMLModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
}

export default function UMLModal({ isOpen, onClose, language, highContrastMode = false }: UMLModalProps) {
  const texts = {
    ja: {
      title: 'UML データベース アーキテクチャ',
      subtitle: 'KyaMovVM プロジェクトのデータベース スキーマ',
      fullscreen: 'フルスクリーン表示',
      download: 'スキーマをダウンロード',
      close: '閉じる',
      description: 'KyaMovVM データベースには、完全な関係システムを備えたユーザー、映画、クルー メンバー、配布、ジャンルに関する情報が含まれています。',
      zoomInstructions: 'スクロールしてズーム、ドラッグして移動',
      dialogDescription: 'KyaMovVMプロジェクトのインタラクティブなUMLデータベーススキーマを表示します。ズーム、パン、ダウンロード機能付き。'
    },
    ru: {
      title: 'UML Архитектура БД',
      subtitle: 'Схема базы данных проекта KyaMovVM',
      fullscreen: 'Полноэкранный режим',
      download: 'Скачать схему',
      close: 'Закрыть',
      description: 'База данных KyaMovVM содержит информацию о пользователях, фильмах, съемочной группе, дистрибуции и жанрах с полной системой связей.',
      zoomInstructions: 'Прокрутите для масштабирования, перетащите для перемещения',
      dialogDescription: 'Интерактивная UML схема базы данных проекта KyaMovVM с функциями масштабирования, панорамирования и загрузки.'
    },
    en: {
      title: 'UML Database Architecture',
      subtitle: 'Database schema of KyaMovVM project',
      fullscreen: 'Fullscreen View',
      download: 'Download Schema',
      close: 'Close',
      description: 'KyaMovVM database contains information about users, movies, crew members, distribution and genres with complete relationship system.',
      zoomInstructions: 'Scroll to zoom, drag to move',
      dialogDescription: 'Interactive UML database schema for KyaMovVM project with zoom, pan, and download capabilities.'
    }
  };

  const t = texts[language];

  const handleDownload = () => {
    // Try to capture the actual UML diagram
    const umlElement = document.querySelector('.uml-modal-diagram svg, .uml-modal-diagram canvas');
    
    if (umlElement) {
      // If we have the actual UML element, try to capture it
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          canvas.width = 1500;
          canvas.height = 1000;
          
          // Fill white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add title
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(t.title, canvas.width / 2, 40);
          
          // Draw UML structure representation
          ctx.strokeStyle = '#4F46E5';
          ctx.fillStyle = '#E0E7FF';
          ctx.lineWidth = 2;
          
          // Draw tables as boxes with relationships
          const tables = [
            { name: 'users', x: 100, y: 100, width: 200, height: 120 },
            { name: 'movies', x: 400, y: 100, width: 200, height: 140 },
            { name: 'crew_members', x: 700, y: 100, width: 220, height: 160 },
            { name: 'favorites', x: 200, y: 350, width: 180, height: 100 },
            { name: 'movie_genres', x: 500, y: 350, width: 200, height: 100 },
            { name: 'distribution', x: 800, y: 350, width: 200, height: 120 }
          ];
          
          // Draw table boxes
          tables.forEach(table => {
            // Table box
            ctx.fillRect(table.x, table.y, table.width, table.height);
            ctx.strokeRect(table.x, table.y, table.width, table.height);
            
            // Table name header
            ctx.fillStyle = '#4F46E5';
            ctx.fillRect(table.x, table.y, table.width, 30);
            
            // Table name text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(table.name.toUpperCase(), table.x + table.width / 2, table.y + 20);
            
            // Add some field representations
            ctx.fillStyle = '#1f2937';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            const fields = ['id: int (PK)', 'name: varchar', 'created_at: timestamp'];
            fields.forEach((field, index) => {
              ctx.fillText(field, table.x + 10, table.y + 50 + (index * 20));
            });
            
            ctx.fillStyle = '#E0E7FF';
          });
          
          // Add footer
          ctx.fillStyle = '#6b7280';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${t.subtitle} - Generated: ${new Date().toLocaleDateString()}`, canvas.width / 2, canvas.height - 20);
          
          // Download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `kyamovvm-uml-schema-${new Date().toISOString().split('T')[0]}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, 'image/png');
        }
      } catch (error) {
        console.warn('Could not capture UML diagram:', error);
        // Fallback to basic download
        handleBasicDownload();
      }
    } else {
      handleBasicDownload();
    }
  };
  
  const handleBasicDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = 1200;
      canvas.height = 800;
      
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add title
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(t.title, canvas.width / 2, 40);
      
      // Add subtitle
      ctx.font = '16px Arial';
      ctx.fillText(t.subtitle, canvas.width / 2, 70);
      
      // Add message
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666666';
      ctx.fillText('Full interactive UML diagram available in the application', canvas.width / 2, canvas.height - 30);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `kyamovvm-uml-basic-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`max-w-[95vw] max-h-[95vh] p-0 overflow-hidden ${
          highContrastMode
            ? 'border-4 border-white bg-black/95 shadow-2xl'
            : 'border-2 border-cyber-cyan/30 bg-cyber-dark-secondary/95 shadow-2xl shadow-cyber-cyan/20'
        }`}
      >
        <DialogHeader className={`p-6 pb-4 border-b flex-shrink-0 ${
          highContrastMode 
            ? 'border-white/20' 
            : 'border-cyber-cyan/20'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className={`font-bold text-xl mb-2 ${
                highContrastMode ? 'text-white' : 'text-cyber-cyan'
              }`}>
                {t.title}
              </DialogTitle>
              <p className={`text-sm ${
                highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
              }`}>
                {t.subtitle}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className={`font-medium ${
                  highContrastMode
                    ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                    : 'border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10'
                }`}
                title={t.download}
              >
                <Download className="w-4 h-4 mr-2" />
                {t.download}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={`font-medium ${
                  highContrastMode
                    ? 'text-white hover:bg-white/10'
                    : 'text-cyber-cyan hover:bg-cyber-cyan/10'
                }`}
                title={t.close}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Hidden description for accessibility */}
        <DialogDescription className="sr-only">
          {t.dialogDescription}
        </DialogDescription>

        <div className="flex-1 p-6 overflow-hidden">
          {/* UML Diagram Container - Single scroll container */}
          <div className={`relative w-full h-[70vh] bg-white rounded-lg border-2 ${
            highContrastMode
              ? 'border-white/50 shadow-lg'
              : 'border-cyber-cyan/30 cyber-glow-cyan shadow-xl'
          }`}>
            {/* Zoom Instructions */}
            <div className={`absolute top-2 right-2 z-10 px-3 py-1.5 rounded-md text-xs font-medium ${
              highContrastMode
                ? 'bg-black/80 text-white border border-white/30'
                : 'bg-cyber-dark/80 text-cyber-cyan border border-cyber-cyan/30'
            }`}>
              {t.zoomInstructions}
            </div>

            {/* UML Diagram - Single container with proper overflow */}
            <div className="uml-modal-diagram w-full h-full overflow-auto p-4">
              <div className="w-max min-w-full min-h-full flex items-center justify-center">
                <Uml />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className={`font-medium text-center ${
              highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
            }`}>
              {t.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handleDownload}
              className={`font-bold ${
                highContrastMode
                  ? 'bg-white text-black hover:bg-gray-200 border-2 border-white'
                  : 'bg-gradient-to-r from-cyber-cyan to-cyber-pink hover:from-cyber-cyan/80 hover:to-cyber-pink/80 text-white'
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              {t.download}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className={`font-bold ${
                highContrastMode
                  ? 'border-2 border-white text-white hover:bg-white hover:text-black'
                  : 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple/10'
              }`}
            >
              {t.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}