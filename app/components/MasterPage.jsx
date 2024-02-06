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

const MasterPage = ({ children, isDarkMode = false, toggleIsDarkMode }) => {
  const { user, userAlert, setUserAlert, logOut } = UserAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

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
      <Header user={user} isDarkMode={isDarkMode} handleToggleIsDarkMode={toggleIsDarkMode} handleLogOut={handleLogOut} />

      <main className="d-flex">
        {user && (
          <Sidebar isOpen={isSidebarOpen} pathname={pathname} handleToggleSidebar={toggleSidebarIsOpen} />
        )}

        <section className="d-flex justify-content-center flex-fill p-5">
          {children}
        </section>
      </main>

      {userAlert && (
        <UserAlert userAlert={userAlert} setUserAlert={setUserAlert} />
      )}

      <Footer />
    </div>
    
  )
}

export default MasterPage