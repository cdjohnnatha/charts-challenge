import React from 'react';
import styled from 'styled-components';
import Row from './Row';

interface GridProps {
  children: React.ReactElement<typeof Row> | Array<React.ReactElement<typeof Row>>;
}

const Grid = styled.div<GridProps>({
  display: 'grid',
  rowGap: '1em',
  width: '100%',
  gridTemplateRows: '0.05fr',
  gridTemplateColumns: '1fr',
});

export default Grid;
