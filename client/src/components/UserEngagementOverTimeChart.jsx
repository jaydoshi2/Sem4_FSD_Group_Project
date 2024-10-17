import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const UserEngagementOverTimeChart = () => {
    const [figure, setFigure] = useState(null);

    useEffect(() => {
        fetch(`http://${import.meta.env.VITE_MY_IP}:8000/user_engagement_over_time`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched figure:', data); // Log the entire figure structure
                // Prepare the figure data for Plotly
                const plotData = [{
                    x: data.months, // Array of month labels
                    y: data.user_counts, // Array of user counts
                    type: 'scatter', // Change to 'bar' if needed
                    mode: 'lines+markers', // Line with markers
                    marker: { color: 'rgba(75, 192, 192, 1)' },
                    line: { width: 2 },
                }];

                const layout = {
                    title: 'User Engagement Over Time',
                    xaxis: { title: 'Months' },
                    yaxis: { title: 'Number of Users Signed Up' },
                };

                setFigure({ data: plotData, layout });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!figure) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <Plot
            data={figure.data} // Should match the structure from the API
            layout={figure.layout} // Should match the layout structure
            config={{ displayModeBar: true }}
            style={{ width: "100%", height: "550px" }}
        />
    );
};

export default UserEngagementOverTimeChart;

{   /** @private
     * This graph provides a clear visual of how user engagement (measured by sign-ups) evolves over time, 
     * allowing the admin to track growth, assess the impact of initiatives, and predict future trends.
     * */
}
