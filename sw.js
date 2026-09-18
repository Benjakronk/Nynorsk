/* Service worker med éi einaste oppgåve: halde nynorskordlista (~4,8 MB) i
   cache, slik at ho blir lasta ned i bakgrunnen første gongen og ligg klar
   seinare, òg utan nett.

   Alt anna går rett på nettet. Det er med vilje: ein service worker som
   cachar sjølve kurset, ville kunne servere gamle modular etter ei oppdatering,
   og det er ein mykje verre feil enn at ordlista må lastast ned på nytt. */

const CACHE = "nn-ordliste-v1";
const LIST = "data/nn-ordliste.txt";

self.addEventListener("install", event => {
  // Hent ordlista med ein gong, men la installasjonen lykkast om nettet sviktar.
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.add(LIST))
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
  if (event.request.method !== "GET" || !url.pathname.endsWith(LIST)) return;

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
