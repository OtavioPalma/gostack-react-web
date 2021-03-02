import { useField } from '@unform/core';
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconType } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: IconType;
}

export const Input: React.FC<InputProps> = ({ icon: Icon, name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleOnFocus = useCallback((): void => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback((): void => {
    setIsFocused(false);
    setIsFilled(Boolean(ref.current?.value));
  }, []);

  const handleFocus = useCallback(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    registerField({ name: fieldName, ref: ref.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused} onClick={handleFocus}>
      {Icon && <Icon size={20} />}
      <input
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        defaultValue={defaultValue}
        ref={ref}
        {...rest}
      />
    </Container>
  );
};
