"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const ADMIN_EMAIL = "admin@vapenova.com";
const ADMIN_PASSWORD = "gilbertvape123";

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin');
        if (adminStatus === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const login = (email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            localStorage.setItem('isAdmin', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout, ADMIN_EMAIL, ADMIN_PASSWORD }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);
