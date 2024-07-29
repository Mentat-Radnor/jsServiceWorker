self.addEventListener("install", (event) => {
  console.log('Установлен')
  event.waitUntil(
    caches.open('v1').then(async (cache) => {
      console.log(await cache.keys());
      return cache.addAll([
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        'https://s3.stroi-news.ru/img/yarkie-kartinki-na-zastavku-1.jpg',
      ]);
    })
  )
})

self.addEventListener('activate', (event) => {
  console.log('Активирован')
  const cacheWhitelist = ['v1'];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        console.log(key);
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }));
    })
  );
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.protocol.startsWith('http')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open('v1').then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});