'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseTable from '../components/BaseTable';
import TableSidebar from '../components/TableSidebar';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTransactions, TransactionsProvider } from '@/app/lib/context/TransactionsContext';
import { transactionsColumnLabels } from '@/app/lib/constants/transactions';
import { addDocument, deleteDocument, getDocumentById, getDocuments } from '@/app/lib/firebase/firestore';
import { USDollar } from '@/app/lib/helpers/global';

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
  
  const [sortData, setSortData] = useState({ orderField: 'date', isDesc: true });
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

    if (dataKey === 'otherPartyId') {
      // IMPORTANT: Finish this.'
      return dataId;
      // const otherParties = await getDocumentById('otherParties', dataId)
      // staticData[dataKey] = [otherParties];
    }

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

  const handleDuplicateItem = async item => {
    delete item.id;

    const duplicateDocument = await addDocument('transactions', item);
    setModifiedDocumentId(duplicateDocument.id);

    setTimeout(() => setModifiedDocumentId(null), 5000);
  };

  const handleMenuItemOnClick = async (itemId, action) => {
    const item = transactions.filter(({ id }) => id === itemId)[0];

    switch (action) {
      case 'duplicate':
        handleDuplicateItem(item);
        break;

      case 'refund':
        const { id: typeId } = transactionTypes.filter(({ definition }) => definition === 'refund')[0];
        handleDuplicateItem({ ...item, typeId, amount: Math.abs(item.amount)});
        break;

      case 'edit':
        setEditingItemData(item);
        break;

      case 'delete':
        deleteDocument('transactions', itemId);
    
      default:
        break;
    }
  }

  const totalAmount = transactions.reduce((prev, { id, amount }) => prev += getIsTransactionExpense(id) ? -amount : amount, 0);

  return (
    <div className='flex-fill'>
      <div className="d-flex justify-content-between h4">
        <span>Transactions: {transactions.length}</span>
        <span className={`${totalAmount < 0 ? 'text-danger' : 'text-success'}`}>
          Total: {USDollar.format(totalAmount)}
        </span>
      </div>

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
    </div>
  );
};

const TransactionsPage = () => {  
  const { user } = UserAuth();
  const [editingItemData, setEditingItemData] = useState(null);

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