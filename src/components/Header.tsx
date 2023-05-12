import React from 'react';
import styled from 'styled-components';

import { typography } from '../packages/theme';

type HeaderProps = {
  title: string;
};

const Label = styled.h1({
  ...typography.md.bold,
});

export default function Header({ title }: HeaderProps) {
  return (
    <div>
      <Label>{title}</Label>
    </div>
  );
}
