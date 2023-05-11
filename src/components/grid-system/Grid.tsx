import React from 'react';
import styled from 'styled-components';
import Row from './Row';

interface GridProps {
  children: React.ReactElement<typeof Row> | Array<React.ReactElement<typeof Row>>;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 1em;
  justify-content: center;
  justify-items: start;
`;

export default Grid;
