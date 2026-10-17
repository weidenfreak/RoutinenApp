const CACHE = 'routinen-v9';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS.map(a => new Request(a, { cache:'reload' })))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle same-origin GET requests — pass through API calls (weather)
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Network-first: immer aktuellen Stand laden, Cache nur als Fallback (offline).
  // cache:'no-cache' umgeht den HTTP-Cache (GitHub Pages: max-age=600), sonst
  // kommt nach einem Deploy bis zu 10 Minuten noch die alte Version.
  e.respondWith(
    fetch(e.request.url, { cache:'no-cache' })
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
