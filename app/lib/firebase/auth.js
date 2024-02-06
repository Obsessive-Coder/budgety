'use client'

import { 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    reauthenticateWithPopup,
    signOut,
    deleteUser,
    sendPasswordResetEmail as _sendPasswordResetEmail,
    updatePassword as _updatePassword,
    onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';

import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(auth, cb);
}

export async function reauthenticateGoogle() {
    try {
        const userCredential = await reauthenticateWithPopup(auth.currentUser, googleProvider);

        if (!userCredential?.user) {
            throw new Error('Error logging in with Google. Please try again later.');
        }

        return userCredential;
    } catch ({ code, message }) {
        console.error(code, message);
    }
};

export async function loginGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);

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

export async function updatePassword (newPassword) {
    if (!newPassword) {
        throw new Error('Please provide a new password.');
    }

    try {
        return await _updatePassword(auth.currentUser, newPassword.trim());
    } catch ({ code, message }) {
        console.error(code, message);
    }
};

export async function sendPasswordResetEmail (email) {
    if (!email) {
        throw new Error('Please provide a valid email address.');
    }

    try {
        await _sendPasswordResetEmail(auth, email.trim());
    } catch ({code, message}) {
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
