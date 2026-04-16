import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { setAuthToken } from '../services/api.js';
import { login as loginRequest } from '../services/auth.js';

const AuthContext = createContext(null);

const initialAuth = () => {
  if (typeof window === 'undefined') return { user: null, token: null };
  const raw = localStorage.getItem('smartcampus-auth');
  return raw ? JSON.parse(raw) : { user: null, token: null };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    if (auth.token) {
      setAuthToken(auth.token);
      localStorage.setItem('smartcampus-auth', JSON.stringify(auth));
    } else {
      setAuthToken(null);
      localStorage.removeItem('smartcampus-auth');
    }
  }, [auth]);

  const signIn = async (email, password) => {
    try {
      const data = await loginRequest({ email, password });
      setAuth({ user: data.user, token: data.token });
      toast.success('Welcome back!');
      return data;
    } catch (error) {
      const message = error?.message || 'Unable to login. Please try again.';
      toast.error(message);
      throw new Error(message);
    }
  };

  const signOut = () => {
    api.defaults.headers.common.Authorization = '';
    setAuth({ user: null, token: null });
    toast('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
