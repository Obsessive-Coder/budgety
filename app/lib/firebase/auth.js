'use client'

import { 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    deleteUser,
    onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { auth } from './firebase';

export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(auth, cb);
}

export async function loginGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        if (!userCredential?.user) {
            throw new Error('Error logging in with Google. Please try again later.');
        }

        return userCredential;
    } catch (error) {
        const { code, message } = error;
        console.error(code, message);
    }
};

export async function loginEmailPassword(email, password) {
    if (!email || !password) {
        throw new Error('Please provide an email and password.');
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());    

        if (!userCredential?.user) {
            throw new Error('Unknown user. Please try again.');
        }

        return userCredential;
    } catch (error) {
        const { code, message } = error;
        console.error(code, message);
    }
};

export async function registerEmailPassword(email, password) {
    if (!email || !password) {
        throw new Error('Please provide and email and password.');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());

        if (!userCredential?.user) {
            throw new Error('Error creating user. Please try again later');
        }

        return userCredential;
    } catch (error) {
        const { code, message } = error;
        console.error(code, message);
    }
};

export async function logOut() {
    try {
        return signOut(auth);
    } catch (error) {
        const { code, message } = error;
        console.error(code, message);
    }
};

export async function deleteAccount () {
    if (!auth?.currentUser) {
        throw new Error('No user id was provided. Please try again.');
    }

    try {
        await deleteUser(auth.currentUser);
    } catch (error) {
        const { code, message } = error;
        console.error(code, message);        
    }
};
