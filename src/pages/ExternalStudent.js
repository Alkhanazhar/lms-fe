import React, { useEffect, useState } from 'react';
import { getFormattedDate } from '../config/getTimeAndDate';
import { Bookmark, Calendar, FilterIcon } from 'lucide-react';
import axios from 'axios';

const ExternalStudent = () => {
    const today = getFormattedDate();
    const [courses, setCourses] = useState([]);
    const [selectCourses, setSelectCourse] = useState("All Courses");

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/courses/admin/" + localStorage.getItem("adminId"));
            setCourses(response?.data);
            console.log(response?.data);
            // toast.success("Courses fetched successfully");
        } catch (error) {
            console.log(error);
            // toast.error("Error fetching courses");
        }
    };

    const handleCourses = (courseName) => {
        setSelectCourse(courseName);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="container vh-100">
            <div className="row">
                {/* First Div: 8 Columns with Cards */}
                <div className="col-12 col-lg-12 ">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                        {/* <div className="fs-3 fw-semibold">Student Dashboard</div>`` ```` */}

                        <div className="d-flex align-items-center justify-content-center gap-5">
                            {/* All Courses Button */}
                            <div
                                className={`cursor-pointer fs-5 ${selectCourses === "All Courses" ? "switch-border switch-btn-color" : "switch-border-unActive"}`}
                                onClick={() => handleCourses("All Courses")}
                            >
                                All Courses
                            </div>
                            {/* My Courses Button */}
                            <div
                                className={`cursor-pointer fs-5 ${selectCourses === "My Courses" ? "switch-border switch-btn-color" : "switch-border-unActive"}`}
                                onClick={() => handleCourses("My Courses")}
                            >
                                My Courses
                            </div>
                        </div>

                        <button className="bg-white text-black rounded-5 btn d-flex align-items-center fw-normal dashboard-card d-md-block d-none">
                            <Calendar className="me-1 me-md-2 small-icon" />
                            <span className="d-none d-md-inline">{today}</span>
                            <span className="d-inline d-md-none">Date</span>
                        </button>
                    </div>
                </div>
                <div>
                    {
                        selectCourses == "All Courses" && <AllCourses cardsData={courses} />
                    }
                    {
                        selectCourses == "My Courses" && <MyCourses />
                    }
                </div>
            </div>
        </div>
    );
};

export default ExternalStudent;

const AllCourses = ({ cardsData }) => {
    console.log(cardsData)
    const [category, setCategry] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const handleToggleFilter = () => {
        setShowFilter((prev => !prev))
    }
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategry((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategry((prev) => [...prev, e.target.value]);
        }
    };

    const durationFilters = [
        { id: 1, label: "1 - 3 Hrs", value: "1_to_3_hours", description: "Content or activities between 1 to 3 hours long" },
        { id: 2, label: "3 - 4 Hrs", value: "3_to_4_hours", description: "Content or activities between 3 to 4 hours long" },
        { id: 3, label: "4 - 5 Hrs", value: "4_to_5_hours", description: "Content or activities between 4 to 5 hours long" },
        { id: 4, label: "5+ Hrs", value: "5_plus_hours", description: "Content or activities that are longer than 5 hours" }
    ];

    const courseFilters = [
        { id: 1, label: "Beginner", value: "beginner", description: "Courses for beginners" },
        { id: 2, label: "Intermediate", value: "intermediate", description: "Courses for intermediate learners" },
        { id: 3, label: "Advanced", value: "advanced", description: "Courses for advanced learners" },
        { id: 4, label: "Certification", value: "certification", description: "Courses that provide certification" }
    ];

    return <div className="col-md-12 col-lg-12">
        <div className="row ">
            <div className="container mt-5 d-none d-md-block ">
                <div className="row ">
                    <div className="col-12 col-md-6 col-lg-4 ">
                        <h3>Course Duration</h3>
                        <div className='d-flex gap-4'>
                            {durationFilters.map((category) => {
                                return (
                                    <p className="d-flex gap-2 align-items-center checkbox-font" key={category.id}>
                                        <input
                                            type="checkbox"
                                            value={category.value}
                                            onChange={toggleCategory}
                                            className="custom-checkbox"
                                        />
                                        {category.label}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-12 col-md-5 ">
                        <h3>Course Level</h3>
                        <div className='d-flex gap-4'>
                            {courseFilters.map((category) => {
                                return (
                                    <p className="d-flex gap-2 align-items-center checkbox-font" key={category.id}>
                                        <input
                                            type="checkbox"
                                            value={category.value}
                                            onChange={toggleCategory}
                                            className="custom-checkbox"
                                        />
                                        {category.label}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end align-items-center col-md-3 ">
                        <div className="d-flex justify-content-end align-items-center gap-2">
                            <p className="checkbox-font mb-0 no-wrap ">SORT BY</p>
                            <select className="form-select form-select-sm custom-select rounded-4 py-2 px-4 ">
                                <option value={"Trending"}>Trending</option>
                                <option value={"Newest"}>Newest</option>
                                <option value={"Most Popular"}>Most Popular</option>
                                <option value={"Top Rated"}>Top Rated</option>
                            </select>
                            <select className="form-select form-select-sm rounded-4 py-2 px-4 d-none d-md-block">
                                <option value={"date"}>Date</option>
                                <option value={"relevance"}>Relevance</option>
                                <option value={"alphabetical"}>Alphabetical</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-md-end justify-content-between  align-items-center my-2 mx-md-4 ">
            <button className='d-md-none btn blue-primary text-white px-2  my-2 py-1 rounded-5 d-flex align-items-center justify-content-center gap-2' onClick={handleToggleFilter}>
                <FilterIcon className='small-icon' />
                categories</button>
        </div>
        <div className="row g-4  ">
            {cardsData?.map(course => (
                <div key={course?.id} className="col-md-6 col-lg-4">
                    <div className="card position-relative rounded-3 border-0 shadow-sm">
                        <img
                            src={course?.thumbnail}
                            className="card-img-top image-fluid" width={"100%"} height={"300"}
                            alt={course.name}
                        />
                        <div className="card-body d-flex flex-column ">
                            <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                <span className="fs-6 fw-bolder">{course.courseName}</span>
                                <span className="fs-6 fw-bolder">{course.title}</span>
                                {/* <span className="text-muted small ">{card.duration}</span> */}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <span className="text-muted small">{course.description}</span>
                                <Bookmark className="text-muted cursor-pointer" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

const MyCourses = () => {
    const myCourse = 0;
    return <div className='w-100'>
        {myCourse === 0 ? <div className='w-100 h-25'>
            <div className="text-center border mt-4">
                <p className="mt-4 fw-bolder">You Havent watched any Courses yet.</p>
                <button className="btn rounded bg-blue-color my-3 mx-auto"> Browse Courses</button>
            </div>
        </div> : ""}
    </div>
}