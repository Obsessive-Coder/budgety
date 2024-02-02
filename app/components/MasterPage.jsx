'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

// Custom Imports.
import { UserAuth } from '@/app/lib/context/AuthContext';
import { keepTheme } from '@/app/lib/theme';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/Sidebar'

const MasterPage = ({ children }) => {
    const { user, logOut } = UserAuth();
    const [className, setClassName] = useState('theme-dark');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const fullPathname = usePathname();

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

  useEffect(() => {
    keepTheme(setClassName)
  }, [setClassName])

  return (
    <div className={className}>
      <Header pathname={fullPathname} handleToggleSidebar={toggleSidebarIsOpen} />

      <main className="d-flex">
        {user && (
          <Sidebar
            isOpen={isSidebarOpen}
            theme={className.split('-')[1]}
            handleSetTheme={setClassName}
            handleToggleSidebar={toggleSidebarIsOpen}
            handleLogOut={handleLogOut}
          />
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