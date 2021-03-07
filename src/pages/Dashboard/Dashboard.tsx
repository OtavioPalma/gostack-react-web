import React from 'react';
import { FiPower } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Container, Header, HeaderContent, Profile } from './styles';

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>

              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower size={30} />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};
