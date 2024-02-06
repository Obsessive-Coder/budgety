'use client'

import React from 'react';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';

// Custom Components.
import ChangePasswordModal from '@/app/components/ChangePasswordModal';
import ConfirmPasswordModal from '@/app/components/ConfirmPasswordModal';

const AccountPage = () => {
  const { user, updateUserPassword, deleteAccount } = UserAuth();
  const isGoogleUser = user?.providerData.filter(({ providerId }) => providerId === 'google.com').length > 0;

  return (
    <section>
        <h1>Account Page</h1>

        <section className="p-2 border rounded">
            {/* Reset Password */}
            {!isGoogleUser && (
                <ChangePasswordModal buttonClassName="d-block my-2" handleConfirm={updateUserPassword} />
            )}
            

            {/* Delete Account */}
            <ConfirmPasswordModal
                buttonLabel="Delete Account"
                buttonVariant="outline-danger"
                buttonClassName="d-block my-2"
                headerLabel="Confirm Account Deletion"
                modalLabel="Are you sure you want to delete your account? This action cannot be undone."
                handleConfirm={deleteAccount}
            />
        </section>
    </section>
  )
}

export default AccountPage;