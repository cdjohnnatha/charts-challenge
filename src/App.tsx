import React from 'react';
import { useChartApi } from './hooks/useChartApi';

function App() {
  const { data } = useChartApi();
  // eslint-disable-next-line no-console
  console.log('data', data);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
