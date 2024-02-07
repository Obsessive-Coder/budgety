'use client'

import React from 'react';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/app/lib/context/AuthContext';
import { ThemeProvider, UserTheme } from '@/app/lib/context/ThemeContext';
import MasterPage from './MasterPage';

const inter = Inter({ subsets: ["latin"] });

const Body = ({ children }) => {
  const { theme } = UserTheme();

  return (
    <body className={inter.className} data-bs-theme={theme}>        
      <AuthProvider>
        <MasterPage>
          {children}
        </MasterPage>
      </AuthProvider>
    </body>
  );
};

const BodyContent = ({ children }) => {
  return (
    <ThemeProvider>
      <Body>{children}</Body>
    </ThemeProvider>
  )
}

export default BodyContent;