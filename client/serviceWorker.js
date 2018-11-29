console.log('Service Worker loaded...');

self.addEventListener('push', e => {
  const data = e.data.json();
  
  console.log('Push received');
  if (data.type == "subscribe") {
    self.registration.showNotification(data.title, {
      body: 'Welcome to our world ' ,
      icon: 'https://image.flaticon.com/teams/slug/google.jpg'
    });
  }

});