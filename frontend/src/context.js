import React, { useState, createContext } from 'react';

export const Context = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Check localStorage for existing user on initial load
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    return (
        <Context.Provider value={[user, setUser]}>
            {children}
        </Context.Provider>
    );
};

export default UserProvider;
