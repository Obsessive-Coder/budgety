'use client'

import { db } from './firebase';
import {
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot as _onSnapshot,
    getDoc
} from 'firebase/firestore';

export function onSnapshot(userId, collectionName = '', callback) {
    const q = query(collection(db, collectionName), where('userId', '==', userId));
    return _onSnapshot(q, callback);    
}

export async function getDocumentById(collectionName, documentId) {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: documentId, ...docSnap.data()};
        } else {
            throw new Error({ code: 0, message: 'Unknown Document' });
        }
    } catch ({ code, message }) {
        console.error(code, message);
    }
};

export async function getDocuments(collectionName, orderField, isDesc = false, searchTerm = '') {
    try {
        const documentRef = collection(db, collectionName);

        const  q = query(
            documentRef,
            ...(orderField ? [
                ...(searchTerm ? [where(orderField, '>=', searchTerm), where(orderField, '<=', searchTerm + '\uf8ff')] : []),
                orderBy(orderField, isDesc ? 'desc' : 'asc')
            ] : [])
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((document) => ({id: document.id, ...document.data()}));
    } catch ({ code, message }) {
        console.error(code, message);
    }
}

export async function getDocsByUserId(collectionName, userId, orderField, isDesc, recordLimit = 25) {
    try {
        const documentRef = collection(db, collectionName);

        const q = query(
            documentRef,
            where('userId', '==', userId),
            orderBy('userId'),
            orderBy(orderField, isDesc ? 'desc' : 'asc'),
            limit(recordLimit)
        );

        const querySnapshot = await getDocs(q);
        const x = querySnapshot.docs.map((document) => ({id: document.id, ...document.data()}));
        console.log('HERE: ', x);
        return x
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