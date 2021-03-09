import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { User } from '../../models/auth';
import { Api } from '../../services/Api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Avatar, Body, Container, Header } from './styles';

interface FormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Profile: React.FC = () => {
  const ref = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleAvatarChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target && event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        const updatedUser = await Api.patch<User>('/users/avatar', data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });

        updateUser(updatedUser.data);
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (password: string) => password.length > 0,
            then: Yup.string().min(6, 'Nova senha deve ter ao menos 6 dígitos'),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (password: string) => password.length > 0,
              then: Yup.string().min(
                6,
                'Confirmação de senha deve ter ao menos 6 dígitos',
              ),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha deve ser igual a nova senha',
            ),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password && {
            old_password,
            password,
            password_confirmation,
          }),
        };

        const updatedUser = await Api.put<User>('/profile', formData);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Informaçoes do perfil atualizadas com sucesso!',
        });

        updateUser(updatedUser.data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro ao atualizar perfil',
          description:
            'Ocorreu um erro ao atualizar seu perfil, tente novamente',
          type: 'error',
        });
      }
    },
    [addToast, history, updateUser],
  );

  return (
    <Container>
      <Header>
        <div>
          <Link to="dashboard">
            <FiArrowLeft size={30} />
          </Link>
        </div>
      </Header>

      <Body>
        <Form
          ref={ref}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <Avatar>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera size={22} />

              <input
                type="file"
                id="avatar"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </Avatar>

          <h1>Meu Perfil</h1>

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
            name="old_password"
            placeholder="Senha atual"
            type="password"
            icon={FiLock}
          />

          <Input
            autoComplete="new-password"
            name="password"
            placeholder="Nova senha"
            type="password"
            icon={FiLock}
          />

          <Input
            autoComplete="new-password"
            name="password_confirmation"
            placeholder="Confirmar nova senha"
            type="password"
            icon={FiLock}
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Body>
    </Container>
  );
};
