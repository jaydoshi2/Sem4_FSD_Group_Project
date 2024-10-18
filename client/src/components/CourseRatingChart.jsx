import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CourseRatingsChart = () => {
    const [figure, setFigure] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${import.meta.env.VITE_MY_IP}:8000/course-ratings`);
                const data = await response.json();
                console.log(data); // Log the fetched data
                setFigure(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateSize = () => {
            const container = document.getElementById('chart-container');
            if (container) {
                setContainerSize({
                    width: container.clientWidth,
                    height: Math.max(300, window.innerHeight * 0.6)
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    if (!figure) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="z-10 container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
                    Course Ratings
                </h2>
                <div id="chart-container" className="w-full">
                    <Plot
                        data={[
                            {
                                ...figure.data[0],
                                marker: {
                                    color: 'rgba(243, 156, 18, 0.7)',
                                    line: {
                                        color: 'rgba(211, 84, 0, 1)',
                                        width: 2
                                    }
                                }
                            }
                        ]}
                        layout={{
                            ...figure.layout,
                            width: containerSize.width,
                            height: containerSize.height,
                            title: '',
                            plot_bgcolor: '#f9f9f9',
                            paper_bgcolor: '#ffffff',
                            font: {
                                color: '#333',
                            },
                            autosize: true,
                            margin: { l: 50, r: 50, t: 30, b: 80 },
                            xaxis: {
                                ...figure.layout.xaxis,
                                automargin: true,
                            },
                            yaxis: {
                                ...figure.layout.yaxis,
                                automargin: true,
                            },
                        }}
                        config={{
                            ...figure.config,
                            responsive: true,
                            displayModeBar: false,
                        }}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseRatingsChart;