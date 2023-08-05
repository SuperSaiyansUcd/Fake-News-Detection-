import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Legend } from 'recharts';

const SimpleBarChart = ({data}) => (
    <BarChart
        width={600}
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
        <XAxis dataKey="name" stroke="white" />
        <YAxis domain={[-1, 1]} stroke="white" />
        <Legend wrapperStyle={{ color: 'white' }} />
        <Bar dataKey="Sentiment_Score" fill="#1946bf" minPointSize={10}>
          {
            data.map((entry, index) => <LabelList dataKey="index"  fill="white" />)
          }
        </Bar>
    </BarChart>
);


export default SimpleBarChart;
