import { Form } from '@unform/web';
import React from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Background, Body, Container } from './styles';

export const SignUp: React.FC = () => {
  const handleSubmit = (data: any): void => {
    console.log(data);
  };

  return (
    <Container>
      <Background />

      <Body>
        <img src={logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Crie sua conta</h1>

          <Input name="name" placeholder="Nome" type="text" icon={FiUser} />

          <Input name="email" placeholder="E-mail" type="text" icon={FiMail} />

          <Input
            name="password"
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="signin">
          <FiArrowLeft size={26} />
          Voltar para o Acesso
        </Link>
      </Body>
    </Container>
  );
};
