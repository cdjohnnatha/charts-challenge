import React from 'react';
import styled from 'styled-components';

export type ColProps = {
  children?: React.ReactNode;
};

const Col = styled.div<ColProps>({
  flexShrink: 0,
});

export default Col;
