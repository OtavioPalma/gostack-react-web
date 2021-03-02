import React, { createContext, useCallback } from 'react';
import { Toast } from '../components/Toast/Toast';
import { ToastContextData } from '../models/toast';

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('add toast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('remove toast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <Toast />
    </ToastContext.Provider>
  );
};
