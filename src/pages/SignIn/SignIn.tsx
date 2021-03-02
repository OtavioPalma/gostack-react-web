import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Background, Body, Container } from './styles';

interface FormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const ref = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao acessar conta',
          description: 'Credenciais inválidas',
          type: 'error',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Body>
        <img src={logo} alt="GoBarber" />

        <Form ref={ref} onSubmit={handleSubmit}>
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
        </Form>

        <Link to="signup">
          <FiLogIn size={26} />
          Criar Conta
        </Link>
      </Body>

      <Background />
    </Container>
  );
};
