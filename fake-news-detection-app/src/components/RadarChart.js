import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const RadarCharts = ({ Precision,Recall,Score,Accuracy}) => {

    const data = [
        { name: 'Precision', x: Precision },
        { name: 'Recall', x: Recall },
        { name: 'F1Score', x: Score },
        { name: 'Accuracy', x: Accuracy },
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
