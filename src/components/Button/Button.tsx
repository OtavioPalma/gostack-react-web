import React, { ButtonHTMLAttributes } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Container type="button" {...rest}>
      {loading ? (
        <BeatLoader color="#312e38" loading={loading} size={10} />
      ) : (
        children
      )}
    </Container>
  );
};
