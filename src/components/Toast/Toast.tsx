import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { useTransition } from 'react-spring';
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

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Message
          key={key}
          type={item.type}
          description={item.description}
          style={props}
        >
          {icons[item.type || 'info']}

          <div>
            <strong>{item.title}</strong>

            {item.description && <p>{item.description}</p>}
          </div>

          <button type="button" onClick={() => removeToast(item.id)}>
            <FiXCircle size={18} />
          </button>
        </Message>
      ))}
    </Container>
  );
};
