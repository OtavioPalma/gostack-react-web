import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Background, Body, Container } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Body>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Faça seu login</h1>

          <input placeholder="E-mail" />
          <input placeholder="Senha" type="password" />

          <button type="submit">Entrar</button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="signup">
          <FiLogIn size={26} />
          Criar Conta
        </a>
      </Body>

      <Background />
    </Container>
  );
};
