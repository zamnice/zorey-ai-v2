const CACHE_NAME = 'zorey-ai-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/img/logo.png',
  '/img/icon.png',
  '/img/favicon.ico',
  '/img/preview-zorey.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});
