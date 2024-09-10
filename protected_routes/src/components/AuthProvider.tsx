import React, { createContext, useEffect, useState } from 'react';
import { getUser, Login, User } from '../api/auth';

interface AuthContextType {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null | undefined>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        const { authToken, user } = res[1];
        setAuthToken(authToken);
        setCurrentUser(user);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await Login();
      const { authToken, user } = res[1];
      setAuthToken(authToken);
      setCurrentUser(user);
    } catch {
      setAuthToken(null);
      setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    setAuthToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
