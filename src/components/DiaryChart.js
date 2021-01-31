import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Mon',
    frequency: 3,
  },
  {
    name: 'Tue',
    frequency: 2,
  },
  {
    name: 'Wed',
    frequency: 1,
  },
  {
    name: 'Thur',
    frequency: 1,
  },
  {
    name: 'Fri',
    frequency: 2,
  },
  {
    name: 'Sat',
    frequency: 3,
  },
  {
    name: 'Sun',
    frequency: 4,
  },
];

export default class Example extends PureComponent {
  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" stroke="#bc9f6b" fill="#bc9f6bc2" />
      </BarChart>
    );
  }
}
