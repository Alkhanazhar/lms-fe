import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Pen, Trash2Icon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../include/DeleteModal';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const visibleStudents = showMore ? students : students.slice(0, 4);
    const location = useLocation();
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const openDeleteModal = (student) => {
        setStudentToDelete(student);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setStudentToDelete(null);
    };

    const handleEdit = (id) => {
        navigate(`/superadmin/school/${id}/edit`);
    };

    // Fetch students from API
    const fetchStudents = async () => {
        try {
            const response = await axios.get('/student');
            setStudents(response?.data);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            setError(err?.response?.data?.message);
            setLoading(false);
        }
    };

    const fetchAdminStudents = async () => {
        try {
            const response = await axios.get('/admin/student/' + localStorage.getItem('adminId'));
            setStudents(response?.data);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            setError(err?.response?.data?.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role === 'ADMIN' || role === 'TEACHER') {
            fetchAdminStudents();
        } else {
            fetchStudents();
        }
    }, []);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`/student/${studentId}`);
            const copy = students?.filter((student) => student?.studentId !== studentId);
            console.log(copy);
            setStudents((prev) => [...copy]);
            toast.success('Student deleted successfully.');
        } catch (err) {
            toast.error('Failed to delete student.');
            console.log(err);
        }
    };

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <div className="d-flex w-100 align-items-center justify-content-between mb-3">
                <div className="fs-3 fw-semibold">Students</div>
                {role === 'TEACHER' && (
                    <Link to={location.pathname + '/create'} className="blue text-white btn dashboard-btn-shadow fw-medium">
                        Create Student
                    </Link>
                )}
            </div>

            {students.length === 0 ? (
                <div className="text-center">No students exist.</div>
            ) : (
                <>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Type</th>
                                {(role === 'SUPERADMIN' || role === 'TEACHER') && (<th scope="col">Actions</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {visibleStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student?.name}</td>
                                    <td>{student?.username}</td>
                                    <td>{student?.email}</td>
                                    <td>{student?.phoneNumber}</td>
                                    <td>{student?.type}</td>
                                    {(role === 'SUPERADMIN' || role === 'TEACHER') && (  <td>
                                        {(role === 'SUPERADMIN' || role === 'TEACHER') && (
                                            <div className="d-flex align-items-center gap-2">
                                                <Pen
                                                    className="me-2 cursor-pointer text-success small-icon"
                                                    onClick={() => handleEdit(student?.id)}
                                                />
                                                <Trash2Icon
                                                    className="text-danger cursor-pointer small-icon"
                                                    onClick={() => openDeleteModal(student)}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {students.length > 4 && (
                        <div className="text-center mb-2">
                            <button className="btn btn-secondary" onClick={toggleShowMore}>
                                {showMore ? 'Show Less' : 'Show More'} {showMore ? <ChevronUp /> : <ChevronDown />}
                            </button>
                        </div>
                    )}
                </>
            )}

            {studentToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={() => {
                        handleDelete(studentToDelete.studentId);
                        closeDeleteModal();
                    }}
                    studentName={studentToDelete.name}
                />
            )}
        </div>
    );
};

export default Students;
