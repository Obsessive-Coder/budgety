'use client'

import React from 'react';

import Button from 'react-bootstrap/Button';

import { addDocument } from '@/app/lib/firebase/firestore';

const TransactionsPage = () => {
  const handleIt = async () => {
    // await addDocument('transactions', { name: 'Hulu', amount: 20.00, isPaid: false })
    // const x = await getDocuments('transactions', {name: 'Netflix', amount: 25, isPaid: false});
    // x.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const x = await updateDocument('transactions', 'ajwBMOyVHmz7kKe4sFUs', {name: 'Yahoo'})

    // await deleteDocument('transactions', 'ajwBMOyVHmz7kKe4sFUs')
    // await getDocument('transactions', 'ajwBMOyVHmz7kKe4sFUs ')
  };
  return (
    <div>
      <h1>Transactions Page</h1>

      <Button onClick={handleIt}>Add Transaction</Button>
    </div>
  )
}

export default TransactionsPage;