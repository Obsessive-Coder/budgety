'use client'

import { useContext, createContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Custom Imports.
import { 
    onAuthStateChanged,
    loginEmailPassword,
    registerEmailPassword,
    loginGoogle,
    reauthenticateGoogle,
    logOut as _logOut,
    deleteAccount as _deleteAccount,
} from '@/app/lib/firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const fullPathname = usePathname();
    const router = useRouter();

    const loginWithEmailPassword = (email, password) => {
        return loginEmailPassword(email.trim(), password.trim());
    };

    const registerWithEmailPassword = (email, password) => {
        return registerEmailPassword(email.trim(), password.trim());
    };

    const logInWithGoogle = () => {
        return loginGoogle();
    };

    const reauthenticateWithGoogle = () => {
        return reauthenticateGoogle();
    };

    const logOut = () => {
        return _logOut();
    };

    const deleteAccount = () => {
        return _deleteAccount();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            let pathname = '/welcome';
            const isAuthPage = fullPathname === '/welcome';
    
            if (authUser) {
              pathname = isAuthPage ? '/' : fullPathname;
              sessionStorage.setItem('user', JSON.stringify(authUser));
            } else {
              sessionStorage.removeItem('user');
            }
            
            setUser(authUser);
            router.push(pathname);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [fullPathname, router, user]);

    return (
        <AuthContext.Provider value={{
            user, logInWithGoogle, loginWithEmailPassword, registerWithEmailPassword, logOut, deleteAccount,
            reauthenticateWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};