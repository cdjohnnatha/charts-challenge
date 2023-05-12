import React from 'react';
import styled from 'styled-components';

export type ColProps = {
  children?: React.ReactNode;
};

const Col = styled.div<ColProps>({
  flex: 1,
});

export default Col;
