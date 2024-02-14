'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Custom Imports.
import { UserAuth } from './AuthContext.js';
import { getDocsByUserId, getDocuments } from '../firebase/firestore';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const { user } = UserAuth();
    const [transactions, setTransactions] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionCategories, setTransactionCategories] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);

    const fetchTransactions = useCallback(async (orderField = 'date', isDesc = true) => {
      try {
        const transactions = await getDocsByUserId('transactions', user.uid, orderField, isDesc);
        const transactionTypes = await getDocuments('transactionTypes');
        const accountTypes = await getDocuments('accountTypes');
        const transactionCategories = await getDocuments('transactionCategories');

        const parentCategories = transactionCategories.filter(({ parentCategoryId }) => !parentCategoryId);

        const groupedCategories = parentCategories.map(category => ({
          ...category,
          items: transactionCategories.filter(({ parentCategoryId }) => parentCategoryId === category.id)
        }));

        setTransactions(transactions);
        setTransactionTypes(transactionTypes);
        setTransactionCategories(groupedCategories);
        setAccountTypes(accountTypes)
      } catch (e) {
        console.log(e);
      }
  }, [user.uid]);

    useEffect(() => {
        if (user) {
            fetchTransactions();
        }
    }, [transactions.length, user, fetchTransactions]);

    const data = { transactions, transactionTypes, transactionCategories, accountTypes, fetchTransactions };

    return (
        <TransactionsContext.Provider value={data}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const UserTransactions = () => useContext(TransactionsContext);