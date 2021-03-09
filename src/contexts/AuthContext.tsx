import React, { createContext, useCallback, useState } from 'react';
import { AuthContextData, AuthState, User } from '../models/auth';
import { Api } from '../services/Api';

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      Api.defaults.headers.authorization = `Bearer ${token}`;

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

    Api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
  }, []);

  const updateUser = useCallback((user: User) => {
    setData(state => ({ token: state.token, user }));

    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
