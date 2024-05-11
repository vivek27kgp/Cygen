import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface DataEntry {
    payment_date: string | number;
    hour: number;
    sales: number;
}
interface Props {
    todayData: DataEntry[];
    lastWeekData: DataEntry[];
}
const SalesGraph: React.FC<Props> = ({ todayData, lastWeekData }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={todayData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="green" name="Today Sales" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesGraph;
