import { initializeApp } from 'firebase/app'
//import { getAuth } from 'firebase/auth'
import env from '@/core/env'
const firebaseConfig = {
  apiKey: env.string('VITE_PUBLIC_FIREBASE_API_KEY'),
  authDomain: env.string('VITE_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: env.string('VITE_PUBLIC_FIREBASE_PROJECT_ID'),
  messagingSenderId: env.string('VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: env.string('VITE_PUBLIC_FIREBASE_APP_ID'),
  measurementId: env.string('VITE_PUBLIC_FIREBASE_MEASUREMENT_ID'),
}
 export default firebaseConfig
export const app = initializeApp(firebaseConfig)

