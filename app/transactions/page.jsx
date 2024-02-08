'use client'

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';

// Custom Components.
import BaseTable from '../components/BaseTable';

// Custom Imponts.
import { addDocument, getDocuments } from '@/app/lib/firebase/firestore';
import { transactionsColumnLabels } from '@/app/lib/constants/transactions';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const handleIt = async () => {
    addDocument('transactions', {
      typeId: '0',
      categoryId: '0', 
      accountId: '0',
      noteId: '0',
      amount: 88.88,
      date: '',
      time: '',
      isRefund: false,
    })

    addDocument('transactions', {
      typeId: '1',
      categoryId: '1', 
      accountId: '1',
      noteId: '1',
      amount: 8888.88,
      date: '',
      time: '',
      isRefund: false,
    })
  };

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const transactions = await getDocuments('transactions');
          setTransactions(transactions);
        } catch ({ code, error }) {
          console.log(code, error);
        }
    };

    fetchTransactions();
  }, [transactions.length])

  return (
    <section className="flex-fill">
      <h1>Transactions Page</h1>

      {/* <Button onClick={handleIt}>Add</Button> */}

      <BaseTable headLabels={transactionsColumnLabels} items={transactions} />
    </section>
  )
}

export default TransactionsPage;