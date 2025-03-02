importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAjMAH2a3x3Loj7Ly5enZmLKV9xS9FL9tc",
    authDomain: "eridanus-mall.firebaseapp.com",
    projectId: "eridanus-mall",
    storageBucket: "eridanus-mall.firebasestorage.app",
    messagingSenderId: "293463936902",
    appId: "1:293463936902:web:6e1f1bb123e5739e242607",
    measurementId: "G-XZVPZLL5G1"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});