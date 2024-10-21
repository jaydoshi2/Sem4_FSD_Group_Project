
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';


const EnrollmentDistributionChart = () => {
    const [chartData, setChartData] = useState({ labels: [], values: [] });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${import.meta.env.VITE_MY_IP}:8000/enrollment_distribution_data/`);
            const data = await response.json();
            setChartData({
                labels: data.labels,
                values: data.values,
            });
        };

        fetchData();
    }, []);

    const data = [
        {
            labels: chartData.labels,
            values: chartData.values,
            type: 'pie',
        },
    ];

    const layout = {
        title: 'Enrollment Distribution by Course',
        width: 800,
        height: 550,
    };

    return (
        <div>
            {/* <h2>Enrollment Distribution by Course</h2> */}
            <Plot data={data} layout={layout} />
        </div>
    );
};

export default EnrollmentDistributionChart;

{ /**
    * This pie chart effectively communicates the distribution of student enrollments among various courses, 
    * enabling the admin to make informed decisions about course offerings and resource allocation based on student interests.
    */
}