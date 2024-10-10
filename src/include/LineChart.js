import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#4936d6",
            backgroundColor: "#fdc61e",
            fill: true, // Makes the area below the line filled
        },
    ],
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
            },
        },
    },
};



const LineChart = () => {
    return (
        <div className="line-chart-wrapper ">
            <Line data={lineData} options={lineOptions} />
        </div>
    );
};

export default LineChart;