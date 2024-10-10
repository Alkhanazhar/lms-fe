import { Pen, ChevronDown, ChevronUp, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteModal from '../include/DeleteModal';

const School = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const visibleSchools = showMore ? schools : schools.slice(0, 4);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const location = useLocation();
    const navigate = useNavigate()
    const role = localStorage.getItem("role");
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/admin/${id}`);
            console.log(res);
            setSchools(schools.filter(school => school?.id !== id));
        } catch (error) {
            console.error("Error deleting school:", error);
            alert('Failed to delete school');
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
        navigate(`/superadmin/school/${id}/edit`);
    };

    // Fetch schools data from API
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/admin');
                setSchools(response.data);
                setLoading(false);
                console.log(schools)
            } catch (error) {
                console.error("Error fetching school data:", error);
                setError('Failed to load schools');
                setLoading(false);
            }
        };
        fetchSchools();
    }, []);

    return (
        <div className="container">
            <div className="d-flex w-100 align-items-center justify-content-between mb-3">
                <div className="fs-3 fw-semibold">Schools</div>
                <Link to={location.pathname + "/create"} className='blue text-white btn dashboard-btn-shadow fw-medium'>Create School</Link>
            </div>
            {/* Display loading state */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : (
                <>
                    <div className="row g-3 mb-2">
                        {visibleSchools.map(school => (
                            <div key={school.id} className="col-12 col-md-6 col-lg-3">
                                <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".7rem" }}>
                                    <Link to={location.pathname + "/" + school.id}>
                                        <img
                                            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            className="card-img-top"
                                            alt={school.name}
                                            style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }}
                                        />
                                    </Link>
                                    <div className="text-white pt-2 px-1">
                                        <div className="d-flex justify-content-between">
                                            <Link to={location.pathname + "/" + school.id} className='text-decoration-none text-white text-capitalize'>
                                                <div className=" fs-5">{school.schoolName}</div>
                                            </Link>
                                            <div className="d-flex align-items-center ">
                                                <Pen
                                                    className=" me-2 cursor-pointer text-lime small-icon"
                                                    onClick={() => handleEdit(school.id)}
                                                />
                                                <Trash2Icon
                                                    className="student-list__delete-icon small-icon text-danger cursor-pointer"
                                                    onClick={() => openDeleteModal(school)}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-small text-gray">Email: {school.email}</div>
                                        <div className="text-small text-gray">Phone: {school.phoneNumber}</div>
                                        <div className="text-small text-gray">username: {school.username}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {schools.length > 4 && <div className="text-center mb-2">
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
};

export default School;
