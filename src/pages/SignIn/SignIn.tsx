import React from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Background, Body, Container } from './styles';

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Body>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Entre com sua conta</h1>

          <Input name="email" placeholder="E-mail" type="text" icon={FiMail} />

          <Input
            name="password"
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <Link to="signup">
          <FiLogIn size={26} />
          Criar Conta
        </Link>
      </Body>

      <Background />
    </Container>
  );
};
