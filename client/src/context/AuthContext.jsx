// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api'; // Our API helper!

// 1. Create the context
const AuthContext = createContext();

// 2. Create the "Provider" component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs when the app starts
  // It checks localStorage to see if a user was already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- Auth Functions ---

  const login = async (email, password) => {
    try {
      // Use our 'api' helper to make the request
      const response = await api.post('/auth/login', { email, password });
      
      // 1. Put the user object in state
      setUser(response.data);
      // 2. Save the user object in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response; // Return the full response for flexibility
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Let the component handle the error
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      
      // 1. Put the user object in state
      setUser(response.data);
      // 2. Save the user object in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    // 1. Remove user from state
    setUser(null);
    // 2. Remove user from localStorage
    localStorage.removeItem('user');
  };

  // 3. Provide these values to all children
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Create a handy 'hook' to use this context easily
export const useAuth = () => {
  return useContext(AuthContext);
};