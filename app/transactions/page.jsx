'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseTable from '../components/BaseTable';
import TableSidebar from '../components/TableSidebar';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTransactions, TransactionsProvider } from '@/app/lib/context/TransactionsContext';
import { transactionsColumnLabels } from '@/app/lib/constants/transactions';

const TransactionTable = () => {
  const { transactions, fetchTransactions } = UserTransactions();
  const [sortData, setSortData] = useState({ orderField: 'date', isDesc: false});
  const { user } = UserAuth();
  if (!user) return null;

  const toggleSortData = ({ currentTarget }) => {
    const orderField = currentTarget.getAttribute('data-order-field');    
    const { isDesc } = sortData;
    setSortData({ orderField, isDesc: orderField === sortData.orderField ? !isDesc : false});
    fetchTransactions(orderField, !isDesc);
  }

  return (
    <BaseTable
      items={transactions}
      headLabels={transactionsColumnLabels}
      sortData={sortData}
      handleSort={toggleSortData}
      tableClassName="flex-fill"
    />
  );
};

const TransactionsPage = () => {
  const { user } = UserAuth();
  if (!user) return null;

  return (
    <section className="flex-fill">
      <h1>Transactions Page</h1>

      <section className="d-flex">
        <TransactionsProvider>
          <TransactionTable />

          <TableSidebar userId={user.uid} />
        </TransactionsProvider>
      </section>
    </section>
  )
}

export default TransactionsPage;