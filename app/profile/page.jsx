'use client'

import React from 'react'

import { UserAuth } from '@/app/lib/context/AuthContext';

const ProfilePage = () => {
  const { user } = UserAuth();

  return (
    <section>
      <h1>Profile Page</h1>

      {user ? (
        <p>Welcome, {user.displayName || user.email}</p>
      ) : (
        <p>Protected Route</p>
      )}
    </section>
  )
}

export default ProfilePage;