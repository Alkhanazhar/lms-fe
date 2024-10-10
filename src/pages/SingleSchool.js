import axios from 'axios';
import { ArrowLeft, Pen, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SingleSchool = () => {
    // Get the school id from URL parameters
    const { id } = useParams();
    // State to store school details
    const [school, setSchool] = useState(null);
    // Hook for programmatic navigation
    const navigate = useNavigate();
    // State to store teachers list
    const [teachers, setTeachers] = useState([])

    // Function to fetch teachers for the school
    const fetchTeachers = async () => {
        console.log("Fetching teachers for school ID:", school?.id);
        try {
            const response = await axios.get("/admin/teacher/" + school?.id);
            console.log("Teachers data:", response.data);
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    }

    useEffect(() => {
        // Function to fetch school details
        const fetchSchool = async () => {
            console.log("Fetching school details for ID:", id);
            try {
                const response = await axios.get(`/admin/${id}`);
                console.log("School data:", response.data);
                setSchool(response.data);
            } catch (error) {
                console.error("Error fetching school details:", error);
            }
        };

        fetchSchool();
    }, [id]);

    useEffect(() => {
        // Fetch teachers when school data is available
        if (school) {
            fetchTeachers();
        }
    }, [school]);

    // Format the creation date
    const dateObject = school && new Date(school?.createdAt);
    const formattedDate = dateObject?.toISOString().split('T')[0];
    console.log("Rendered school:", school);
    console.log("Rendered teachers:", teachers);

    return (
        <>
            <div className="container mb-4">
                {/* Back button */}
                <button className='btn text-black btn-sm d-flex align-items-center gap-2 mb-3' onClick={() => navigate(-1)}>
                    <ArrowLeft className='small-icon' />Back
                </button>

                {/* School details */}
                <div className="row bg-light p-3 mx-1 rounded shadow-sm">
                    <div className="col-md-8">
                        <div className='fs-2 text-capitalize fw-semibold mb-2'>{school?.schoolName}</div>
                        <p><strong>Administrator:</strong> {school?.name}</p>
                        <p><strong>Email:</strong> {school?.email}</p>
                        <p><strong>Phone Number:</strong>{school?.phoneNumber}</p>
                        <p><strong>Username:</strong> {school?.username}</p>
                        <p><strong>Created At:</strong> {formattedDate}</p>
                    </div>
                    <div className="col-md-4 text-md-right text-center d-flex justify-content-center align-items-center">
                        <img
                            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt={school?.name}
                            className="img-fluid rounded"
                            style={{ height: 'auto' }}
                        />
                    </div>
                </div>
            </div>

            {/* Teachers section */}
            <div className='container'>
                {teachers.length > 0 && (
                    <div className="row bg-light p-3 mx-1 rounded shadow-sm">
                        <div className="col-12">
                            <div className='fs-3 text-capitalize fw-semibold mb-3'>Teachers</div>
                            <div className="overflow-hidden">
                                <div className="d-flex flex-nowrap" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {teachers.map((teacher) => (
                                        <div key={teacher.id} className="col-12 col-md-6 col-lg-3 flex-shrink-0 me-3" style={{ minWidth: '250px', maxWidth: '300px' }}>
                                            <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                                <img src={"https://images.unsplash.com/photo-1658314755232-8c0ad8097cd3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                                    className="card-img-top"
                                                    alt={teacher.name}
                                                    style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }}
                                                />
                                                <div className="text-white pt-2 px-1">
                                                    <div className='d-flex align-content-center justify-content-between'>
                                                        <div className="card-title fs-5">{teacher.name}</div>
                                                    </div>
                                                    <div className="text-small text-gray">Phone: {teacher.phoneNumber}</div>
                                                    <div className="text-small text-gray">Email: {teacher.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
           
        </>
    )
}

export default SingleSchool;
