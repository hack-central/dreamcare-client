import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Mon',
    score: 0.8,
  },
  {
    name: 'Tue',
    score: 1.1,
  },
  {
    name: 'Wed',
    score: 0.4,
  },
  {
    name: 'Thurs',
    score: 0.6,
  },
  {
    name: 'Fri',
    score: 0.7,
  },
  {
    name: 'Sat',
    score: 1.3,
  },
  {
    name: 'Sun',
    score: 1.4,
  },
];

export default class HappinessChart extends PureComponent {
  render() {
    return (
      <AreaChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 50,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="score" stroke="#13113c" fill="#00c2fb" />
      </AreaChart>
    );
  }
}
