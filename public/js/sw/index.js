self.addEventListener('fetch', function(event) {
  console.log("request:", event.request);
});