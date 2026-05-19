 import React, { createContext, useState, useEffect, useContext } from 'react';
 
import { getToken, saveToken, removeToken } from '../utils/storage';

type AuthData = {
  accessToken: string;
  refreshToken?: string | null;
  user?: any;
};

type AuthContextType = {
  token: string | null;
  user: any;
  loading: boolean;
  isLoggedIn: boolean;
  login: (data: AuthData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  loading: true,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  
  const isLoggedIn = !!token;
 
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          setToken(storedToken);

           
        }
      } catch (err) {
        console.log('Auth restore error:', err);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

   
  const login = async (data: AuthData) => {
    await saveToken(data.accessToken);

    setToken(data.accessToken);
    setUser(data.user || null);
  };
 
  const logout = async () => {
    await removeToken();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

 
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};