import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../include/Navbar"
import Footer from "../include/Footer"
import axios from "axios"
import { Trash2 } from "lucide-react"

const Home = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
   
    const cardData = [
        {
            imgSrc: "https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/332049f3-applyforascholarship-1_1000000000000000000028.png",
            altText: "Skill Development",
            title: "Customized Learning Paths",
            description:
                "Empower your team with personalized learning tracks tailored to their roles and goals. From beginner courses to advanced specializations, our system helps every team member reach their highest potential.",
        },
        {
            imgSrc: "https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/bc11bbd9-curatedclasses_1000000000000000000028.png",
            altText: "Learning Trend",
            title: "Stay Ahead with Curated Content",
            description:
                "In a rapidly evolving environment, our curated courses ensure your team remains up-to-date with industry trends. We partner with leading experts to bring the latest innovations directly to your learning portal.",
        },
        {
            imgSrc: "https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/e7a1df45-exclusiveoffers_1000000000000000000028.png",
            altText: "Engaging Content",
            title: "Engage and Track Progress",
            description:
                "Our user-friendly interface makes learning accessible and engaging, with interactive elements and real-time progress tracking. Enable your team to learn efficiently while administrators easily manage the learning journey.",
        },
    ];

    const skillSets = [
        {
            imgSrc: "https://images.unsplash.com/photo-1546430498-05c7b929830e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Skill Set 1",
            title: "Skill Set 1: Digital Literacy",
            description:
                "Master essential digital skills to thrive in today's tech-driven workplace. Learn to navigate various software, understand data analysis, and leverage online tools for productivity and collaboration.",
            reverse: false,
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1587372723630-cc6f6f661cdc?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Skill Set 2",
            title: "Skill Set 2: Adaptive Leadership",
            description:
                "Develop adaptive leadership skills to guide teams through changing environments. Learn to make decisions under uncertainty, foster innovation, and build resilient organizations ready for future challenges.",
            reverse: true,
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1577515696584-6accf80259c7?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            altText: "Skill Set 3",
            title: "Skill Set 3: Creative Problem-Solving",
            description:
                "Enhance your creative problem-solving abilities to tackle complex challenges. Learn design thinking methodologies, lateral thinking techniques, and innovative approaches to find unique solutions in any field.",
            reverse: false,
        },
    ];

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/courses/type/" + "PUBLIC");
            setCourses(response?.data);
            console.log(response?.data);
            // toast.success("Courses fetched successfully");
        } catch (error) {
            console.log(error);
            // toast.error("Error fetching courses");
        }
    };

    const handleAllCoursesBtn = async () => {
        try {
            if (localStorage.getItem("token")) {
                navigate("/search")
            }
            else {
                navigate("/student/login")
            }
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchCourses()
    }, [])
    return (
        <>
            <Navbar />
            <section
                className="hero text-white d-flex align-items-center"
                style={{
                    minHeight: '80vh',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', // This creates a dark overlay
                    }}
                ></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row justify-content-center text-center">
                        <div className="col-md-8">
                            <p className="text-lime">Advanced LMS Solution</p>
                            <div className="fw-bold mb-4 fs-1 ">Transform Your Organization with Powerful Learning Management</div>
                            <p className="lead mb-4 fs-6">Streamline training, boost engagement, and drive performance with our comprehensive LMS platform. Tailored for businesses of all sizes.</p>
                            <div className="d-flex justify-content-center gap-3">
                                <a href="#" className="btn bg-lime btn-lg">Get Started</a>
                                <a href="#" className="btn btn-outline-light btn-lg">Features</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 bg-light">
                {/* <h2>Get Courses</h2> */}

                {/* Existing course list or grid */}

                {/* New Get Course Section */}
                <div className="d-flex align-items-center justify-content-center position-relative w-75 mx-auto">

                    <h2 className="text-center fs-3 fw-bold">Get Course</h2>
                    <div className="position-absolute right-0 top-0 btn btn-outline-dark" style={{ right: 0 }} onClick={handleAllCoursesBtn}>All Courses</div>

                </div>
                <div className="border-bottom-home my-3 mx-auto"></div>
                <div className="row g-3 container mx-auto mt-4">
                    {
                        courses.slice(0, 4).map((course, index) => {
                            return (
                                <div key={course?.id} className="col-12 col-md-6 col-lg-3">
                                    <div className="border-0 overflow-hidden card shadow-lg bg-gray">
                                        <div className="cursor-pointer border-0" onClick={handleAllCoursesBtn}>
                                            <img src={course?.thumbnail} className="card-img-top" alt={course?.courseName} style={{ height: "200px", objectFit: "cover" }} />
                                        </div>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between">
                                                <div className='w-100'>
                                                    <div className='d-flex align-items-center justify-content-between w-100'>
                                                        <div className="text-white fs-6 text-capitalize cursor-pointer" onClick={handleAllCoursesBtn}>{course?.courseName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between w-100'>
                                                <div className="fw-light text-gray description">{course?.description?.substring(0, 40)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
            <section className="customer-testimonial py-3 bg-light">
                <div className="container">
                    <div className="text-center  fw-bold fs-2">Trusted by Industry Leaders</div>

                    <div className="border-bottom-home my-3 mx-auto"></div>
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-md-8">
                            <p className="lead fs-6 w-75 mx-auto">
                                Our innovative LMS platform has transformed learning experiences for teams across the globe. From startups to Fortune 500 companies, we've helped organizations unlock their full potential and drive success through continuous learning.
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center g-3">
                        {/* Replace these with actual company logos */}
                        <div className="col-4 col-md-2 mb-4 mb-md-0">
                            <img src="https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/e9e2d0a8-gm-financial-logo_104z017000000000000028.png" alt="Google" className="img-fluid" />
                        </div>
                        <div className="col-4 col-md-2 mb-4 mb-md-0 d-flex align-items-center justify-content-center">
                            <img src="https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/b5eb2417-aws-logo_1021018000000000000028.png" alt="Amazon" className="img-fluid" />
                        </div>

                        <div className="col-4 col-md-2">
                            <img src="https://d9hhrg4mnvzow.cloudfront.net/teams.skillshare.com/061dbad7-adobe-corporate-logo-1_1041012000000000000028.png" alt="Adobe" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="culture-section py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4">
                            <h2 className="fw-bold fs-2">Cultivate a Learning Culture that Propels Your Organization Forward</h2>
                            <p className="lead mb-4 fs-6 w-75">
                                We understand that a culture of continuous learning is the cornerstone of innovation and growth. With our comprehensive Learning Management System, you can:
                            </p>
                            <a href="#" className="btn btn-outline-dark btn-sm">Show</a>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Team collaborating and learning"
                                className="img-fluid rounded shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-5" style={{ color: "#002232" }}>
                <div className="row">
                    <div className="col-md-8 mx-auto text-center">
                        <h2 className="mb-4 fs-2">Designed to Elevate Your Team's Potential</h2>
                        <div className="border-bottom-home my-3 mx-auto w-25"></div>
                        <p className="lead fs-6 mb-5 w-75 mx-auto mt-4">
                            Our instructors are experienced educators and industry experts who are ready to share their knowledge, insights, and skills with your team to ensure continuous growth and development.
                        </p>
                    </div>
                </div>
                <div className="row col-12 g-4 text-center justify-content-center">
                    {cardData.map((card, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <img
                                src={card.imgSrc}
                                alt={card.altText}
                                className="img-fluid mb-3"
                                style={{ height: '100px', width: '100px', backgroundPosition: "center", objectFit: "cover" }}
                            />
                            <div className="fs-4 mb-4">{card.title}</div>
                            <div className="fs-6" style={{ fontSize: '16px', color: "#002232" }}>
                                {card.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container mb-5">
                <div className="text-center fs-2 mb-4">Unlock Unique Skill Sets to Drive Your Career Development</div>
                {skillSets.map((skill, index) => (
                    <div key={index} className={`row align-items-center mt-5 bg-white rounded-3 shadow-sm overflow-hidden ${skill.reverse ? 'flex-md-row-reverse' : ''}`}>
                        <div className="col-md-6 p-0">
                            <div className="image-container" style={{ height: '300px', width: '100%' }}>
                                <img
                                    src={skill.imgSrc}
                                    alt={skill.altText}
                                    className="img-fluid "
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 p-4">
                            <div className="fs-3 ">{skill.title}</div>
                            <p>{skill.description}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </>
    )
}

export default Home