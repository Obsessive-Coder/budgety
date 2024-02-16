'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseTable from '../components/BaseTable';
import TableSidebar from '../components/TableSidebar';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTransactions, TransactionsProvider } from '@/app/lib/context/TransactionsContext';
import { transactionsColumnLabels } from '@/app/lib/constants/transactions';
import { addDocument, deleteDocument } from '@/app/lib/firebase/firestore';

const TransactionTable = ({ setEditingItemData }) => {
  const { 
    transactions, 
    fetchTransactions,
    transactionTypes, 
    transactionCategories, 
    accountTypes,
    modifiedDocumentId,
    setModifiedDocumentId
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

  const handleMenuItemOnClick = async (itemId, action) => {
    const collectionName = 'transactions';
    const item = transactions.filter(({ id }) => id === itemId)[0];

    switch (action) {
      case 'duplicate':
        delete item.id;

        const duplicateDocument = await addDocument(collectionName, item);
        setModifiedDocumentId(duplicateDocument.id);

        setTimeout(() => setModifiedDocumentId(null), 5000);
        break;

      case 'refund':
      
        break;

      case 'edit':
        setEditingItemData(item);
        break;

      case 'delete':
        deleteDocument(collectionName, itemId);
    
      default:
        break;
    }

  }

  return (
    <BaseTable
      items={transactions}
      headLabels={transactionsColumnLabels}
      getIsTransactionExpense={getIsTransactionExpense}
      modifiedDocumentId={modifiedDocumentId}
      sortData={sortData}
      getIdColumnText={getIdColumnText}
      handleSort={toggleSortData}
      handleMenuItemOnClick={handleMenuItemOnClick}
      tableClassName="flex-fill"
      bodyClassName="text-capitalize"
    />
  );
};

const TransactionsPage = () => {
  const x = {id: '1', accountId: '6X8mHeSvMfhi7KuthdXL', amount: 800, categoryId: 'PJuBqSx3g4Wi0Me4XPug', date: '2024-02-16', note: '', time: '11:11', typeId: 'x4yl2YTRR8N97eMB2ocC', userId: '9vHPy5TyMfg8gdBWdRuCBKTwUl03' };
  
  const { user } = UserAuth();
  const [editingItemData, _setEditingItemData] = useState(null);

  const setEditingItemData = (x) => {
    _setEditingItemData(x)
  }

  if (!user) return null;

  return (
    <section className="flex-fill">
      <h1>Transactions Page</h1>

      <section className="d-flex">
        <TransactionsProvider>
          <TransactionTable setEditingItemData={setEditingItemData} />

          <TableSidebar userId={user.uid} editingItemData={editingItemData} setEditingItemData={setEditingItemData} />
        </TransactionsProvider>
      </section>
    </section>
  )
}

export default TransactionsPage;