'use client'

import React from 'react';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';

// Custom Components.
import ChangePasswordModal from '@/app/components/ChangePasswordModal';
import ConfirmPasswordModal from '@/app/components/ConfirmPasswordModal';

const AccountPage = () => {
  const { user, setUserAlert, updateUserPassword, deleteAccount } = UserAuth();
  const isGoogleUser = user?.providerData.filter(({ providerId }) => providerId === 'google.com').length > 0;

  const handleConfirmPasswordChange = async password => {
    try {
      await updateUserPassword(password);
      setUserAlert({ variant: 'success', headingLabel: 'Change Password', message: 'Password successfully changed.'});
      setTimeout(() => setUserAlert(null), 5000);
    } catch ({ code, message }) {
      console.log(code, message);
      setUserAlert({ variant: 'warning', headingLabel: 'Change Password', message});
    }  
  };

  const handleConfirmDeleteAccount = async () => {
    try {
      await deleteAccount();
      setUserAlert({ variant: 'success', headingLabel: 'Delete Account', message: 'Account successfully deleted.'});
      setTimeout(() => setUserAlert(null), 5000);
    } catch ({ code, message }) {
      console.log(code, message);setUserAlert({ variant: 'warning', headingLabel: 'Change Password', message});
    }
  };

  return (
    <section>
        <h1>Account Page</h1>

        <section className="p-2 border rounded">
            {/* Reset Password */}
            {!isGoogleUser && (
                <ChangePasswordModal buttonClassName="d-block my-2" handleConfirm={handleConfirmPasswordChange} />
            )}
            

            {/* Delete Account */}
            <ConfirmPasswordModal
                buttonLabel="Delete Account"
                buttonVariant="outline-danger"
                buttonClassName="d-block my-2"
                headerLabel="Delete Account"
                modalLabel="Are you sure you want to delete your account? This action cannot be undone."
                handleConfirm={handleConfirmDeleteAccount}
            />
        </section>
    </section>
  )
}

export default AccountPage;