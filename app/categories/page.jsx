'use client'

import React from 'react';

// Custom Components.
import CategoryList from '../components/CategoryList';

// Custom Imports.
import { UserAuth } from '../lib/context/AuthContext';
import { TransactionsProvider } from '../lib/context/TransactionsContext';

const CategoriesPage = () => {
  const { user } = UserAuth();
  if (!user) return null;
  
  return (
    <section className="flex-fill">
        <h1>Categories Page</h1>

        <section className="d-flex">
            <TransactionsProvider>
                <CategoryList />
            </TransactionsProvider>
        </section>
    </section>
  )
}

export default CategoriesPage;