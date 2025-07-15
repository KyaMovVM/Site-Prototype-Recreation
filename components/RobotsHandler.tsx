// @ts-nocheck
import { useEffect } from 'react';

interface RobotsHandlerProps {
  onComplete?: () => void;
}

export default function RobotsHandler({ onComplete }: RobotsHandlerProps) {
  useEffect(() => {
    // Generate robots.txt content
    const robotsContent = `# Robots.txt
# Updated: 2025-01-12
# Version: v0.48
# Auto-generated robots.txt content

User-agent: *
Allow: /

# Allow crawling of main pages
Allow: /index.html
Allow: /uml.html
Allow: /docs.html
Allow: /plan.html
Allow: /manual_tests.html
Allow: /login.html

# Allow development pages (lower priority)
Allow: /api.html
Allow: /django_setup.html
Allow: /docker_game.html
Allow: /modules.html
Allow: /json_intro.html

# Allow static assets and resources
Allow: /assets/
Allow: /images/
Allow: /styles/
Allow: /components/
Allow: /imports/
Allow: /public/
Allow: /*.css
Allow: /*.js
Allow: /*.ts
Allow: /*.tsx
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp
Allow: /*.ico
Allow: /*.woff
Allow: /*.woff2
Allow: /*.ttf
Allow: /*.eot

# Allow manifest and service worker
Allow: /manifest.json
Allow: /sw.js
Allow: /favicon.svg
Allow: /favicon.ico

# Disallow admin and private security pages
Disallow: /fail2ban.html
Disallow: /control.html
Disallow: /crossref.html

# Disallow temporary and backup files
Disallow: /*.tmp
Disallow: /*.bak
Disallow: /*.backup
Disallow: /*~
Disallow: /.git/
Disallow: /.github/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /build/

# Allow 404 page for SEO coverage
Allow: /404.html

# Sitemap location
Sitemap: ${window.location.origin}/sitemap.xml

# Crawl delay (1 second for respectful crawling)
Crawl-delay: 1

# Special directives for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: YandexBot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# Archive crawlers
User-agent: ia_archiver
Allow: /

User-agent: archive.org_bot
Allow: /

# Development and security note
# This robots.txt is designed to balance:
# 1. SEO visibility for main content
# 2. Privacy for admin/security pages  
# 3. Performance optimization
# 4. International accessibility (ja/ru/en)
# 5. Multi-domain support

# Access URL:
# ${window.location.origin}/robots.txt
# 
# Auto-generated v0.48
# Dynamic robots.txt handler with URL routing

# Last updated: 2025-01-12
# Version: v0.48`;

    // Set response headers to mimic a robots.txt file
    const blob = new Blob([robotsContent], { 
      type: 'text/plain; charset=utf-8' 
    });

    // Create download link for robots.txt
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    
    // Set document properties to look like robots.txt
    document.title = 'robots.txt';
    
    // Create a styled page that looks like plain text
    const robotsDisplay = document.createElement('pre');
    robotsDisplay.style.cssText = `
      font-family: 'Courier New', 'Lucida Console', monospace;
      font-size: 12px;
      line-height: 1.4;
      margin: 0;
      padding: 20px;
      background: #ffffff;
      color: #000000;
      white-space: pre-wrap;
      word-wrap: break-word;
    `;
    robotsDisplay.textContent = robotsContent;
    
    // Replace body content
    document.body.innerHTML = '';
    document.body.appendChild(robotsDisplay);
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      background: #ffffff;
      font-family: 'Courier New', 'Lucida Console', monospace;
    `;

    // Clean up
    return () => {
      URL.revokeObjectURL(url);
      if (onComplete) {
        onComplete();
      }
    };
  }, [onComplete]);

  // Return nothing - we're replacing the entire page
  return null;
}