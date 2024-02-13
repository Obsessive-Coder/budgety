'use client'

import { db } from './firebase';
import { collection, doc, addDoc, getDocs, getDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

export async function getDocuments(collectionName) {
    try {
        const documentRef = collection(db, collectionName);
        const  q = query(documentRef);
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((document) => ({id: document.id, ...document.data()}));
    } catch ({ code, message }) {
        console.error(code, message);
    }
}

export async function getDocsByUserId(collectionName, userId) {
    try {
        const documentRef = collection(db, collectionName);
        const q = query(documentRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((document) => ({id: document.id, ...document.data()}));
    } catch ({ code, message }) {
        console.error(code, message);
    }
}

export async function addDocument (collectionName, data) {
    try {
        const documentRef = await addDoc(collection(db, collectionName), data);

        if (!documentRef?.id) {
            throw new Error('Error adding new document. Please try again later.');
        }

        return documentRef;
      } catch ({ code, message }) {
        console.error(code, message);
      }
}

export async function updateDocument (collectionName, documentId, document) {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await updateDoc(documentRef, document);
    } catch ({ code, message }) {
        console.error(code, error);        
    }
}

export async function deleteDocument(collectionName, documentId) {
    try {
        const documentRef = doc(db, collectionName, documentId);
        await deleteDoc(documentRef);
    } catch ({ code, message}) {
        console.error(code, message);        
    }
}