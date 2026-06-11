// mini-coi.js - Bypasses GitHub Pages header blocks
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", event => {
  if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 0) return response;
        
        // Magically inject the strict cross-origin isolated headers into GitHub Pages
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
        newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      })
      .catch(err => console.error(err))
  );
});