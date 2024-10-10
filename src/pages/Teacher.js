import { ChevronDown, ChevronUp, Pen, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../include/DeleteModal';
import { jwtDecode } from 'jwt-decode';

const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate()
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const visibleTeachers = showMore ? teachers : teachers.slice(0, 4);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const location = useLocation();
    const role = localStorage.getItem("role");
    console.log(role)

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/teacher/${id}`);
            console.log(res);
            setTeachers(teachers.filter(school => school.id !== id));
        } catch (error) {
            console.error("Error deleting school:", error);
            toast.error('Failed to delete school');
        }
    };

    const openDeleteModal = (student) => {
        setStudentToDelete(student);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setStudentToDelete(null);
    };


    // Handle Edit - Navigate to Edit Page
    const handleEdit = (id) => {
        navigate(`/admin/teachers/${id}/edit`);
    };


    // Fetch teachers from the API


    const getTeachers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/teacher');
            console.log(response)
            setTeachers(response.data);
        } catch (err) {
            console.log(err)
            setError('No teachers found');
        } finally {
            setLoading(false);
        }
    };

    const getAdminTeacher = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/admin/teacher/' + localStorage.getItem("adminId"));
            console.log(response, "get admin teacher")
            setTeachers(response.data);
        } catch (err) {
            console.log(err)
            setError('No teachers found');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (role == "ADMIN") {
            getAdminTeacher()
        }
        else {
            getTeachers();
        }
    }, []);



    return (
        <div className="container">
            <div className="d-flex w-100 align-items-center justify-content-between mb-3 ">
                <div className="fs-3 fw-semibold">Teachers</div>
                {role === "ADMIN" && <Link to={location.pathname + "/create"} className='blue text-white btn dashboard-btn-shadow fw-medium'>Create Teacher</Link>}
            </div>
            {/* Show loading or error */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-danger text-center">{error}</div>
            ) : (
                <>
                    <div className="row g-3 mb-2">
                        {visibleTeachers.map(teacher => (
                            <div key={teacher.id} className="col-12 col-md-6 col-lg-3">
                                <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                    <Link to={`${location.pathname}/${teacher.id}`}>
                                        <img src={"https://images.unsplash.com/photo-1658314755232-8c0ad8097cd3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="card-img-top" alt={teacher.courseName} style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} />
                                    </Link>
                                    <div className="text-white pt-2 px-1">
                                        <div className='d-flex align-content-center justify-content-between'>

                                            <div className="card-title fs-5">{teacher.name}</div>
                                            <div className="d-flex align-items-center gap-1">
                                                <Pen
                                                    className=" me-2 cursor-pointer text-lime small-icon"
                                                    onClick={() => handleEdit(teacher.id)}
                                                />
                                                <Trash2Icon
                                                    className="student-list__delete-icon small-icon text-danger cursor-pointer"
                                                    onClick={() => openDeleteModal(teacher)}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-small text-gray">Phone: {teacher.phoneNumber}</div>
                                        <div className="text-small text-gray">Email: {teacher.email}</div>
                                    </div >
                                </div>
                            </div>
                        ))}
                    </div>
                    {setTeachers.length > 4 && <div className="text-center mb-2">
                        <button className="btn text-black" onClick={toggleShowMore}>
                            {showMore ? "Show Less" : "Show More"}
                            {showMore ? <ChevronUp /> : <ChevronDown />}
                        </button>
                    </div>}
                </>
            )}
            {studentToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={() => {
                        handleDelete(studentToDelete.id)
                        closeDeleteModal()
                    }}
                    studentName={studentToDelete.name}
                />
            )}
        </div>
    );
}

export default Teacher;
