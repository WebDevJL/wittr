self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: open a cache named 'wittr-static-v1'
    caches.open('wittr-static-v1').then(function(cache) {
      var urlsToCache = [
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ];
      
      return cache.addAll(urlsToCache);
    })
    // Add cache the urls from urlsToCache
  );
});

self.addEventListener('fetch', function(event) {
  // Leave this blank for now.
  // We'll get to this in the next task.
  event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) return response;
        
        return fetch(event.request.url);
      })
  );
});