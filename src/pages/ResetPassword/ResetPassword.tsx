import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useToast } from '../../hooks/useToast';
import { Api } from '../../services/Api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Animation, Background, Body, Container } from './styles';

interface FormData {
  password: string;
  password_confirmation: string;
}

interface Params {
  token: string;
}

export const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { token } = useParams<Params>();

  const ref = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);

        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha deve ser igual a nova senha',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;

        await Api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          title: 'Email enviado com sucesso',
          description:
            'Enviamos um email para recuperar a sua senha, cheque sua caixa de entrada',
          type: 'success',
        });

        setLoading(false);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na redefinição de senha',
          description:
            'Ocorreu um erro ao tentar redefinir a senha, tente novamente',
          type: 'error',
        });

        setLoading(false);
      }
    },
    [addToast, history, token],
  );

  return (
    <Container>
      <Background />

      <Body>
        <Animation>
          <img src={logo} alt="GoBarber" />

          <Form ref={ref} onSubmit={handleSubmit}>
            <h1>Redefina sua senha</h1>

            <Input
              name="password"
              placeholder="Nova senha"
              type="password"
              icon={FiLock}
            />

            <Input
              name="password_confirmation"
              placeholder="Confirmação de senha"
              type="password"
              icon={FiLock}
            />

            <Button loading={loading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </Animation>
      </Body>
    </Container>
  );
};
