'use client'

import React from 'react';

// Bootstrap Components.
import Button from 'react-bootstrap/Button';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';

const SettingsPage = () => {
  const { deleteAccount } = UserAuth();

  return (
    <section>
        <h1>SettingsPage</h1>

        <Button variant="outline-danger" onClick={deleteAccount} className="mx-auto d-block my-5">
          Delete Account
        </Button>
    </section>
  )
}

export default SettingsPage;