/* Service worker med éi einaste oppgåve: halde dei store datafilene i cache,
   slik at dei blir lasta ned i bakgrunnen første gongen og ligg klare
   seinare, òg utan nett: nynorskordbanken (~5,9 MB, om lag 1,5 MB over
   nettet) og det fine høgdekartet til 3D-kartet over reisene til Ivar Aasen
   (~3 MB).

   Alt anna går rett på nettet. Det er med vilje: ein service worker som
   cachar sjølve kurset, ville kunne servere gamle modular etter ei oppdatering,
   og det er ein mykje verre feil enn at ordbanken må lastast ned på nytt.

   Nytt namn på cachen fjernar den gamle: activate slettar alle andre. */

const CACHE = "nn-data-v2";
const FILER = ["data/nn-ordbank.txt", "data/noreg-terreng-fin.png"];

self.addEventListener("install", event => {
  // Hent filene med ein gong, men la installasjonen lykkast om nettet sviktar.
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(FILER.map(f => cache.add(f).catch(() => {}))))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || !FILER.some(f => url.pathname.endsWith(f))) return;

  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(hit => {
        if (hit) return hit;
        return fetch(event.request).then(res => {
          if (res.ok) cache.put(event.request, res.clone());
          return res;
        });
      })
    )
  );
});
