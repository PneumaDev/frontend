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

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || '/default-icon.png', // Fallback icon
        badge: `${self.location.origin}/badge-icon.png`, // Badge icon (optional)
        vibrate: [200, 100, 200], // Vibration pattern
        tag: payload.notification.tag || "general-notification", // Ensures updates to existing notifications
        data: { url: payload.webpush?.fcmOptions?.link || '/' } // Store the link to open on click
    };


    self.registration.showNotification(notificationTitle, notificationOptions);
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
