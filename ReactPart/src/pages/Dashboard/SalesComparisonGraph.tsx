import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

interface SalesComparisonGraphProps {
    today: any[]; // Define the type of your sales data array
    lastWeek: any[]; // Define the type of your sales data array
}

const SalesComparisonGraph: React.FC<SalesComparisonGraphProps> = ({ today, lastWeek }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (today && lastWeek && today.length > 0 && lastWeek.length > 0) {
            setDataLoaded(true);
        }
    }, [today, lastWeek]);

    useEffect(() => {
        if (dataLoaded && chartRef.current) {
            // Chart rendering logic
            const todaySales = today.map((item) => item.sales);
            const lastWeekSales = lastWeek.map((item) => item.sales);
            const paymentTypes = today.map((item) => item.payment_type);

            const chartData = {
                labels: paymentTypes,
                datasets: [
                    {
                        label: 'Today',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        data: todaySales,
                    },
                    {
                        label: 'Last Week',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        data: lastWeekSales,
                    },
                ],
            };

            const chartOptions = {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };

            const myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });

            return () => {
                myChart.destroy();
            };
        }
    }, [dataLoaded, today, lastWeek]);

    return (
        <div>
            {dataLoaded ? (
                <canvas ref={chartRef} style={{ width: '100%', height: '300px' }} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default SalesComparisonGraph;
