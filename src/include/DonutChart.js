import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ numCourses, numStudents }) => {
    if (numCourses == 0 && numStudents == 0) {
        numCourses =1
        numStudents =1
    }
    const data = {
        labels: ["Courses", "Students"],
        datasets: [
            {
                data: [numCourses, numStudents], // Dynamic data for number of courses and students
                backgroundColor: ["#3722D3", "#04fc84"], // Colors for the chart segments
                hoverBackgroundColor: ["#0056b3", "#04fc99"], // Colors on hover
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="doughnut-chart-wrapper">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
