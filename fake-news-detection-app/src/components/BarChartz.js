import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SimpleBarChart = ({data}) => (
    <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="black" />
        <YAxis domain={[-1, 1]} stroke="black" />
        <Tooltip />
        <Legend wrapperStyle={{ color: 'black' }} />
        <Bar dataKey="score" fill="#1946bf" />
    </BarChart>
);

export default SimpleBarChart;
