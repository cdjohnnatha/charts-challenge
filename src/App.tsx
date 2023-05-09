import React from 'react';
import { useChartApi } from './hooks/useChartApi';
import styled from 'styled-components';
import SampleChartBar from './components/SampleChartBar';

const Container = styled.div({
  maxWidth: '1920px',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
  margin: '0 auto',
  contain: 'layout paint',
});

function App() {
  const { data } = useChartApi();
  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <Container>
      <h1>Welcome</h1>
      <SampleChartBar />
    </Container>
  );
}

export default App;
