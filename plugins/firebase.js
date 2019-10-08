
import Vue from 'vue'

Notification.requestPermission().then(permission => {
    if (permission === "granted") {

        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
    } else {

    }
});

var firebase = require("firebase/app");
require("firebase/messaging");

const firebaseConfig = {
    apiKey: "AIzaSyDeFOTllKAw1sHpK4OBFLOtmT4pFx5K3go",
    authDomain: "order-99f38.firebaseapp.com",
    databaseURL: "https://order-99f38.firebaseio.com",
    projectId: "order-99f38",
    storageBucket: "",
    messagingSenderId: "371794845174",
    appId: "1:371794845174:web:f0a19ab33f3ed85c"
};



firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const YOUR_PUBLIC_VAPID_KEY_HERE = "BFE1Zmtf2K7IAo7WpUinwGUxpRgIg-cVYMPjYCgHYo7zlIfpsaA3dokWNqwtK_vVIosdGuqjrRZEe6fAz27EgZ0";
messaging.usePublicVapidKey(YOUR_PUBLIC_VAPID_KEY_HERE);

Vue.prototype.$fb_sw_token = null;

let fb_registration = null;
navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
        fb_registration = registration;

        messaging.useServiceWorker(registration);
        return messaging.getToken();
    })
    .then((token) => {
        Vue.prototype.$fb_sw_token = token;

    });


messaging.onMessage((payload) => {


    // Customize notification here
    var notificationTitle = payload.notification.title;
    var notificationOptions = payload.notification;


    fb_registration.showNotification(notificationTitle,
        notificationOptions);

});





