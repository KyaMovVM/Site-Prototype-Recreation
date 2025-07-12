import { useState, useEffect } from 'react';

interface MusicPlayerProps {
  language: 'ja' | 'ru' | 'en';
  highContrastMode?: boolean;
}

export default function MusicPlayer({ language, highContrastMode = false }: MusicPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const texts = {
    ja: {
      title: 'Cyberpunk 2025 サウンドトラック',
      subtitle: 'KyaMovVM プロジェクト専用音楽',
      description: '没入型のサイバーパンク体験のために特別に制作されたオリジナル サウンドトラック'
    },
    ru: {
      title: 'Cyberpunk 2025 Саундтрек',
      subtitle: 'Эксклюзивная музыка для проекта KyaMovVM',
      description: 'Оригинальный саундтрек, специально созданный для погружающего киберпанк опыта'
    },
    en: {
      title: 'Cyberpunk 2025 Soundtrack',
      subtitle: 'Exclusive music for KyaMovVM project',
      description: 'Original soundtrack crafted specifically for immersive cyberpunk experience'
    }
  };

  const t = texts[language];

  useEffect(() => {
    // Simulate loading time for Apple Music embed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`section-spacing px-4 relative ${
      highContrastMode ? 'bg-black' : ''
    }`}>
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 via-transparent to-cyber-cyan/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`text-3xl md:text-4xl font-black mb-4 ${
            highContrastMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-purple bg-clip-text text-transparent'
          }`}>
            {t.title}
          </h2>
          <p className={`max-w-2xl mx-auto font-medium mb-4 ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/80'
          }`}>
            {t.subtitle}
          </p>
          <p className={`max-w-3xl mx-auto text-sm ${
            highContrastMode ? 'text-gray-400' : 'text-cyber-cyan/60'
          }`}>
            {t.description}
          </p>
        </div>

        {/* Apple Music Embed */}
        <div className={`max-w-4xl mx-auto backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden ${
          highContrastMode
            ? 'border-4 border-white bg-gray-900/90 shadow-xl'
            : 'border-cyber-cyan/30 bg-cyber-dark-secondary/90 shadow-cyber-cyan/20'
        }`}>
          <div className="apple-music-embed">
            {isLoading ? (
              <div className={`flex items-center justify-center h-[450px] ${
                highContrastMode ? 'bg-black' : 'bg-cyber-dark-secondary'
              }`}>
                <div className="music-equalizer">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bar" />
                  ))}
                </div>
              </div>
            ) : (
              <iframe 
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                frameBorder="0" 
                height="450" 
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  backgroundColor: 'transparent'
                }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                src="https://embed.music.apple.com/us/album/cyberpunk-2077-radio-vol-1-original-soundtrack/1542314114"
                loading="lazy"
                title="Apple Music Player - Cyberpunk 2025 Soundtrack"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="text-center mt-8">
          <p className={`max-w-2xl mx-auto text-sm font-medium ${
            highContrastMode ? 'text-gray-300' : 'text-cyber-cyan/70'
          }`}>
            {language === 'ja' 
              ? '🎵 フル機能の Apple Music プレーヤーをお楽しみください' 
              : language === 'ru' 
                ? '🎵 Наслаждайтесь полнофункциональным плеером Apple Music'
                : '🎵 Enjoy the full-featured Apple Music player'
            }
          </p>
        </div>
      </div>
    </section>
  );
}