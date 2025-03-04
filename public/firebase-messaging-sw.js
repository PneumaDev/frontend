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