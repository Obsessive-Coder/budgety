'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Custom Imports.
import { UserAuth } from './AuthContext.js';
import { getDocsByUserId, getDocuments, onSnapshot } from '../firebase/firestore';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const { user } = UserAuth();
    const [transactions, setTransactions] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionCategories, setTransactionCategories] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [modifiedDocumentId, setModifiedDocumentId] = useState(null);

    const fetchLoaderData = useCallback(async () => {
      try {
        const transactionTypes = await getDocuments('transactionTypes');
        const accountTypes = await getDocuments('accountTypes');
        const transactionCategories = await getDocuments('transactionCategories');

        const parentCategories = transactionCategories.filter(({ parentCategoryId }) => !parentCategoryId);

        const groupedCategories = parentCategories.map(category => ({
          ...category,
          items: transactionCategories.filter(({ parentCategoryId }) => parentCategoryId === category.id)
        }));

        setTransactionTypes(transactionTypes);
        setTransactionCategories(groupedCategories);
        setAccountTypes(accountTypes)
      } catch ({ code, message }) {
        console.error(code, message);
      }
  }, []);

  const fetchTransactions = useCallback(async (orderField = 'date', isDesc = true) => {
    try {
      const transactions = await getDocsByUserId('transactions', user.uid, orderField, isDesc);
      setTransactions(transactions);
    } catch ({ code, message }) {
      console.error(code, message);
    }
  }, [user.uid]);

    useEffect(() => {
      if (user) {
        fetchLoaderData();
      }

      const unsubscribe = () => onSnapshot(user.uid, 'transactions', querySnapshot => {
        const snapshotTransactions = querySnapshot.docs.map(document => ({ ...document.data(), id: document.id }));
        setTransactions(snapshotTransactions);
      });
      
      return () => unsubscribe();
    }, [fetchLoaderData, user]);    

    const data = {
      transactions,
      transactionTypes,
      transactionCategories,
      accountTypes,
      modifiedDocumentId,
      setModifiedDocumentId,
      fetchTransactions
    };

    return (
        <TransactionsContext.Provider value={data}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const UserTransactions = () => useContext(TransactionsContext);