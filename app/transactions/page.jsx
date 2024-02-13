'use client'

import React from 'react';

import Button from 'react-bootstrap/Button';

// Custom Components.
import BaseTable from '../components/BaseTable';
import TableSidebar from '../components/TableSidebar';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTransactions, TransactionsProvider } from '@/app/lib/context/TransactionsContext';
import { addDocument } from '@/app/lib/firebase/firestore';
import { transactionsColumnLabels } from '@/app/lib/constants/transactions';
import { seedTransactions } from '@/data/transactionsSeeder';

const AddTransactionTable = () => {
  const { transactions } = UserTransactions();

  return (
    <BaseTable
      items={transactions}
      headLabels={transactionsColumnLabels}
      tableClassName="flex-fill"
    />
  );
};

const TransactionsPage = () => {
  const { user } = UserAuth();

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

  if (!user) return null;

  return (
    <section className="flex-fill">
      <h1>Transactions Page</h1>

      {/* <Button onClick={() => seedTransactions(user.uid)}>Click It</Button> */}

      <section className="d-flex">
        <TransactionsProvider>
          <AddTransactionTable />

          <TableSidebar userId={user.uid} />
        </TransactionsProvider>
      </section>
    </section>
  )
}

export default TransactionsPage;