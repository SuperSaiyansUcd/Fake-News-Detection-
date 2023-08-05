import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

const RadarCharts = ({ data }) => {
    return (
        <RadarChart height={300} width={450} outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fill: 'white', fontWeight: 'bold' }} />
            <Radar dataKey="value" stroke="green" fill="blue" fillOpacity={0.5} />
        </RadarChart>
    );
}
    
export default RadarCharts;
