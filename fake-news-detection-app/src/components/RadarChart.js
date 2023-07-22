import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RadarCharts = () => {

    const data = [
        { name: 'Precision', x: 21 },
        { name: 'Recall', x: 22 },
        { name: 'F1-Score', x: 32 },
        { name: 'Accuracy', x: 14 },
    ];
    
    return (
        <RadarChart height={300} width={400} outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fill: 'Black', fontWeight: 'bold' }} />
            <PolarRadiusAxis />
            <Radar dataKey="x" stroke="green" fill="blue" fillOpacity={0.5} />
        </RadarChart>
    );
}
    
export default RadarCharts;
