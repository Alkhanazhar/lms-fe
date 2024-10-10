import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ numCourses, numStudents, numTeachers }) => {
    const data = {
        labels: ["Courses", "Students", "Teachers"   ], // X-axis labels
        datasets: [
            {
                data: [numCourses, numStudents, numTeachers], // Data for the bar chart
                backgroundColor: ["#4936d6", "#1bfb8f", "#ffc107"], // Bar colors
                borderColor: ["#fff", "#fff", "#fff"], // Border colors
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, // Ensure the y-axis starts at zero
            },
        },
        plugins: {
            legend: {
                display: false, // Remove the legend bar
            },
        },
    };

    return (
        <div className="chart-container" style={{ width: "319px", height: "213px", margin: "auto" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
