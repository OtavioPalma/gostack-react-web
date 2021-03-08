import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import {
  Appointment,
  Body,
  Calendar,
  Container,
  Header,
  HeaderBody,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles';

export const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderBody>
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
        </HeaderBody>
      </Header>

      <Body>
        <Schedule>
          <h1>Horários Agendados</h1>

          <p>
            <span>Hoje</span>
            <span>dia 06</span>
            <span>segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img src={user.avatar_url} alt={user.name} />

              <strong>{user.name}</strong>

              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <span>Manhã</span>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <span>Tarde</span>

            <Appointment>
              <span>
                <FiClock />
                13:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar />
      </Body>
    </Container>
  );
};
