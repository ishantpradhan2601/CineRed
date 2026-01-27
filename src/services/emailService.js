import emailjs from '@emailjs/browser';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// NOTE: Replace these with real keys from https://www.emailjs.com/
const SERVICE_ID = "service_tqfldr8";
const TEMPLATE_ID = "template_dlw5pxf";
const PUBLIC_KEY = "PtDqV_abhS6cqMTCQ";

export const sendWelcomeEmail = async (userData) => {
    const welcomeMessage = `Dearest ${userData.displayName},\n\nWelcome to CineRed! We are honored to have you join our exclusive community of cinema enthusiasts. Your cinematic journey begins now.\n\nBest regards,\nThe CineRed Team`;

    //  FULL STACK PERSISTENCE: Always log the email to Firestore first
    try {
        await addDoc(collection(db, "welcome_emails"), {
            to_email: userData.email,
            to_name: userData.displayName,
            subject: "Welcome to CineRed Premiere",
            body: welcomeMessage,
            sent_at: serverTimestamp(),
            status: (SERVICE_ID === "service_tqfldr8") ? "QUEUED_PENDING_KEYS" : "SENT"
        });
        console.log('Email persisted to Firestore database.');
    } catch (dbErr) {
        console.error('Failed to log email to Firestore:', dbErr);
    }

    // 2. DELIVERY ATTEMPT: Only proceed if keys are provided
    if (SERVICE_ID === "service_tqfldr8" || PUBLIC_KEY === "PtDqV_abhS6cqMTCQ") {
        console.warn("Real email delivery skipped: placeholders detected. Message is stored in your Firebase Database.");
        return { status: 'stored_in_db' };
    }

    try {
        const templateParams = {
            to_name: userData.displayName,
            to_email: userData.email,
            subject: "Welcome to the CineRed Premiere!",
            message: welcomeMessage,
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('Welcome email delivered via SMTP!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('SMTP Delivery failed:', error);
        throw error;
    }
};
