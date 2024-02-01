import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Custom Imports.
import firebaseConfig from './config';

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);

export async function getAuthenticatedAppForUser(session = null) {
    console.log("client: ", app);
}