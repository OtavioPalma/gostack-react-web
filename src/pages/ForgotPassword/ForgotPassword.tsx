import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useToast } from '../../hooks/useToast';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Animation, Background, Body, Container } from './styles';

interface FormData {
  email: string;
}

export const ForgotPassword: React.FC = () => {
  const ref = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />

      <Body>
        <Animation>
          <img src={logo} alt="GoBarber" />

          <Form ref={ref} onSubmit={handleSubmit}>
            <h1>Recupere sua senha</h1>

            <Input
              name="email"
              placeholder="E-mail"
              type="text"
              icon={FiMail}
            />

            <Button type="submit">Enviar Email</Button>
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
