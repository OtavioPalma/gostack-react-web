import { format, isAfter, isToday, isTomorrow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../models/auth';
import { Api } from '../../services/Api';
import {
  Appointment,
  Body,
  Calendar,
  Container,
  Header,
  HeaderBody,
  LoadingContainer,
  NextAppointment,
  Profile,
  Schedule,
  Section,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: User;
}

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentDate(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => !monthDay.available)
      .map(monthDay => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentDate, monthAvailability]);

  const currentDay = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const currentWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  useEffect(() => {
    setLoading(true);

    Api.get(`/providers/${user.id}/month-availability`, {
      params: {
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      },
    }).then(response => {
      setMonthAvailability(response.data);
      setLoading(false);
    });
  }, [currentDate, user]);

  useEffect(() => {
    setLoading(true);

    Api.get<Appointment[]>(`/appointments/provider`, {
      params: {
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      },
    }).then(response => {
      const formattedAppointments = response.data.map(appointment => ({
        ...appointment,
        formattedHour: format(parseISO(appointment.date), 'HH:mm'),
      }));

      setAppointments(formattedAppointments);
      setLoading(false);
    });
  }, [selectedDate, user]);

  return (
    <Container>
      <Header>
        <HeaderBody>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>

              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower size={30} />
          </button>
        </HeaderBody>
      </Header>

      {loading ? (
        <LoadingContainer>
          <BeatLoader color="#fff" loading={loading} size={30} />
        </LoadingContainer>
      ) : (
        <Body>
          <Schedule>
            <h1>Horários Agendados</h1>

            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              {isTomorrow(selectedDate) && <span>Amanhã</span>}
              <span>{currentDay}</span>
              <span>{currentWeekDay}</span>
            </p>

            {isToday(selectedDate) && nextAppointment && (
              <NextAppointment>
                <strong>Agendamento a seguir</strong>

                <div>
                  <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                  />

                  <strong>{nextAppointment.user.name}</strong>

                  <span>
                    <FiClock />
                    {nextAppointment.formattedHour}
                  </span>
                </div>
              </NextAppointment>
            )}

            <Section>
              <span>Manhã</span>

              {morningAppointments.length === 0 && (
                <p>Nenhum agendamento neste período</p>
              )}

              {morningAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.formattedHour}
                  </span>

                  <div>
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>

            <Section>
              <span>Tarde</span>

              {afternoonAppointments.length === 0 && (
                <p>Nenhum agendamento neste período</p>
              )}

              {afternoonAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.formattedHour}
                  </span>

                  <div>
                    <img
                      src={appointment.user.avatar_url}
                      alt={appointment.user.name}
                    />

                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
          </Schedule>

          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              onMonthChange={handleMonthChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Body>
      )}
    </Container>
  );
};
