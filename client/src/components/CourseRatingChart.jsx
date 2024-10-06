import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CourseRatingsChart = () => {
    const [figure, setFigure] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/course-ratings')
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
            data={[
                {
                    ...figure.data[0],
                    marker: {
                        color: 'rgba(243, 156, 18, 0.7)', // Light orange for the bars
                        line: {
                            color: 'rgba(211, 84, 0, 1)', // Dark orange for borders
                            width: 2
                        }
                    }
                }
            ]}
            layout={{
                ...figure.layout,
                width: 1300,
                height: 550,
                title: 'Course Ratings',
                plot_bgcolor: '#f9f9f9', // Very light grey background for the plot
                paper_bgcolor: '#ffffff', // White background for the chart area
                font: {
                    color: '#333', // Dark grey text for readability
                }
            }}
            config={figure.config} // Add any additional configuration if needed
        />
    );
};

export default CourseRatingsChart;

{ 
    /** @private
     * This chart visually represents how different courses are rated by users,
     * providing quick insights into course quality and user satisfaction.
     *
     * */
  }