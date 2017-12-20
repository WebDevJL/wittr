

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status === 404) {
        // TODO: instead, respond with the gif at
        // /imgs/dr-evil.gif
        // using a network request
        return new Response("HTTP/404");
      }
      return response;
    }).catch(function(errorInfo) {
      console.log(errorInfo);
      return new Response("Uh oh, that totally failed!");
    })
  );
});