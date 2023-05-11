import React from 'react';
// import { faker } from '@faker-js/faker';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import type { Category, ChartType } from '../types';

type Dataset = Array<{ label: string; data: Array<number> }>;

type ChartProps = {
  labels: Array<string>;
  type: 'chart' | 'bar';
  dataset: Dataset;
};

export default function Chart({ dataset, labels }: ChartProps) {
  return (
    <Bar
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }}
      data={{ labels, datasets: dataset }}
    />
  );
}
