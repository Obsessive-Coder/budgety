'use client'

import React from 'react';

import Button from 'react-bootstrap/Button';

import { addDocument } from '@/app/lib/firebase/firestore';

const TransactionsPage = () => {
  const handleIt = async () => {
    // const x = addDocument('transactions', {
    //   name: 'Netflix',
    //   categoryId: '1',
    //   amount: 15.72,
    //   dueDate: '',
    //   paidDate: '',
    //   isRecurring: false,
    //   isPaid: false,

    // })
  };

  return (
    <div>
      <h1>Transactions Page</h1>

      <Button onClick={handleIt}>Add Transaction</Button>
    </div>
  )
}

export default TransactionsPage;