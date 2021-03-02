import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/Routes';
import GlobalStyle from './styles/global';

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <GlobalStyle />
    </>
  );
};
