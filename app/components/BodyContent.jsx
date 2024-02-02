'use client'

import React, { useState } from 'react';
import { Inter } from 'next/font/google';

import { AuthContextProvider } from '@/app/lib/context/AuthContext';
import MasterPage from './MasterPage';

const inter = Inter({ subsets: ["latin"] });

const BodyContent = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleIsDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <body className={inter.className} data-bs-theme={isDarkMode ? 'dark' : 'light'}>
        <AuthContextProvider>
          <MasterPage isDarkMode={isDarkMode} toggleIsDarkMode={toggleIsDarkMode}>
            {children}
          </MasterPage>
        </AuthContextProvider>
      </body>
  )
}

export default BodyContent;