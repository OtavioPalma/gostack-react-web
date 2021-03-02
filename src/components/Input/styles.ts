import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  svg {
    color: ${shade(0.2, '#f4ede8')};
    margin-right: 16px;
  }
`;
