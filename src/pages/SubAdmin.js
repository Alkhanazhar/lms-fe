import { ChevronDown, ChevronUp, Pen, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteModal from '../include/DeleteModal';

const SubAdmin = () => {
    const [subAdmins, setSubAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [subAdminToDelete, setSubAdminToDelete] = useState(null);
    const visibleSubAdmins = showMore ? subAdmins : subAdmins.slice(0, 4);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const location = useLocation();
    const role = localStorage.getItem("role");
    // console.log(role, "sub admin");

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/subadmin/${id}`);
            console.log(res);
            setSubAdmins(() => subAdmins.filter(subAdmin => subAdmin.id !== id));
        } catch (error) {
            console.error("Error deleting sub-admin:", error);
            toast.error('Failed to delete sub-admin');
        }
    };

    const openDeleteModal = (subAdmin) => {
        setSubAdminToDelete(subAdmin);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSubAdminToDelete(null);
    };

    // Handle Edit - Navigate to Edit Page
    const handleEdit = (id) => {
        navigate(`/admin/subadmin/${id}/edit`);
    };

    // Fetch sub-admins from the API
    const getSubAdmins = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/subadmin');
            console.log(response, "sub admin");
            setSubAdmins(() => response?.data);
        } catch (err) {
            console.log(err);
            setError('No sub-admins found');
        } finally {
            setLoading(false);
        }
    };
    const getSubAdminByAdminId = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/admin/subAdmins/' + localStorage.getItem('adminId'));
            console.log(response, "sub admin by admin Id");
            setSubAdmins(() => response?.data);
        } catch (err) {
            console.log(err,"sub admin by admin Id error");
            setError('No sub-admins found');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(role)
        if (role === "SUB_ADMIN") {
            getSubAdmins();
        }
        else if (role === "ADMIN") {
            getSubAdminByAdminId()
        }
    }, []);

    return (
        <div className="container">
            <div className="d-flex w-100 align-items-center justify-content-between mb-3">
                <div className="fs-3 fw-semibold">Sub-Admins</div>
                {role === "ADMIN" && (
                    <Link to={location.pathname + "/create"} className='blue text-white btn dashboard-btn-shadow fw-medium'>
                        Create Sub-Admin
                    </Link>
                )}
            </div>
            {/* Show loading or error */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-danger text-center">{error}</div>
            ) : (
                <>
                    <div className="row g-3 mb-2">
                        {visibleSubAdmins.map(subAdmin => (
                            <div key={subAdmin.id} className="col-12 col-md-6 col-lg-3">
                                <div className="card border-0 overflow-hidden dashboard-card" style={{ width: '100%', height: '100%', backgroundColor: '#002132', borderRadius: 8, padding: ".6rem" }}>
                                    <Link to={`${location.pathname}/${subAdmin.id}`}>
                                        <img src={"https://images.unsplash.com/photo-1658314755232-8c0ad8097cd3?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="card-img-top" alt={subAdmin.name} style={{ height: "180px", borderRadius: "8px", objectFit: "cover" }} />
                                    </Link>
                                    <div className="text-white pt-2 px-1">
                                        <div className='d-flex align-content-center justify-content-between'>
                                            <div className="card-title fs-5">{subAdmin?.name}</div>
                                            <div className="d-flex align-items-center gap-1">
                                                <Pen
                                                    className="me-2 cursor-pointer text-lime small-icon"
                                                    onClick={() => handleEdit(subAdmin?.id)}
                                                />
                                                <Trash2Icon
                                                    className="student-list__delete-icon small-icon text-danger cursor-pointer"
                                                    onClick={() => openDeleteModal(subAdmin)}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-small text-gray">Phone: {subAdmin?.phoneNumber}</div>
                                        <div className="text-small text-gray">Email: {subAdmin?.email}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {subAdmins.length > 4 && (
                        <div className="text-center mb-2">
                            <button className="btn text-black" onClick={toggleShowMore}>
                                {showMore ? "Show Less" : "Show More"}
                                {showMore ? <ChevronUp /> : <ChevronDown />}
                            </button>
                        </div>
                    )}
                </>
            )}
            {subAdminToDelete && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={() => {
                        handleDelete(subAdminToDelete.id);
                        closeDeleteModal();
                    }}
                    subAdminName={subAdminToDelete.name}
                />
            )}
        </div>
    );
}

export default SubAdmin;
