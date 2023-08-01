import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomBar = (props) => {
    const { fill, x, y, width, value } = props;

    const minHeight = 10;

    const height = value === 0 ? minHeight : Math.abs(y);

    return <rect x={x} y={y} width={width} height={height} fill={fill} />;
};


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
        <XAxis dataKey="name" stroke="black" />
        <YAxis domain={[-1, 1]} stroke="black" />
        <Tooltip />
        <Legend wrapperStyle={{ color: 'black' }} />
        <Bar dataKey="Sentiment_Score" fill="#1946bf" minPointSize={10}>
          {
            data.map((entry, index) => <CustomBar key={`bar-${index}`} />)
          }
        </Bar>
    </BarChart>
);


export default SimpleBarChart;
