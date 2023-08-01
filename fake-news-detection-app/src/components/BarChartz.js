import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Afinn', score: 0.2 },
    { name: 'Pattern', score: -0.1 },
    { name: 'Vader', score: 0.5 },
    { name: 'TextBlob', score: -0.7 },
    { name: 'Majority Voting', score: 0.3 },
];

const SimpleBarChart = ({ data }) => (
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
        <XAxis dataKey="name" />
        <YAxis domain={[-1, 1]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
    </BarChart>
);

export default SimpleBarChart;
