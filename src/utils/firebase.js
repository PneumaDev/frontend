import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Initialize Firebase
export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request Notification Permission and Get Token
export const getAdminFCMToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_API_KEY,
        });


        if (token) {
            return token;
        } else {
            console.log("No FCM token available.");
        }
    } catch (error) {
        console.error("Error getting FCM token:", error);
    }
};

// Handle foreground messages
onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    alert(payload.notification.title + "\n" + payload.notification.body);
});
