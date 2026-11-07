const CACHE = 'routinen-v14';
// Emojis (Noto) lokal statt CDN, damit sie auch offline gleich aussehen
const EMOJI = ["1f305.svg", "1f308.svg", "1f319.svg", "1f31f.svg", "1f36a.svg", "1f389.svg", "1f38a.svg", "1f392.svg", "1f3b2.svg", "1f3c3.svg", "1f443.svg", "1f44f.svg", "1f457.svg", "1f45a.svg", "1f49b.svg", "1f4a4.svg", "1f4aa.svg", "1f4ab.svg", "1f4d6.svg", "1f4fa.svg", "1f60a.svg", "1f6bd.svg", "1f932.svg", "1f970.svg", "1f973.svg", "1f97e.svg", "1f9b6.svg", "1f9b7.svg", "1f9f4.svg", "1f9fd.svg", "1faae.svg", "21a9.svg", "2600.svg", "2699.svg", "2705.svg", "2728.svg", "2b50.svg"];
const ASSETS = ['./', './index.html', './manifest.json', './emoji/twemoji.min.js',
  ...EMOJI.map(f => './emoji/svg/' + f)];

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
