import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Message } from './styles';

export const Toast: React.FC = () => {
  return (
    <Container>
      <Message type="info" description>
        <FiAlertCircle size={20} />

        <div>
          <strong>Erro!</strong>

          <p>Não foi possível fazer login</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Message>

      <Message type="success" description>
        <FiAlertCircle size={20} />

        <div>
          <strong>Erro!</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Message>

      <Message type="error" description={false}>
        <FiAlertCircle size={20} />

        <div>
          <strong>Erro!</strong>

          <p>Não foi possível fazer login</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Message>
    </Container>
  );
};
