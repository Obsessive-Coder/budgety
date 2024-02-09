'use client'

import React, { useState } from 'react';

// Custom Components.
import BaseOffcanvas from './BaseOffcanvas';
import AddTransactionForm from './AddTransactionForm';

const buttonProps = {
  label: 'New Transaction',
  variant: 'primary',
  className: '',
};

const headerProps = { label: 'New Transaction' };

const TableSidebar = () => {
  return (
    <section style={{ width: '22%' }} className="border rounded mx-3 p-2">
        <h4 className="text-center">Options</h4>

        <BaseOffcanvas placement="end" buttonProps={buttonProps} headerProps={headerProps}>
          <AddTransactionForm />
        </BaseOffcanvas>
    </section>
  )
}

export default TableSidebar;