self.addEventListener('fetch', function(event) {
  event.respondWith(
      new Response('<h1 class="a-winner-is-me">Sending a response from the service worker</h1>', {
          headers: {
              'Content-Type': 'text/html'
          },
      })
  );
});