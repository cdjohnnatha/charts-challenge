import React from 'react';
import { MetricsResponse, useMetricsApi } from './hooks/useMetricsApi';
import styled from 'styled-components';
import PieChart, { PieChartData } from './components/charts/PieChart';
import Card from './components/Card';
import Header from './components/Header';
import { MetricsType } from './types';

const secondsToMinutes = (value: number): number => value / 60;
const hourToMinutes = (value: number): number => value * 60;

const toMinutes = (type: MetricsType, value: number): number => {
  if (type === 'hours') {
    return hourToMinutes(value);
  }

  if (type === 'secs') {
    return secondsToMinutes(value);
  }

  return value;
};

const transformDowntime = (data: Array<MetricsResponse>): Array<PieChartData> => {
  const dataset: Array<{ label: string; data: Array<number> }> = [];

  const downtime = data.filter(({ id }) => ['cln_shift', 'unexplained', 'mech_problems'].includes(id));

  const downtimePieChart = downtime.map(({ id, label, value }) => ({
    id,
    label,
    value: Number.parseFloat(secondsToMinutes(value).toFixed(2)),
  }));
  // eslint-disable-next-line no-console
  console.log('dataset,', dataset);

  return downtimePieChart;
};

const transformEfficiency = (data: Array<MetricsResponse>): Array<PieChartData> => {
  const efficiency = data.filter(({ id }) => ['oee'].includes(id));

  const downtimePieChart = efficiency.map(({ id, label, value }) => ({
    id,
    label,
    value: value * 100,
  }));

  return downtimePieChart;
};

const transformAvailability = (data: Array<MetricsResponse>): Array<PieChartData> => {
  const efficiency = data.filter(({ id }) =>
    ['cln_shift', 'unexplained', 'mech_problems', 'shift_duration'].includes(id),
  );

  let availableTime = { label: '', value: 0 };
  let downtime = 0;

  efficiency.forEach(({ id, label, value, type }) => {
    if (id === 'shift_duration') {
      availableTime = { label, value: toMinutes(type, value) };
      return;
    }

    downtime += toMinutes(type, value);
  });

  // eslint-disable-next-line no-console
  console.log('downtime,', downtime, availableTime.value);

  return [
    {
      id: 'downtime',
      value: downtime,
      label: 'Downtime',
    },
    {
      id: 'available_time',
      value: availableTime.value - downtime,
      label: 'Available time in shift',
    },
  ];
};

const GridLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.05fr 1fr 0.1fr;
  grid-template-columns: 0.15fr 1fr;
  grid-template-areas:
    'sidebar nav'
    'sidebar main'
    'sidebar main';
  text-align: center;
`;

const NavBar = styled.nav`
  grid-area: nav;
  padding: 0.25rem;
`;

const Main = styled.main`
  grid-area: main;
  padding: 0.25rem;
  display: flex;
`;

const SideBar = styled.div`
  background: #9aaab7;
  grid-area: sidebar;
  padding: 0.25rem;
`;

// const Footer = styled.footer`
//   background: #ff9637;
//   grid-area: footer;
//   padding: 0.25rem;
// `;

const Row = styled.div({
  display: 'flex',
  flexShrink: 0,
  flexWrap: 'wrap',
});

const Col = styled.div({
  flexShrink: 0,
});

function App() {
  const { data, isLoading } = useMetricsApi();
  // eslint-disable-next-line no-console
  console.log('isLoading,', isLoading, data);
  // const oee = data?.find(({ id }) => id === 'oee');
  // const shiftDuration = data?.find(({ id }) => id === 'shift_duration');

  return (
    <GridLayout>
      <NavBar>
        <Header title="Reports" description="Welcome to resports page" />
      </NavBar>
      <Main>
        <Row>
          <Col>
            {!isLoading && data && (
              <Card title="Efficiency Average" description="The efficiency in a day">
                <div style={{ height: '250px', width: '370px' }}>
                  <PieChart data={transformEfficiency(data)} formatPercentage useUncomplete />
                </div>
              </Card>
            )}
          </Col>
          <Col>
            {!isLoading && data && (
              <Card title="Downtime" description="The presented data is in minutes and seconds">
                <div style={{ height: '250px', width: '370px' }}>
                  <PieChart data={transformDowntime(data)} />
                </div>
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {!isLoading && data && (
              <Card title="Availability in last shift">
                <div style={{ height: '250px', width: '370px' }}>
                  <PieChart data={transformAvailability(data)} />
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </Main>
      <SideBar>
        <Row>
          <Col>
            <h2>Claudio Lourenço</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="/">Dashboard</a>
          </Col>
        </Row>
      </SideBar>
    </GridLayout>
  );
}

export default App;
