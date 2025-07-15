# KyaMovVM Robots.txt
# Updated: 2025-01-12
# Version: v0.47
# Multi-domain configuration for kyamovvm.com and kyamovvm.github.io

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
# Primary: https://kyamovvm.github.io/robots.txt
# Mirror: https://kyamovvm.com/robots.txt
# 
# If kyamovvm.com/robots.txt returns 404, ensure:
# 1. DNS CNAME record points to kyamovvm.github.io
# 2. GitHub Pages custom domain is configured 
# 3. robots.txt file is in repository root
# 4. Repository is public and Pages is enabled

# Last updated: 2025-01-12
# Version: v0.47