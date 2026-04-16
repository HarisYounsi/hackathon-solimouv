/**
 * Configuration Firebase pour l'application Solimouv'
 *
 * Les variables d'environnement sont préfixées VITE_ pour être accessibles
 * côté client dans Vite (cf. .env.example pour la liste complète).
 */

import { initializeApp } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'

// Configuration Firebase - valeurs depuis les variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialisation de l'application Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)

// Export des services Firebase utilisés dans l'application
export const db: Firestore = getFirestore(app)
export const auth: Auth = getAuth(app)

export default app
