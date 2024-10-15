import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CourseDistributionChart = () => {
    const [fig, setFig] = useState(null);

    useEffect(() => {
        fetch(`http://${import.meta.env.VITE_MY_IP}:8000/course-enrollment_secondary/`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log the data
                setFig(data); // Set the figure data directly
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!fig) {
        return <div>Loading...</div>;
    }

    return (
        <Plot
            data={fig.data} // Use the Plotly data structure directly
            layout={{...fig.layout,
                width: 800, // Increase width
                height: 600,
            }} // Use the layout directly
            config={{ responsive: true }} // Make it responsive
        />
    );
};

export default CourseDistributionChart;

{
    /** @private
     * This chart serves as an analytical tool for administrators, 
     * enabling them to assess the variety and distribution of courses offered. 
     * 
     * By visualizing this data, the admin can make informed decisions about course development, 
     * marketing strategies, and resource allocation, ultimately enhancing the educational offerings.
     * */
}
