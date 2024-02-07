'use client'

import { db } from './firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

export async function getDocuments(collectionName) {
    try {
        const documents = await getDocs(collection(db, collectionName));

        if (!documents) {
            throw new Error('Error retrieving the documents. Please try again later');
        }

        return documents;
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