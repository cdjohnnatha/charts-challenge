import React, { useState } from 'react';
import { useMetricsApi } from './hooks/useMetricsApi';
import styled from 'styled-components';
import PieChart from './components/charts/PieChart';
import Card from './components/Card';
import Header from './components/Header';
import LineChart from './components/charts/LineChart';

import { transformAvailability, transformDowntime, transformEfficiency, transformLoss } from './transforms';
import { Grid, Row, Col } from './components/grid-system';
import Dropdown from './components/dropdown/Dropdown';
import { palette, spacing } from './packages/theme';
import { TimeType } from './types';

const GridLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.05fr 1fr 0.1fr;
  grid-template-columns: 0.15fr 1fr;
  grid-template-areas:
    'nav nav'
    'main main';
  text-align: center;
`;

const NavBar = styled.nav({
  gridArea: 'nav',
  padding: '0.25rem',
  backgroundColor: '#fff',
  color: palette.black,
  boxShadow: '0 2px 2px 2px rgba(9, 9, 9, 0.23)',
});

const ToolsBar = styled.div({
  minHeight: '3rem',
  padding: spacing(2),
  display: 'flex',
});

const Line = styled.hr({
  flex: '1',
  borderBottom: `1px ${palette.lightGrey}`,
});

const Main = styled.main`
  grid-area: main;
  padding: 0.25rem;
  display: block;
`;

// const SideBar = styled.div`
//   background: #9aaab7;
//   grid-area: sidebar;
//   padding: 0.25rem;
// `;

// const Footer = styled.footer`
//   background: #ff9637;
//   grid-area: footer;
//   padding: 0.25rem;
// `;

function App() {
  const { data, isLoading } = useMetricsApi();
  const [timeMetricsSelected, setTimeMetricsSelected] = useState<TimeType>('minutes');
  // eslint-disable-next-line no-console
  console.log('isLoading,', isLoading, data);
  // const oee = data?.find(({ id }) => id === 'oee');
  // const shiftDuration = data?.find(({ id }) => id === 'shift_duration');
  const onSelectTimeType = (timeType: string) => {
    setTimeMetricsSelected(timeType as TimeType);
  };

  return (
    <GridLayout>
      <NavBar>
        <Header title="Reports" description="Welcome to reports page" />
        <Line />
        <ToolsBar>
          <Dropdown
            name="metricsType"
            label="Choose metrics time"
            dataset={[
              { value: 'hours', label: 'By hour' },
              { value: 'minutes', label: 'By min' },
              { value: 'secs', label: 'By secs' },
            ]}
            selected={timeMetricsSelected}
            onSelect={onSelectTimeType}
          />
        </ToolsBar>
      </NavBar>
      <Main>
        {!isLoading && data && (
          <Grid>
            <Row>
              <Col>
                <Card title="Efficiency Average" description="The efficiency in a day">
                  <div style={{ height: '350px', width: '470px' }}>
                    <PieChart data={transformEfficiency(data)} formatPercentage useUncomplete />
                  </div>
                </Card>
              </Col>
              <Col>
                <Card title="Downtime" description="The presented data is in minutes and seconds">
                  <div style={{ height: '350px', width: '470px' }}>
                    <PieChart data={transformDowntime(data, timeMetricsSelected)} />
                  </div>
                </Card>
              </Col>
              <Col>
                <Card title="Availability in last shift">
                  <div style={{ height: '350px', width: '470px' }}>
                    <PieChart data={transformAvailability(data, timeMetricsSelected)} />
                  </div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card title="Loss">
                  <div style={{ height: '350px', width: '470px' }}>
                    <LineChart data={transformLoss(data)} indexBy="label" />
                  </div>
                </Card>
              </Col>
            </Row>
          </Grid>
        )}
      </Main>
    </GridLayout>
  );
}

export default App;
