import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SingleStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchool = async () => {
            try {
                const response = await axios.get(`/student/${id}`);
                console.log(response.data)
                setStudent(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchSchool();
    }, [id]);
    // const createdAt = school && school?.createdAt?.toLocaleDateString()
    // const dateObject = student && new Date(student?.createdAt);
    // const formattedDate = dateObject?.toISOString().split('T')[0];
    return (
        <>
            <button className='btn text-black btn-sm d-flex align-items-center gap-2' onClick={() => navigate(-1)}><ArrowLeft className='small-icon' />Back</button>
            <div className="container my-4">
                <div className="row bg-light p-4 rounded shadow-sm">
                    <div className="col-md-8">
                        <div className='fs-3'>{student?.schoolName}</div>
                        <p><strong>Administrator:</strong> {student?.name}</p>
                        <p><strong>Email:</strong> {student?.email}</p>
                        <p><strong>Phone Number:</strong>{student?.phoneNumber}</p>
                        <p><strong>Username:</strong> {student?.username}</p>
                        {/* <p><strong>Created At:</strong> {formattedDate}</p> */}
                    </div>
                    <div className="col-md-4 text-md-right text-center d-flex justify-content-center align-items-center">
                        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={student?.name} className="img-fluid rounded"
                            style={{ height: 'auto' }} />

                    </div>
                </div>
            </div>
        </>

    )
}

export default SingleStudent
