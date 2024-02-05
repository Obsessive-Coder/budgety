'use client'

import React from 'react';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';

// Custom Components.
import ConfirmPasswordModal from '@/app/components/ConfirmPasswordModal';

const SettingsPage = () => {
  const { deleteAccount } = UserAuth();

  return (
    <section>
        <h1>SettingsPage</h1>

        <ConfirmPasswordModal
          buttonLabel="Delete Account"
          buttonVariant="outline-danger"
          buttonClassName="mx-auto d-block my-5"
          handleConfirm={deleteAccount}
        />
    </section>
  )
}

export default SettingsPage;