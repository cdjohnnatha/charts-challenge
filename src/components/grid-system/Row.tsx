import React from 'react';
import styled from 'styled-components';
import Col from './Col';

export interface RowProps {
  children: React.ReactElement<typeof Col> | Array<React.ReactElement<typeof Col>>;
}

const Row = styled.div<RowProps>({
  display: 'flex',
  flexShrink: 0,
  flexWrap: 'wrap',
});

export default Row;
