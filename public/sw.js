const CACHE_NAME = 'plantscan-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error("Cache setup error:", err))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(fetchRes => {
          // Verify valid response before caching
          if(!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic' && fetchRes.type !== 'cors') {
             return fetchRes;
          }
          
          // Don't cache extension requests
          if (event.request.url.startsWith('chrome-extension')) return fetchRes;

          const responseToCache = fetchRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return fetchRes;
        }).catch(err => {
          console.warn("Fetch failed, likely offline and missing cache for:", event.request.url);
          // Optional: Return a fallback offline UI here
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});
