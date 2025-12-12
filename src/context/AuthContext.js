"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const signUp = (userData) => {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        // Save to users list
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Set as current user
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;

        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    const signIn = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            signUp,
            signIn,
            signOut,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
