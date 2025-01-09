'use client'

import React, { createContext, useContext, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
    user: null
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};