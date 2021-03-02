import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { useToast } from '../../hooks/useToast';
import { ToastMessage } from '../../models/toast';
import { Container, Message } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

export const Toast: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  return (
    <Container>
      {messages.map(message => (
        <Message
          key={message.id}
          type={message.type}
          description={Boolean(message.description)}
        >
          {icons[message.type || 'info']}

          <div>
            <strong>{message.title}</strong>

            {message.description && <p>{message.description}</p>}
          </div>

          <button type="button" onClick={() => removeToast(message.id)}>
            <FiXCircle size={18} />
          </button>
        </Message>
      ))}
    </Container>
  );
};
