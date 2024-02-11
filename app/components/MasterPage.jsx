'use client'

import React, { use, useState } from 'react'
import { usePathname } from 'next/navigation';

// Custom Components.
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar'
import UserAlert from './UserAlert';

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { UserTheme } from '@/app/lib/context/ThemeContext';

const MasterPage = ({ children }) => {
  const { theme, toggleTheme } = UserTheme();
  const { user, userAlert, setUserAlert, logOut } = UserAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isDarkMode = theme === 'dark';

  const handleLogOut = async () => {
      try {
          await logOut();
      } catch (error) {
          console.error(error);
      }
  };

  const toggleSidebarIsOpen = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  }

  return (
    <div>
      <Header user={user} isDarkMode={isDarkMode} handleToggleTheme={toggleTheme} handleLogOut={handleLogOut} />

      <div className="d-flex">
        {user && (
          <Sidebar isOpen={isSidebarOpen} pathname={pathname} handleToggleSidebar={toggleSidebarIsOpen} />
        )}

        <main className="flex-fill">
          <section className="d-flex justify-content-center flex-fill p-3">
            {children}
          </section>

          {userAlert && (
            <UserAlert userAlert={userAlert} setUserAlert={setUserAlert} />
          )}
        </main>
      </div>

      <Footer />
    </div>
    
  )
}

export default MasterPage