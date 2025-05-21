import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = () => {
      const savedLoginState = localStorage.getItem('isLoggedIn');
      const savedUserEmail = localStorage.getItem('userEmail');
      
      if (savedLoginState === 'true' && savedUserEmail) {
        setIsLoggedIn(true);
        setUser({ email: savedUserEmail });
      }
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  const login = (userData) => {
    try {
      if (!userData?.email) {
        throw new Error('Invalid user data');
      }
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', userData.email);
      setIsLoggedIn(true);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUser(null);
  };

  const resetPassword = async (email, otp, newPassword) => {
    console.log('Password reset requested for:', email);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        login,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;