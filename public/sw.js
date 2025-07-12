const CACHE_NAME = 'kyamovvm-v0.48';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/styles/globals.css',
  '/styles/critical.css'
];

// Robots.txt content
const ROBOTS_TXT_CONTENT = `# KyaMovVM Robots.txt
# Updated: 2025-01-12
# Version: v0.48
# Auto-generated via Service Worker

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

# Multi-domain sitemap locations
Sitemap: https://kyamovvm.github.io/sitemap.xml
Sitemap: https://kyamovvm.com/sitemap.xml

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

# Access URLs:
# Primary: https://kyamovvm.com/robots.txt
# Mirror: https://kyamovvm.github.io/robots.txt
# 
# Served via Service Worker v0.48
# Dynamic robots.txt with automatic routing

# Last updated: 2025-01-12
# Version: v0.48`;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('KyaMovVM Cache v0.48 opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Handle robots.txt requests
  if (url.pathname === '/robots.txt') {
    event.respondWith(
      new Response(ROBOTS_TXT_CONTENT, {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'X-Robots-Tag': 'noindex', // Don't index the robots.txt itself
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      })
    );
    return;
  }

  // Handle sitemap.xml requests with updated content
  if (url.pathname === '/sitemap.xml') {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://kyamovvm.com/</loc>
        <lastmod>2025-01-12</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://kyamovvm.com/uml.html</loc>
        <lastmod>2025-01-12</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://kyamovvm.com/docs.html</loc>
        <lastmod>2025-01-12</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://kyamovvm.com/plan.html</loc>
        <lastmod>2025-01-12</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://kyamovvm.com/robots.txt</loc>
        <lastmod>2025-01-12</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.1</priority>
    </url>
</urlset>`;

    event.respondWith(
      new Response(sitemapContent, {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=43200', // Cache for 12 hours
          'Access-Control-Allow-Origin': '*'
        }
      })
    );
    return;
  }

  // Default caching strategy
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});