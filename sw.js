// Service worker du quiz « Le deuxième tour d'enchères avec ClaudIA ».
// Stratégie : réseau d'abord pour la page, cache en secours — l'app reste
// consultable hors connexion, et une nouvelle mise en ligne est prise en
// compte au rechargement suivant sans avoir à vider le cache à la main.
// Après chaque déploiement, incrémenter CACHE pour purger l'ancienne version.

const CACHE = 'deuxieme-tour-v1';
const FICHIERS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FICHIERS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // un fichier manquant ne bloque pas l'installation
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(rep => {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(e.request, copie)).catch(() => {});
        return rep;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
