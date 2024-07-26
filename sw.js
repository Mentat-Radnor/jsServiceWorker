self.addEventListener("install", (event) => {
  console.log('Установлен')
})

self.addEventListener('activate', () => {
  console.log('Активирован')
})

self.addEventListener('fetch', event => {
  if (event.request.url.includes('api')) {
    console.log(event);
  }
  // event.respondWith(
  //   console.log(event),
  //   caches.match(event.request).then(response => {
  //     return response || fetch(event.request);
  //   })
  // );
});