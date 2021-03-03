import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useToast } from '../../hooks/useToast';
import { Api } from '../../services/Api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Animation, Background, Body, Container } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const ref = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormData) => {
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

        await Api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode acessar sua conta',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro ao criar conta',
          description: 'Dados inválidos',
          type: 'error',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Body>
        <Animation>
          <img src={logo} alt="GoBarber" />

          <Form ref={ref} onSubmit={handleSubmit}>
            <h1>Crie sua conta</h1>

            <Input
              autoComplete="new-password"
              name="name"
              placeholder="Nome"
              type="text"
              icon={FiUser}
            />

            <Input
              autoComplete="new-password"
              name="email"
              placeholder="E-mail"
              type="text"
              icon={FiMail}
            />

            <Input
              autoComplete="new-password"
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
