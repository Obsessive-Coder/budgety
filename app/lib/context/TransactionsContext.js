'use client'

import { createContext, useContext, useEffect, useState } from 'react';

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

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
              const transactions = await getDocsByUserId('transactions', user.uid);
              const transactionTypes = await getDocuments('transactionTypes');
              const transactionCategories = await getDocuments('transactionCategories');
              const accountTypes = await getDocuments('accountTypes');

              setTransactions(transactions);
              setTransactionTypes(transactionTypes);
              setTransactionCategories(transactionCategories);
              setAccountTypes(accountTypes)
            } catch (e) {
              console.log(e);
            }
        };

        if (user) {
            fetchTransactions();
        }
    }, [transactions.length, user]);

    return (
        <TransactionsContext.Provider value={{ transactions, transactionTypes, transactionCategories, accountTypes }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const UserTransactions = () => useContext(TransactionsContext);