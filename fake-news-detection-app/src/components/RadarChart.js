import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RadarCharts = ({ data }) => {
    return (
        <RadarChart height={300} width={400} outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fill: 'Black', fontWeight: 'bold' }} />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke="green" fill="blue" fillOpacity={0.5} />
        </RadarChart>
    );
}
    
export default RadarCharts;
