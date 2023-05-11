import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// type Dataset = Array<{ label: string; data: Array<number> }>;

// type ChartProps = {
//   labels: Array<string>;
//   type: 'chart' | 'bar';
//   dataset: Dataset;
// };

const settings = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Overall production',
    },
  },
};

export default function DowntimeChart() {
  // const time = 8;
  // const initialDataPerHour = 68 / time;
  // let incrementalPerHour = 0;

  // const metricPerHour = Array(time)
  //   .fill(initialDataPerHour)
  //   .map((percentage) => (incrementalPerHour += percentage));
  // const missing = 1 - 0.68;
  const secondsToMinutes = (value: number) => value / 60;
  const clnShift = secondsToMinutes(2280);
  const unexplained = secondsToMinutes(180);
  const mechProblems = secondsToMinutes(1210);
  const shift = 8 * 60;

  const workingTimeInMinutes = shift - (clnShift + unexplained + mechProblems);

  return (
    <Pie
      options={settings}
      data={{
        labels: ['Downtime cleaning in shift', 'Unexplained downtime', 'Mechanical problems', 'working time'],
        datasets: [
          {
            label: 'Percentage per minute',
            data: [clnShift, unexplained, mechProblems, workingTimeInMinutes],
            borderColor: ['blue', 'grey', 'red', 'yellow'],
            backgroundColor: ['blue', 'grey', 'red', 'yellow'],
          },
        ],
      }}
    />
  );
}
