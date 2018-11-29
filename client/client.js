  const publicVapidKey = 'BHta4cm0-QlI95qmvV5jYk-nFgIUcyUVtJ3CBwbtCQPSRR69IWKHeaGjp3oQL7QDMHdizYQV63ZBA3QWQYIgwzs';

  //check for service worker
  if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
  }


  //register SW, push , send Push
  async function send() {

    //register service worker
    console.log('Registering service worker ...');
    const register = await navigator.serviceWorker.register('/serviceWorker.js', {
      scope: '/'
    });
    console.log('Service Worker Registered');

    //register push
    console.log('Registering Push...');
    var subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log(subscription);

    console.log('Registered Push');

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json'
      }
    });


   
    
  }

  async function notify() {
    const register = await navigator.serviceWorker.register('/serviceWorker.js', {
      scope: '/'
    });
    var subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
      //sending push notification
      console.log('Sending Push...');

      var data = JSON.stringify(subscription);
      console.log(data)

    await fetch('/subscribe', {
      method: 'POST',
      body: data,
      headers: {
        'content-type': 'application/json'
      }
    });
    console.log('Push sent');
  }



 async function sendMessage() {
    var name = $("#user").val();
    var message = $("#message").val();
    console.log(message);
   
    const register = await navigator.serviceWorker.register('/serviceWorker.js', {
      scope: '/'
    });
    var subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    var data = {
      "user" : name,
      "description" : subscription
    }

    console.log(data);


    $.ajax({
      type: "POST",
      url: "http://localhost:3000/message",
      data: data,
      dataType: "JSON",
      success: function (data) {
        
      },
      error: function (errors) {}

    });

    console.log(data);

  }


  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }