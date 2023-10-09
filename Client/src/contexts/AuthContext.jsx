import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userService from '../services/userService';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService(token);
        setUser(user);
      } catch (err) {
        alert(err.message);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = (newToken) => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.proptype = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
