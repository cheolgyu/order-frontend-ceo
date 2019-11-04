//static/ 
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('video-store').then(function (cache) {
            return cache.addAll([
                '/index',
            ]);
        })
    );
});

self.addEventListener('fetch', function (e) {

    /*
    console.log("fetch:", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
    */
});
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    'messagingSenderId': '371794845174'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function (payload) {
    console.log("setBackgroundMessageHandler:", payload, payload.data.my_options);
    var obj = JSON.parse(payload.data.my_options);
    console.log("setBackgroundMessageHandler: obj:", obj);
    //https://developers.google.com/web/fundamentals/push-notifications/common-notification-patterns#merging_notifications
    var notificationTitle = payload.data.title;
    var obj = JSON.parse(payload.data.my_options);
    var notificationOptions = obj;
    console.log("setBackgroundMessageHandler:", payload, notificationOptions);

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});