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
    updatePassword,
    logOut as _logOut,
    deleteAccount as _deleteAccount,
    sendPasswordResetEmail as _sendPasswordResetEmail,
} from '@/app/lib/firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAlert, setUserAlert] = useState(null);
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

    const updateUserPassword = newPassword => {
        return updatePassword(newPassword);
    };

    const sendPasswordResetEmail = email => {
        return _sendPasswordResetEmail(email);
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
            user, userAlert, logInWithGoogle, loginWithEmailPassword, registerWithEmailPassword, updateUserPassword,
            logOut, deleteAccount, reauthenticateWithGoogle, setUserAlert, sendPasswordResetEmail
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};