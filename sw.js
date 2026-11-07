// Ondes — met l'app en cache pour qu'elle s'ouvre même avec un réseau faible.
// Les flux audio et la liste des radios ne passent jamais par le cache.
const CACHE = 'ondes-radio-v21';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png',
  './AzeretMono-SemiBold.otf',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.destination === 'audio' || req.headers.has('range')) return;
  if (url.pathname.endsWith('/admin.php') || url.pathname.includes('/data/')) return; // jamais de cache pour le back office
  if (url.pathname.endsWith('/radios.json')) return; // l'app garde elle-même la dernière liste connue

  // Réseau d'abord (pour recevoir les mises à jour), cache en secours.
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
