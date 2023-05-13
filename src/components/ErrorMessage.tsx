import React from 'react';
import styled from 'styled-components';
import { typography, palette } from '../packages/theme';

type ErrorMessageProps = {
  message: string;
};

const Label = styled.h2({
  ...typography.md.bold,
  color: palette.error,
});

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <Label>{message}</Label>;
}
