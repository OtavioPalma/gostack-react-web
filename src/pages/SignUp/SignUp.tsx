import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Animation, Background, Body, Container } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const ref = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      ref.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha deve ter ao menos 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      ref.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Body>
        <Animation>
          <img src={logo} alt="GoBarber" />

          <Form ref={ref} onSubmit={handleSubmit}>
            <h1>Crie sua conta</h1>

            <Input name="name" placeholder="Nome" type="text" icon={FiUser} />

            <Input
              name="email"
              placeholder="E-mail"
              type="text"
              icon={FiMail}
            />

            <Input
              name="password"
              placeholder="Senha"
              type="password"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={26} />
            Voltar para o Acesso
          </Link>
        </Animation>
      </Body>
    </Container>
  );
};
