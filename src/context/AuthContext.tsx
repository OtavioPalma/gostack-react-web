import React, { createContext, useCallback, useContext, useState } from 'react';
import { Api } from '../services/Api';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: AuthCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await Api.post<AuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    setData({ token, user });
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  const signOut = useCallback(() => {
    console.log('signout');
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};