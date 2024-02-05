'use client'

import React, { useState } from 'react'
import { usePathname } from "next/navigation";

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/Sidebar'

const MasterPage = ({ children, isDarkMode = false, toggleIsDarkMode }) => {
    const { user, logOut } = UserAuth();
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

      <Footer />
    </div>
    
  )
}

export default MasterPage