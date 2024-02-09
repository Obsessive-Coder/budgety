'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseOffcanvas from './BaseOffcanvas';
import AddTransactionForm from './AddTransactionForm';

const bodyLabel = 'Use the form to create and add a new transaction.';

const buttonProps = {
  label: 'Add Transaction',
  variant: 'primary',
  className: '',
};

const headerProps = { label: 'Add New Transaction' };

const TableSidebar = () => {
  return (
    <section style={{ width: '22%' }} className="border rounded mx-3 p-2">
        <h4 className="text-center">Options</h4>

        <BaseOffcanvas placement="end" bodyLabel={bodyLabel} buttonProps={buttonProps} headerProps={headerProps}>
          <AddTransactionForm />
        </BaseOffcanvas>
    </section>
  )
}

export default TableSidebar;