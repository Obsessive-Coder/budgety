'use client'

import React, { useState } from 'react'

// Custom Components.
import AuthenticationForm from '@/app/components/AuthenticationForm'

const WelcomePage = () => {
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const toggleIsRegisterForm = () => setIsRegisterForm(!isRegisterForm);

  return (
    <section className="p-3 bg-dark text-dark-emphasis rounded">
        <h1 className="text-center">{isRegisterForm ? 'Create Account' : 'Login'}</h1>
        <AuthenticationForm isRegisterForm={isRegisterForm} toggleIsRegisterForm={toggleIsRegisterForm} />
    </section>
  )
}

export default WelcomePage