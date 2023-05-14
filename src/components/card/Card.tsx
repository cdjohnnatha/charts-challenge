import React from 'react';
import styled from 'styled-components';
import { breakpoints, palette, spacing, typography } from '../../packages/theme';
import Divider from '../Divider';

export type CardProps = {
  title: string;
  description?: string;
  children: React.ReactElement;
  id?: string;
};

const StyledCard = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
  padding: spacing(1),
  position: 'relative',
  margin: spacing(1, 1, 0, 1),
  color: palette.black,
});

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [breakpoints.md.mediaQuery]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Label = styled.h3({
  ...typography.sm.bold,
  margin: spacing(2),
  alignSelf: 'center',
  marginTop: 0,
  marginBottom: 0,

  [breakpoints.md.mediaQuery]: {
    alignSelf: 'flex-start',
  },
});

const Description = styled.p({
  ...typography.xxs.regular,
  margin: 0,
});

const CardContent = styled.div({
  position: 'relative',
  boxSizing: 'border-box',
  padding: spacing(1),
  height: '18rem',
  width: '20rem',

  [breakpoints.md.mediaQuery]: {
    width: '100%',
    height: '19rem',
  },
});

export default function Card({ title, description, children, id }: CardProps) {
  return (
    <StyledCard className="styled-card" {...(id && { id })}>
      <Header>
        <Label>{title}</Label>
        {description && <Description>{description}</Description>}
      </Header>
      <Divider />
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
}
