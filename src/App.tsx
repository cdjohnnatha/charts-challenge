import React, { useMemo, useState } from 'react';
import { useMetricsApi } from './hooks/useMetricsApi';
import styled from 'styled-components';

import PieChart from './components/charts/PieChart';
import Card from './components/Card';
import Header from './components/Header';
import LineChart from './components/charts/LineChart';
import {
  transformMetricsToAvailabilityProps,
  transformDowntimeToChartProps,
  efficiencyAverageTransformProps,
  transformLoss,
  transformChartApiResponseToCharts,
} from './transforms';
import { Grid, Row, Col } from './components/grid-system';
import Dropdown from './components/dropdown/Dropdown';
import { palette, spacing } from './packages/theme';
import { TimeType } from './types';
import Divider from './components/Divider';
import ErrorMessage from './components/ErrorMessage';
import LoadingSkeleton from './components/loading-skeleton/LoadingSkeleton';

const GridLayout = styled.div({
  display: 'grid',
  height: '100vh',
  gridTemplateRows: '0.05fr',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: "'nav' 'main'",
  textAlign: 'center',
  marginBottom: spacing(6),
});

const NavBar = styled.nav({
  gridArea: 'nav',
  padding: '0.25rem',
  backgroundColor: palette.white,
  color: palette.black,
  boxShadow: '0 2px 2px 2px rgba(9, 9, 9, 0.23)',
});

const ToolsBar = styled.div({
  minHeight: '3rem',
  padding: spacing(2),
  display: 'flex',
});

const Main = styled.main({
  gridArea: 'main',
  padding: '0.25rem',
});

function App() {
  const { data, isLoading } = useMetricsApi();
  const [timeMetricsSelected, setTimeMetricsSelected] = useState<TimeType>('minutes');
  const onSelectTimeType = (timeType: string) => {
    setTimeMetricsSelected(timeType as TimeType);
  };
  const errorMessage = 'This chart is unavailable';
  const { availableCharts, metricsKeyMap } = useMemo(() => transformChartApiResponseToCharts(data || []), [data]);

  return (
    <GridLayout>
      <NavBar>
        <Header title="Welcome to reports" />
        <Divider />
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
            disabled={!data || data.length === 0}
          />
        </ToolsBar>
      </NavBar>
      <Main>
        <Grid>
          <Row>
            <Col>
              <Card title="Availability in last shift" id="chart-availability-last-shift">
                <>
                  {isLoading && <LoadingSkeleton circle width={'14rem'} height={'14rem'} />}
                  {!isLoading && (
                    <>
                      {data && availableCharts.availability && (
                        <PieChart
                          sufixType={timeMetricsSelected}
                          {...transformMetricsToAvailabilityProps(metricsKeyMap, timeMetricsSelected)}
                        />
                      )}
                      {!availableCharts.availability && <ErrorMessage message={errorMessage} />}
                    </>
                  )}
                </>
              </Card>
            </Col>
            <Col>
              <Card
                title="Downtime in last shift"
                description="The presented data is in minutes and seconds"
                id="chart-downtime"
              >
                <>
                  {isLoading && <LoadingSkeleton circle width={'14rem'} height={'14rem'} />}
                  {!isLoading && (
                    <>
                      {data && availableCharts.downtime && (
                        <PieChart
                          {...transformDowntimeToChartProps(metricsKeyMap, timeMetricsSelected)}
                          sufixType={timeMetricsSelected}
                        />
                      )}
                      {!availableCharts.downtime && <ErrorMessage message={errorMessage} />}
                    </>
                  )}
                </>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card title="Efficiency Average" description="The efficiency in a day" id="chart-efficiency-average">
                <>
                  {isLoading && <LoadingSkeleton circle width={'14rem'} height={'14rem'} />}
                  {!isLoading && (
                    <>
                      {data && availableCharts.efficiency && (
                        <PieChart
                          useUncomplete
                          sufixType="percentage"
                          {...efficiencyAverageTransformProps(metricsKeyMap)}
                        />
                      )}
                      {!availableCharts.efficiency && <ErrorMessage message={errorMessage} />}
                    </>
                  )}
                </>
              </Card>
            </Col>

            <Col>
              <Card title="Loss" id="chart-loss">
                <>
                  {isLoading && <LoadingSkeleton width={'35rem'} height={'14rem'} />}
                  {!isLoading && (
                    <>
                      {data && availableCharts.loss && (
                        <LineChart indexBy="label" ariaLabel="loss chart" {...transformLoss(metricsKeyMap)} />
                      )}
                      {!availableCharts.loss && <ErrorMessage message={errorMessage} />}
                    </>
                  )}
                </>
              </Card>
            </Col>
          </Row>
        </Grid>
      </Main>
    </GridLayout>
  );
}

export default App;
