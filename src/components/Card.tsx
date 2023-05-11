import React from 'react';
import styled from 'styled-components';
import { spacing } from '../packages/theme';

export type CardProps = {
  title: string;
  description?: string;
  children: React.ReactElement;
};

const StyledCard = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '18px',
  background: 'white',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.9)',
  textAlign: 'center',
  padding: '1rem',
  position: 'relative',
  margin: spacing(1),
  color: 'black',
});

const CardLabel = styled.h3({
  margin: spacing(2),
});

const CardFooter = styled.div({
  margin: spacing(0, 2),
  marginTop: spacing(-8),
});

const CardContent = styled.div({
  position: 'relative',
  boxSizing: 'border-box',
});

export default function Card({ title, description, children }: CardProps) {
  return (
    <StyledCard className="styled-card">
      <CardLabel>{title}</CardLabel>
      <CardContent>{children}</CardContent>
      {description && (
        <CardFooter>
          <p>{description}</p>
        </CardFooter>
      )}
    </StyledCard>
  );
}
