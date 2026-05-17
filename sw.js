self.addEventListener('install', () => {

  self.skipWaiting();

});

self.addEventListener('activate', () => {

  console.log('Octo Service Worker activo');

});

self.addEventListener('notificationclick', (event) => {

  event.notification.close();

  event.waitUntil(

    clients.openWindow('/')

  );

});