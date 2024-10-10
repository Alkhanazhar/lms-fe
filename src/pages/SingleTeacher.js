import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SingleTeacher = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchool = async () => {
            try {
                const response = await axios.get(`/teacher/${id}`);
                setTeacher(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSchool();
    }, [id]);
    return (
        <>
            <button className='btn  text-black btn-sm d-flex rounded align-items-center gap-2' onClick={() => navigate(-1)}><ArrowLeft className='small-icon' />Back</button>
            <div className="container my-2">
                <div className="row bg-light p-4 rounded shadow-sm">
                    <div className="col-md-8">
                        <div className='fs-2 fw-semibold text-capitalize'>{teacher?.name}</div>
                        <p><strong>Email:</strong> {teacher?.email}</p>
                        <p><strong>Phone Number:</strong> {teacher?.phoneNumber}</p>
                        <p><strong>Username:</strong> {teacher?.username}</p>
                        <p><strong>Role:</strong> {teacher?.role}</p>
                    </div>
                    <div className="col-md-4 text-md-right text-center d-flex justify-content-center align-items-center">
                        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={teacher?.name} className="img-fluid rounded"
                            style={{ height: 'auto' }} />

                    </div>
                </div>
            </div>
            {courses.length > 0 && <div className="col-md-12 bg-white p-4 rounded shadow-sm my-4 ">
                <div className="fs-4">Courses</div>
            </div>}
        </>

    )
}

export default SingleTeacher
