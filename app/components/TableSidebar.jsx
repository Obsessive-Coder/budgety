'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseOffcanvas from './BaseOffcanvas';
import AddTransactionForm from './AddTransactionForm';

// Custom Imports.
import { addDocument, updateDocument } from '@/app/lib/firebase/firestore';
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTransactions } from '@/app/lib/context/TransactionsContext';

const buttonProps = {
  label: 'New Transaction',
  variant: 'primary',
  className: '',
};

const headerProps = { label: 'New Transaction' };

const TableSidebar = ({ userId, editingItemData, setEditingItemData }) => {
  const { setUserAlert } = UserAuth();
  const { setModifiedDocumentId } = UserTransactions();
  const [isOpen, setIsOpen] = useState(false);

  const isEditing = !!editingItemData?.id;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setEditingItemData(null);
  };

  const handleAddTransaction = async (transaction) => {
    try {
      const newDoc = await addDocument('transactions', { ...transaction, userId });

      handleClose();
      
      setUserAlert({ variant: 'success', headingLabel: 'Add Transaction', message: 'Transaction successfully added.'});
      setTimeout(() => {
        setUserAlert(null)
        setModifiedDocumentId(null);
      }, 5000);

      setModifiedDocumentId(newDoc.id);
    } catch ({ code, message}) {
      console.error(code, message);
      setUserAlert({ variant: 'warning', headingLabel: 'Add Transaction', message: 'Unable to add transaction. Please try again later.'});
      setTimeout(() => setUserAlert(null), 5000);
    }
  };

  const handleUpdateTransaction = async transaction => {
    const { id } = editingItemData;
    await updateDocument('transactions', id, { ...transaction, id })
    setModifiedDocumentId(id);
    handleClose();
    setTimeout(() => setModifiedDocumentId(null), 5000);

  };

  return (
    <section style={{ width: '22%' }} className="border rounded mx-3 p-2">
        <h4 className="text-center">Options</h4>

        <BaseOffcanvas 
          placement="end"
          isOpen={isOpen || isEditing}
          handleOpen={handleOpen}
          handleClose={handleClose}
          buttonProps={buttonProps}
          headerProps={{...headerProps, label: `${isEditing ? 'edit' : 'new'} transaction`}}
        >
          <AddTransactionForm
            isEditing={isEditing}
            editingItemData={editingItemData}
            handleAddTransaction={handleAddTransaction}
            handleUpdateTransaction={handleUpdateTransaction}
            handleCloseSidebar={handleClose}
          />
        </BaseOffcanvas>
    </section>
  )
}

export default TableSidebar;