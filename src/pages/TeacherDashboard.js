import React, { useEffect, useState } from 'react'
import DonutChart from '../include/DonutChart';
import { getFormattedDate } from '../config/getTimeAndDate';
import { Calendar, ListIcon } from 'lucide-react';
import LineChart from '../include/LineChart';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import BarChart from '../include/BarChart';
const TeacherDashboard = () => {

    const today = getFormattedDate();

    const [numberOfCourses, setNumberOfCourses] = useState(0);
    const [numberOfStudents, setNumberOfStudents] = useState(0);
    const [greetings, setGreetings] = useState('');
    const [students, setStudents] = useState([]);
    const [numberOfInternalStudents, setNumberOfInternalStudents] = useState(0);
    const [numberOfExternalStudents, setNumberOfExternalStudents] = useState(0);


    // const fetchAdminStudents = async () => {
    //     try {
    //         const response = await axios.get('/admin/student/' + localStorage.getItem("adminId"));
    //         setStudents(response?.data);
    //         console.log(response.data)
    //         setLoading(false);
    //     } catch (err) {
    //         setError(err?.response?.data?.message);
    //         setLoading(false);
    //         toast.error(err?.response?.data?.message || "No Students Exist");
    //     }
    // };


    const fetchStudents = async () => {
        try {
            const response = await axios.get('admin/student/' + localStorage.getItem('adminId'));
            console.log(response.data, 'students');
            const allStudents = response.data;
            setStudents(allStudents);
            setNumberOfStudents(allStudents.length);

            // Filter and count internal and external students
            const internalStudents = allStudents.filter(student => student.type === "INTERNAL");
            const externalStudents = allStudents.filter(student => student.type === 'EXTERNAL');
            setNumberOfInternalStudents(internalStudents.length);
            setNumberOfExternalStudents(externalStudents.length);
        } catch (error) {
            console.log(error);
        }
    };


    const fetchCourses = async () => {
        try {
            const response = await axios.get("/courses/list");
            setNumberOfCourses(response.data.length);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const dashboardData = [
        { title: 'Total Courses', value: numberOfCourses, icon: <ListIcon className="dashboard-icon text-blue" />, link: '/teacher/courses' },
        { title: 'Total Internal Students', value: numberOfInternalStudents, icon: <img src="icons/schoolIcon.svg" className="dashboard-icon" alt="school" />, link: '/teacher/students' },
        { title: 'Total External Students', value: numberOfExternalStudents, icon: <img src="icons/studentIcon.svg" className="dashboard-icon" alt="student" />, link: '/teacher/students' },
    ];

    const getGreeting = () => {
        const currentTime = new Date().getHours();
        console.log(currentTime)
        if (currentTime >= 3 && currentTime < 12) {
            setGreetings('Good Morning');
        } else if (currentTime >= 12 && currentTime < 18) {
            setGreetings('Good Afternoon');
        } else {
            setGreetings('Good Evening');
        }
    };
 
 
    useEffect(() => {
        fetchStudents();
        fetchCourses();
        getGreeting()
    }, []);



    const userData = jwtDecode(localStorage.getItem("token"))
    return (

        <div className="container">
            <div className="row">
                {/* First Div: 8 Columns with Cards */}
                <div className="col-12 col-lg-12">
                    <div className="d-flex w-100 align-items-center justify-content-between mb-3">
                        <div className="fs-3 d-none d-lg-block">Dashboard</div>
                        <div className="fs-2 cursive--font">{greetings}</div>
                        <button className="bg-white text-black rounded-5 px-10 py-1 px-md-15 py-md-1 btn d-flex align-items-center me-lg-2 fw-normal dashboard-card d-none d-md-inline">
                            <Calendar className="me-2 me-md-3 small-icon" />
                            <span style={{ fontSize: '.8rem' }}>{today}</span>
                            <span className="d-inline d-md-none">Date</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row ">
                {/* parent */}
                <div className="col-lg-6 col-12 ">
                    {/* child */}
                    <div className="row">
                        {dashboardData.map((card, index) => (
                            <div key={index} className="col-12 col-sm-6 mb-4">
                                <Link to={card.link} className='text-decoration-none'>
                                    <div className="dashboard-card p-4 py-5 flex-column justify-content-center text-center">
                                        <div className="fs-4 fw-semibold text-black">{card.title}</div>
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            {card.icon}
                                            <span className="fs-4 text-blue fw-bolder">{card.value}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-6 col-12 mb-4">
                    {/* child */}
                    <div className="dashboard-card p-4 d-flex align-items-center flex-column bar-chart">
                        <div className="fs-4 fw-semibold mx-auto fw-bolder">Bar Graph</div>
                        <BarChart numCourses={numberOfCourses} numStudents={numberOfStudents}  />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='col-lg-6 col-12 '>
                    <div className='dashboard-card p-4 d-flex align-items-center justify-content-center flex-column mb-4'>
                        <div className="fs-4 fw-semibold mx-auto fw-bolder">All over Course Sales</div>
                        <LineChart />
                    </div>
                </div>

                <div className='col-lg-6 col-12'>
                    <div className="dashboard-card p-4 d-flex align-items-center flex-column mb-4">
                        <div className="fs-4 fw-semibold mx-auto fw-bolder">Summary Charts</div>
                        <DonutChart numCourses={numberOfCourses} numStudents={numberOfStudents} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TeacherDashboard

