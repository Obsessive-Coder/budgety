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
  const { 
    transactions, 
    fetchTransactions,
    transactionTypes, 
    transactionCategories, 
    accountTypes,
    modifiedDocumentId,
  } = UserTransactions();
  
  const [sortData, setSortData] = useState({ orderField: 'date', isDesc: true});
  const { user } = UserAuth();
  if (!user) return null;

  const toggleSortData = ({ currentTarget }) => {
    const orderField = currentTarget.getAttribute('data-order-field');    
    const { isDesc } = sortData;
    setSortData({ orderField, isDesc: orderField === sortData.orderField ? !isDesc : false});
    fetchTransactions(orderField, !isDesc);
  }

  const getIdColumnText = (dataKey, dataId) => {
    const staticData = { typeId: transactionTypes, categoryId: transactionCategories, accountId: accountTypes };

    return staticData[dataKey]
      ?.filter(({ id, items = [] }) => {
        return id === dataId || items.filter(({ id }) => id === dataId).length > 0;
      })[0]?.definition ?? 'Unknown value';
  };

  const getIsTransactionExpense = itemId => {
    const item = transactions.filter(({ id }) => id === itemId)[0];
    const expenseType = transactionTypes.filter(({ definition }) => definition === 'expense')[0];
    return item?.typeId === expenseType?.id;
  };

  return (
    <BaseTable
      items={transactions}
      headLabels={transactionsColumnLabels}
      getIsTransactionExpense={getIsTransactionExpense}
      modifiedDocumentId={modifiedDocumentId}
      sortData={sortData}
      getIdColumnText={getIdColumnText}
      handleSort={toggleSortData}
      tableClassName="flex-fill"
      bodyClassName="text-capitalize"
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