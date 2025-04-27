importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAuB5cYzUAiK9F1PlKYojOYRchwRHDmehk",
    authDomain: "pneuma-devops.firebaseapp.com",
    projectId: "pneuma-devops",
    storageBucket: "pneuma-devops.firebasestorage.app",
    messagingSenderId: "293065554854",
    appId: "1:293065554854:web:8e8574d632eed3b5ccad67",
    measurementId: "G-BJQ9GYBEYT"
});

const messaging = firebase.messaging();

// Handle background messages and prevent duplicates
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    // // If there's no notification key, manually show
    // if (!payload.notification) {
    //     const notificationTitle = "Background Message Title";
    //     const notificationOptions = {
    //         body: "Background Message body.",
    //         icon: '/default-icon.png',
    //         badge: '/badge-icon.png',
    //         vibrate: [200, 100, 200],
    //         tag: "general-notification",
    //         data: { url: payload.webpush?.fcmOptions?.link || '/' }
    //     };

    //     self.registration.showNotification(notificationTitle, notificationOptions);
    // }
});


// Handle notification clicks
self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // Close the notification

    const url = event.notification.data?.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if a window with the URL is already open
            for (let client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // Open a new window if not already open
            return clients.openWindow(url);
        })
    );
});
