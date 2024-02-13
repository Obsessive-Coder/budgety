'use client'

import React from 'react';

// Custom Components.
import BaseOffcanvas from './BaseOffcanvas';
import AddTransactionForm from './AddTransactionForm';

// Custom Imports.
import { addDocument } from '@/app/lib/firebase/firestore';

const buttonProps = {
  label: 'New Transaction',
  variant: 'primary',
  className: '',
};

const headerProps = { label: 'New Transaction' };

const TableSidebar = ({ userId }) => {
  const handleAddTransaction = async ({ note, ...transaction }) => {
    try {
      const { id: transactionId } = await addDocument('transactions', { ...transaction, userId });

      if (note) {
        addDocument('notes', { value: note, transactionId });
      }

      // TODO: Show alert/toast.
    } catch ({ code, message}) {
      console.error(code, message);
    }
  };

  return (
    <section style={{ width: '22%' }} className="border rounded mx-3 p-2">
        <h4 className="text-center">Options</h4>

        <BaseOffcanvas placement="end" buttonProps={buttonProps} headerProps={headerProps}>
          <AddTransactionForm handleAddTransaction={handleAddTransaction} />
        </BaseOffcanvas>
    </section>
  )
}

export default TableSidebar;