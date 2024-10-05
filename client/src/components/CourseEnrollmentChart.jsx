import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CourseEnrollmentChart = () => {
    const [figure, setFigure] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/course-enrollment/')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the fetched data
                setFigure(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    if (!figure) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <Plot
            data={figure.data}
            layout={{
                ...figure.layout,
                width: 1000, // Increase width
                height: 550, // Increase height
            }}
            config={figure.config} // Add any additional configuration if needed
        />
    );
};

export default CourseEnrollmentChart;

{
    /** @private
     * This chart serves as a critical tool for administrators to monitor student engagement and make informed decisions about course offerings, 
     * marketing strategies, or resource allocation. 
     * 
     * By presenting clear, visual data on enrollment trends, 
     * the admin can identify popular courses and those that may need attention or improvement.
     * */
}