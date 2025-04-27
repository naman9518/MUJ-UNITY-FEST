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
      
      if (savedLoginState === 'true') {
        setIsLoggedIn(true);
        setUser({ email: savedUserEmail });
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', userData.email);
    
    setIsLoggedIn(true);
    setUser(userData);
    
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    setUser(null);
  };

  const resetPassword = async (email, otp, newPassword) => {
    // this would make an API call to reset the password
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