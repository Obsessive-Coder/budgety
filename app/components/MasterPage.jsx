'use client'

import React, { useEffect, useState } from 'react'

import { useRouter, usePathname } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";

import { UserAuth } from '@/app/lib/context/AuthContext';
import { auth } from '@/app/lib/firebase/config';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Sidebar from '@/app/components/Sidebar';
import Spinner from '@/app/components/Spinner';

const MasterPage = ({ children }) => {
    const { user, logInGoogle, logOut } = UserAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const fullPathname = usePathname();

  const handleLogIn = async () => {
    try {
        await logInGoogle();
    } catch (error) {
        console.error(error);
    }
  };

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
      const unsubscribe = onAuthStateChanged(auth, authUser => {
        let pathname = '/welcome';
        const isAuthPage = fullPathname === '/welcome';

        if (authUser) {
          pathname = isAuthPage ? '/' : fullPathname;
        }

        router.push(pathname);
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }, [fullPathname, router, user]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header user={user} pathname={fullPathname} handleLogIn={handleLogIn} handleLogOut={handleLogOut} handleToggleSidebar={toggleSidebarIsOpen} />

          <main className="d-flex">
            {user && (
              <Sidebar isOpen={isSidebarOpen} user={user} handleToggleSidebar={toggleSidebarIsOpen} handleLogIn={handleLogIn} handleLogOut={handleLogOut} />
            )}

            <section className="d-flex justify-content-center flex-fill p-5">
              {children}
            </section>
          </main>

          <Footer />
        </>
      )}
    </>
    
  )
}

export default MasterPage